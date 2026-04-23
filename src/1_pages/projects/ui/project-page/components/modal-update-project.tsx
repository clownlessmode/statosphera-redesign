import type { ProjectDetail } from "@pages/projects/api/types/response";
import { useGetUsers, useUpdateProject } from "@pages/projects/api/controller";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { DatePicker } from "@shared/ui/date-picker";
import { MultiSelect } from "@shared/ui/multiselect";
import { useQueryClient } from "@tanstack/react-query";
import { parseISO } from "date-fns";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { formatUserLastNameInitials } from "../lib/format-user-display-name";
import { cn } from "@shared/lib/utils";

const stages = [
  "Инициация",
  "Планирование",
  "Проектирование",
  "Внедрение",
  "Разработка",
  "Тестирование",
  "Заморожен",
  "Закрытие",
] as const;

const priorities = ["Низкий", "Средний", "Высокий"] as const;

function parseProjectDate(iso: string): Date {
  if (!iso) return new Date();
  const d = parseISO(iso);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

function accessUsersEqual(a: number[], b: number[]) {
  if (a.length !== b.length) return false;
  const sa = [...a].sort((x, y) => x - y);
  const sb = [...b].sort((x, y) => x - y);
  return sa.every((v, i) => v === sb[i]);
}

function datesEqual(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}

type ViewSnapshot = {
  name: string;
  responsible_name: string;
  team_info: string;
  client_name: string;
  pm_name: string;
  stage: string;
  start_date: Date;
  end_date: Date;
  priority: string;
  access_users: number[];
};

/** Есть ли отличия от снимка (чтобы не слать лишний запрос без изменений). */
function hasChangesFromSnapshot(
  snap: ViewSnapshot,
  name: string,
  responsible_name: string,
  team_info: string,
  client_name: string,
  pm_name: string,
  stage: string,
  start_date: Date,
  end_date: Date,
  priority: string,
  access_users: number[],
): boolean {
  if (name.trim() !== snap.name.trim()) return true;
  if (responsible_name.trim() !== snap.responsible_name.trim()) return true;
  if (team_info.trim() !== snap.team_info.trim()) return true;
  if (client_name.trim() !== snap.client_name.trim()) return true;
  if (pm_name.trim() !== snap.pm_name.trim()) return true;
  if (stage !== snap.stage) return true;
  if (!datesEqual(start_date, snap.start_date)) return true;
  if (!datesEqual(end_date, snap.end_date)) return true;
  if (priority !== snap.priority) return true;
  if (!accessUsersEqual(access_users, snap.access_users)) return true;
  return false;
}

function isEditingFormValid(
  name: string,
  responsible_name: string,
  team_info: string,
  client_name: string,
  pm_name: string,
  stage: string,
  priority: string,
): boolean {
  return (
    name.trim().length > 0 &&
    responsible_name.trim().length > 0 &&
    team_info.trim().length > 0 &&
    client_name.trim().length > 0 &&
    pm_name.trim().length > 0 &&
    stage.length > 0 &&
    priority.length > 0
  );
}

function applyProjectToState(project: ProjectDetail) {
  return {
    name: project.name,
    responsible_name: project.responsible_name,
    team_info: project.team_info,
    client_name: project.client_name,
    pm_name: project.pm_name,
    stage: project.stage,
    start_date: parseProjectDate(project.start_date),
    end_date: parseProjectDate(project.end_date),
    priority: project.priority,
    access_users: [...(project.access_users ?? [])],
  };
}

export type ModalUpdateProjectProps = {
  project: ProjectDetail;
  trigger: ReactNode;
};

export const ModalUpdateProject = ({
  project,
  trigger,
}: ModalUpdateProjectProps) => {
  const [open, setOpen] = useState(false);
  const [optionsRefresh, setOptionsRefresh] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [responsible_name, setResponsibleName] = useState(
    project.responsible_name,
  );
  const [team_info, setTeamInfo] = useState(project.team_info);
  const [client_name, setClientName] = useState(project.client_name);
  const [pm_name, setPmName] = useState(project.pm_name);
  const [stage, setStage] = useState(project.stage);
  const [start_date, setStartDate] = useState(() =>
    parseProjectDate(project.start_date),
  );
  const [end_date, setEndDate] = useState(() =>
    parseProjectDate(project.end_date),
  );
  const [priority, setPriority] = useState(project.priority);
  const [access_users, setAccessUsers] = useState<number[]>(
    () => project.access_users ?? [],
  );

  const editSnapshotRef = useRef<ViewSnapshot | null>(null);
  const prevOpenRef = useRef(false);

  const queryClient = useQueryClient();
  const { data: users, isLoading: usersLoading } = useGetUsers();
  const { mutate: updateProject, isPending } = useUpdateProject(project.id);

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users, optionsRefresh],
  );

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      const s = applyProjectToState(project);
      setName(s.name);
      setResponsibleName(s.responsible_name);
      setTeamInfo(s.team_info);
      setClientName(s.client_name);
      setPmName(s.pm_name);
      setStage(s.stage);
      setStartDate(s.start_date);
      setEndDate(s.end_date);
      setPriority(s.priority);
      setAccessUsers(s.access_users);
      setIsEditing(false);
      editSnapshotRef.current = null;
    }
    prevOpenRef.current = open;
  }, [open, project]);

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
      responsible_name,
      team_info,
      client_name,
      pm_name,
      stage,
      start_date,
      end_date,
      priority,
      access_users: [...access_users],
    };
    setIsEditing(true);
  };

  const cancelEditing = () => {
    const snap = editSnapshotRef.current;
    if (snap) {
      setName(snap.name);
      setResponsibleName(snap.responsible_name);
      setTeamInfo(snap.team_info);
      setClientName(snap.client_name);
      setPmName(snap.pm_name);
      setStage(snap.stage);
      setStartDate(snap.start_date);
      setEndDate(snap.end_date);
      setPriority(snap.priority);
      setAccessUsers(snap.access_users);
    }
    setIsEditing(false);
    editSnapshotRef.current = null;
  };

  const datesValid = end_date >= start_date;
  const formValid = isEditingFormValid(
    name,
    responsible_name,
    team_info,
    client_name,
    pm_name,
    stage,
    priority,
  );

  const hasChanges = useMemo(() => {
    if (!isEditing) return false;
    const snap = editSnapshotRef.current;
    if (!snap) return false;
    return hasChangesFromSnapshot(
      snap,
      name,
      responsible_name,
      team_info,
      client_name,
      pm_name,
      stage,
      start_date,
      end_date,
      priority,
      access_users,
    );
  }, [
    isEditing,
    name,
    responsible_name,
    team_info,
    client_name,
    pm_name,
    stage,
    start_date,
    end_date,
    priority,
    access_users,
  ]);

  const canSave =
    isEditing && hasChanges && formValid && datesValid && !isPending;

  const save = () => {
    if (!canSave) return;
    updateProject(
      {
        name: name.trim(),
        responsible_name: responsible_name.trim(),
        team_info: team_info.trim(),
        client_name: client_name.trim(),
        pm_name: pm_name.trim(),
        stage,
        start_date: start_date.toISOString(),
        end_date: end_date.toISOString(),
        priority,
        access_users: access_users ?? [],
      },
      {
        onSuccess: () => {
          setOpen(false);
          void queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
      },
    );
  };

  const fieldsDisabled = !isEditing;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] flex flex-col gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
          <DialogTitle>Редактировать проект</DialogTitle>
        </DialogHeader>
        <DialogBody className="px-6 overflow-y-auto flex-1 min-h-0 max-h-[60vh]">
          <div className="flex flex-col gap-4 pb-2">
            <div className="flex flex-col gap-2">
              <Label htmlFor={`upd-project-name-${project.id}`}>
                Название проекта
              </Label>
              <Input
                id={`upd-project-name-${project.id}`}
                className="bg-background"
                disabled={fieldsDisabled}
                placeholder="Введите название проекта"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`upd-responsible-${project.id}`}>
                Ответственный
              </Label>
              <Input
                id={`upd-responsible-${project.id}`}
                className="bg-background"
                disabled={fieldsDisabled}
                placeholder="Введите ответственного"
                value={responsible_name}
                onChange={(e) => setResponsibleName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`upd-team-${project.id}`}>Команда</Label>
              <Input
                id={`upd-team-${project.id}`}
                className="bg-background"
                disabled={fieldsDisabled}
                placeholder="Введите команду"
                value={team_info}
                onChange={(e) => setTeamInfo(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`upd-client-${project.id}`}>Заказчик</Label>
              <Input
                id={`upd-client-${project.id}`}
                className="bg-background"
                disabled={fieldsDisabled}
                placeholder="Заказчик"
                value={client_name}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor={`upd-pm-${project.id}`}>Проджект-менеджер</Label>
              <Input
                id={`upd-pm-${project.id}`}
                className="bg-background"
                disabled={fieldsDisabled}
                placeholder="Введите проджект-менеджера"
                value={pm_name}
                onChange={(e) => setPmName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Этап проекта</Label>
              <Select
                disabled={fieldsDisabled}
                onValueChange={setStage}
                value={stage}
              >
                <SelectTrigger className="w-full !bg-background">
                  <SelectValue placeholder="Выберите этап проекта" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Дата начала</Label>
              <div
                className={cn(
                  fieldsDisabled && "pointer-events-none opacity-70",
                )}
              >
                <DatePicker
                  value={start_date}
                  onChange={(d) => d && setStartDate(d)}
                  placeholder="Выберите дату начала"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Дата окончания</Label>
              <div
                className={cn(
                  fieldsDisabled && "pointer-events-none opacity-70",
                )}
              >
                <DatePicker
                  value={end_date}
                  onChange={(d) => d && setEndDate(d)}
                  placeholder="Выберите дату окончания"
                  disabled={(date) => Boolean(start_date && date < start_date)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Приоритет</Label>
              <Select
                disabled={fieldsDisabled}
                onValueChange={setPriority}
                value={priority}
              >
                <SelectTrigger className="w-full !bg-background">
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Доступ</Label>
              <MultiSelect
                disabled={fieldsDisabled}
                placeholder="Выберите кому доступен проект"
                options={userOptions}
                isLoading={usersLoading}
                value={access_users.map(String)}
                onValueChange={(values) => setAccessUsers(values.map(Number))}
                onOpenChange={(popoverOpen) => {
                  if (popoverOpen) {
                    requestAnimationFrame(() => {
                      requestAnimationFrame(() => {
                        setOptionsRefresh((n) => n + 1);
                      });
                    });
                  }
                }}
              />
            </div>
            {isEditing && !datesValid && (
              <p className="text-sm text-destructive">
                Дата окончания не раньше даты начала
              </p>
            )}
          </div>
        </DialogBody>
        <DialogFooter className="px-6 py-4 border-t gap-2 sm:gap-2 shrink-0">
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
