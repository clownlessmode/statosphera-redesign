import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Calendar, Check, ChevronLeft, Pencil } from "lucide-react";
import { Header } from "@widgets/header";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import {
  useCreateDescription,
  useDeleteProject,
  useGetProject,
} from "../../api/controller";
import { formatDate, parseISO } from "date-fns";
import { TabsProject } from "./tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui/alert-dialog";
import { getApiErrorMessage, getHttpErrorStatus } from "../../api/error-utils";
import { ModalUpdateProject } from "./components/modal-update-project";
import { useSession } from "@entities/session";
import { Textarea } from "@shared/ui/textarea";

const stageColorMap: Record<string, string> = {
  Инициация: "text-sky-600 bg-sky-500/10",
  Планирование: "text-indigo-600 bg-indigo-500/10",
  Проектирование: "text-violet-600 bg-violet-500/10",
  Внедрение: "text-emerald-600 bg-emerald-500/10",
  Разработка: "text-blue-600 bg-blue-500/10",
  Тестирование: "text-amber-600 bg-amber-500/10",
  Заморожен: "text-slate-600 bg-slate-500/10",
  Закрытие: "text-zinc-600 bg-zinc-500/10",
};

const formatProjectDate = (value: string) => {
  if (!value) return "";
  return formatDate(parseISO(value), "dd.MM.yyyy");
};

export const ProjectPage = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  const idUser = session?.idUser;
  const queryClient = useQueryClient();
  const [description, setDescription] = useState("");
  const { id: rawId } = useParams<{ id: string }>();
  const id = rawId ? Number(rawId) : NaN;
  const validId = Number.isFinite(id) && id > 0 ? id : undefined;
  const { data: project, error, isError, isFetched } = useGetProject(validId);
  const [accessDeniedOpen, setAccessDeniedOpen] = useState(false);
  const accessDeniedMessage =
    getApiErrorMessage(error) ?? "Нет доступа к подробностям проекта.";

  const { mutate: createDescription, isPending } = useCreateDescription(
    validId ? validId : 0,
  );

  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject(validId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [rawId]);

  useEffect(() => {
    if (!validId || !isFetched || !isError) return;
    if (getHttpErrorStatus(error) === 403) {
      setAccessDeniedOpen(true);
    }
  }, [validId, isFetched, isError, error]);

  const handleDeleteProject = () => {
    if (validId == null) return;
    deleteProject(undefined, {
      onSuccess: () => {
        navigate(ROUTES_PATH.PROJECTS);
      },
    });
  };

  useEffect(() => {
    if (project?.description) {
      setDescription(project.description);
    }
  }, [project?.description]);

  const isChanged = description !== (project?.description ?? "");

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title={"Проект"} />
      <div className="rounded-3xl px-4 py-4 flex-1 min-h-0 overflow-y-auto bg-background flex flex-col gap-4">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit shrink-0"
                onClick={() => navigate(ROUTES_PATH.PROJECTS)}
              >
                <ChevronLeft className="size-4 text-white" />
              </Button>
              <p className="text-xl font-bold">{project?.name}</p>
              <span
                className={cn(
                  "inline-flex rounded-sm px-2.5 py-1 text-[12px] font-medium",
                  stageColorMap[project?.stage ?? ""],
                )}
              >
                {project?.stage}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Calendar className="size-4" />
              <span>{formatProjectDate(project?.start_date ?? "")}</span> -{" "}
              <span>{formatProjectDate(project?.end_date ?? "")}</span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            {project &&
              (idUser === 2875 || idUser === 2808 || idUser === 2879) && (
                <ModalUpdateProject
                  project={project}
                  trigger={
                    <Button type="button" size="sm" variant="outline">
                      <Pencil className="size-4" />
                      Редактировать проект
                    </Button>
                  }
                />
              )}
            {project &&
              (idUser === 2875 || idUser === 2808 || idUser === 2879) && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      size="sm"
                      disabled={validId == null || isDeletingProject}
                    >
                      Удалить проект
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Удалить проект?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Это действие нельзя отменить. Проект будет удалён
                        навсегда.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeletingProject}>
                        Отмена
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={validId == null || isDeletingProject}
                        onClick={() => handleDeleteProject()}
                      >
                        {isDeletingProject ? "Удаление…" : "Удалить"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-500 rounded-full"></div>
        <div className="grid grid-cols-[1fr_auto] gap-2 w-full items-start">
          <Textarea
            placeholder="Описание проекта"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] resize-none"
          />
          <Button
            type="button"
            onClick={() => createDescription({ description })}
            disabled={isPending || !description || !isChanged}
            className="shrink-0"
          >
            {isPending ? "..." : <Check className="size-4" />}
          </Button>
        </div>
        {project && !accessDeniedOpen && <TabsProject project={project} />}
      </div>
      <AlertDialog
        open={accessDeniedOpen}
        onOpenChange={(open) => {
          setAccessDeniedOpen(open);
          if (!open) {
            if (validId != null) {
              queryClient.removeQueries({ queryKey: ["project", validId] });
            }
            navigate(ROUTES_PATH.PROJECTS);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Доступ ограничен</AlertDialogTitle>
            <AlertDialogDescription>
              {accessDeniedMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>К списку проектов</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
