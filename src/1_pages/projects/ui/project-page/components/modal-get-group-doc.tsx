import { DocGroup } from "@pages/projects/api/types/response";
import {
  useGetUsers,
  useUpdateDocumentGroup,
} from "@pages/projects/api/controller";
import type { UpdateDocumentGroupRequest } from "@pages/projects/api/types/requests";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import { MultiSelect } from "@shared/ui/multiselect";
import { Textarea } from "@shared/ui/textarea";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatUserLastNameInitials } from "../lib/format-user-display-name";

function accessUsersEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]);
}

function buildUpdatePatch(
  snap: ViewSnapshot,
  name: string,
  description: string,
  accessUsers: number[],
): UpdateDocumentGroupRequest | null {
  const patch: UpdateDocumentGroupRequest = {};
  const nameTrim = name.trim();
  if (nameTrim !== snap.name.trim()) {
    patch.name = nameTrim;
  }
  const descTrim = description.trim();
  if (descTrim !== snap.description.trim()) {
    patch.description = descTrim;
  }
  if (!accessUsersEqual(accessUsers, snap.accessUsers)) {
    patch.access_users = [...accessUsers];
  }
  return Object.keys(patch).length > 0 ? patch : null;
}

function isPatchSaveable(patch: UpdateDocumentGroupRequest | null): boolean {
  if (!patch) return false;
  if (patch.name !== undefined && patch.name.trim() === "") return false;
  return true;
}

type ViewSnapshot = {
  name: string;
  description: string;
  accessUsers: number[];
};

export const ModalGetGroupDoc = ({
  project_id,
  docGroup,
}: {
  project_id: number;
  docGroup: DocGroup;
}) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(docGroup.name);
  const [description, setDescription] = useState(docGroup.description);
  const [accessUsers, setAccessUsers] = useState<number[]>(
    docGroup.access_users ?? [],
  );

  const editSnapshotRef = useRef<ViewSnapshot | null>(null);
  const prevOpenRef = useRef(false);

  const { data: users, isLoading: usersLoading } = useGetUsers();
  const { mutate: updateGroup, isPending } = useUpdateDocumentGroup(project_id);

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users],
  );

  /** При открытии диалога подставляем актуальные данные группы и сбрасываем режим редактирования */
  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setName(docGroup.name);
      setDescription(docGroup.description);
      setAccessUsers(docGroup.access_users ?? []);
      setIsEditing(false);
      editSnapshotRef.current = null;
    }
    prevOpenRef.current = open;
  }, [open, docGroup]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      setIsEditing(false);
      editSnapshotRef.current = null;
    }
  };

  const startEditing = () => {
    editSnapshotRef.current = {
      name,
      description,
      accessUsers: [...accessUsers],
    };
    setIsEditing(true);
  };

  const cancelEditing = () => {
    const snap = editSnapshotRef.current;
    if (snap) {
      setName(snap.name);
      setDescription(snap.description);
      setAccessUsers(snap.accessUsers);
    }
    setIsEditing(false);
    editSnapshotRef.current = null;
  };

  const patch = useMemo(() => {
    if (!isEditing) return null;
    const snap = editSnapshotRef.current;
    if (!snap) return null;
    return buildUpdatePatch(snap, name, description, accessUsers);
  }, [isEditing, name, description, accessUsers]);

  const canSave =
    isEditing && patch !== null && isPatchSaveable(patch) && !isPending;

  const save = () => {
    if (!patch || !isPatchSaveable(patch)) return;
    updateGroup(
      {
        group_id: docGroup.id,
        body: patch,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      },
    );
  };

  const fieldsDisabled = !isEditing;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" variant="outline">
          Подробнее
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Подробная информация</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`doc-group-name-${docGroup.id}`}>
                Название группы
              </Label>
              <Input
                id={`doc-group-name-${docGroup.id}`}
                disabled={fieldsDisabled}
                placeholder="Название группы"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`doc-group-desc-${docGroup.id}`}>
                Описание группы
              </Label>
              <Textarea
                id={`doc-group-desc-${docGroup.id}`}
                disabled={fieldsDisabled}
                placeholder="Описание группы"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Доступ</Label>
              <MultiSelect
                disabled={fieldsDisabled}
                placeholder="Выберите, кому доступна группа"
                options={userOptions}
                isLoading={usersLoading}
                value={accessUsers.map(String)}
                onValueChange={(values) => setAccessUsers(values.map(Number))}
              />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="gap-2 sm:gap-2">
          {!isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
              >
                Закрыть
              </Button>
              <Button type="button" onClick={startEditing}>
                Обновить
              </Button>
            </>
          ) : (
            <>
              <Button type="button" variant="outline" onClick={cancelEditing}>
                Отмена
              </Button>
              <Button type="button" disabled={!canSave} onClick={save}>
                {isPending ? "Сохранение…" : "Сохранить"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
