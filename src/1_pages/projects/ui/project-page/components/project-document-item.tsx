import type { Document } from "@pages/projects/api/types/response";
import { ModalGetDoc } from "./modal-get-doc";
import { Download } from "lucide-react";
import { Button } from "@shared/ui/button";
import { cn } from "@shared/lib/utils";
import { formatProjectDay } from "../lib/format-project-date";
import { useDeleteDocument } from "@pages/projects/api/controller";
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
import { useSession } from "@entities/session";

const cardClass = cn(
  "rounded-lg border bg-card/50 px-3 py-2.5 text-sm",
  "transition-colors hover:bg-muted/40",
);

type Props = {
  document: Document;
  id_project: number;
};

const PRIVILEGED_DOC_USER_IDS = [2875, 2808, 2879] as const;

export function ProjectDocumentItem({ document: doc, id_project }: Props) {
  const { session } = useSession();
  const idUser = session?.idUser;
  const { mutate: deleteDocument } = useDeleteDocument(
    id_project,
    doc.group_id,
    doc.id,
  );
  const accessUsers = doc.access_users;
  const isDocumentOpenToAll =
    Array.isArray(accessUsers) && accessUsers.length === 0;
  const canDownload =
    Boolean(doc.url) &&
    (isDocumentOpenToAll ||
      (idUser != null &&
        (PRIVILEGED_DOC_USER_IDS.includes(
          idUser as (typeof PRIVILEGED_DOC_USER_IDS)[number],
        ) ||
          (accessUsers?.includes(idUser) ?? false))));
  return (
    <li className={cardClass}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-medium leading-snug break-words">{doc.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {doc.uploaded_by_name} {doc.uploaded_by_last_name} ·{" "}
            {formatProjectDay(doc.created_at)}
          </p>
        </div>
        <div className="flex flex-row items-center gap-2">
          {(idUser === 2875 || idUser === 2808 || idUser === 2879) && (
            <ModalGetDoc project_id={id_project} document={doc} />
          )}
          {canDownload && (
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 h-8"
              asChild
            >
              <a href={doc.url} target="_blank" rel="noopener noreferrer">
                <Download className="size-3.5" />
                Скачать
              </a>
            </Button>
          )}
          {(idUser === 2875 || idUser === 2808 || idUser === 2879) && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button size={"sm"}>Удалить</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Вы уверены, что хотите удалить документ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Это действие нельзя отменить.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={() => deleteDocument()}>
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
    </li>
  );
}
