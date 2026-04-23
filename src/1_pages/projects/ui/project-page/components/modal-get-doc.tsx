import type { Document } from "@pages/projects/api/types/response";
import { useGetUsers, useUpdateDocument } from "@pages/projects/api/controller";
import type { UpdateDocumentRequest } from "@pages/projects/api/types/requests";
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
): UpdateDocumentRequest | null {
  const patch: UpdateDocumentRequest = {};
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

function isPatchSaveable(patch: UpdateDocumentRequest | null): boolean {
  if (!patch) return false;
  if (patch.name !== undefined && patch.name.trim() === "") return false;
  return true;
}

type ViewSnapshot = {
  name: string;
  description: string;
  accessUsers: number[];
};

type Props = {
  project_id: number;
  document: Document;
};

export const ModalGetDoc = ({ project_id, document: doc }: Props) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(doc.name);
  const [description, setDescription] = useState(doc.description);
  const [accessUsers, setAccessUsers] = useState<number[]>(
    doc.access_users ?? [],
  );

  const editSnapshotRef = useRef<ViewSnapshot | null>(null);
  const prevOpenRef = useRef(false);

  const { data: users, isLoading: usersLoading } = useGetUsers();
  const { mutate: updateDocument, isPending } = useUpdateDocument(
    project_id,
    doc.group_id,
  );

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users],
  );

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setName(doc.name);
      setDescription(doc.description);
      setAccessUsers(doc.access_users ?? []);
      setIsEditing(false);
      editSnapshotRef.current = null;
    }
    prevOpenRef.current = open;
  }, [open, doc]);

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
    updateDocument(
      {
        doc_id: doc.id,
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
              <Label htmlFor={`doc-name-${doc.id}`}>Название документа</Label>
              <Input
                id={`doc-name-${doc.id}`}
                disabled={fieldsDisabled}
                placeholder="Название документа"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`doc-desc-${doc.id}`}>Описание</Label>
              <Textarea
                id={`doc-desc-${doc.id}`}
                disabled={fieldsDisabled}
                placeholder="Описание документа"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Доступ</Label>
              <MultiSelect
                disabled={fieldsDisabled}
                placeholder="Выберите пользователей с доступом"
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
