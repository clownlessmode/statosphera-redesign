import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion";
import {
  useDeleteDocumentGroup,
  useGetDocGroups,
} from "@pages/projects/api/controller";
import { ProjectAccordionGroupsSkeleton } from "./components/project-accordion-groups-skeleton";
import { DocumentGroupPanel } from "./document-group-panel";
import { folderAccordionTriggerClassName } from "./lib/accordion-styles";
import { Folder } from "lucide-react";
import { ModalCreateGroupDoc } from "./components/modal-create-group-doc";
import { ModalCreateDoc } from "./components/modal-create-doc";
import { Button } from "@shared/ui/button";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog";
import { ModalGetGroupDoc } from "./components/modal-get-group-doc";
import { useSession } from "@entities/session";

export const DocumentsGroupTab = ({ id_project }: { id_project: number }) => {
  const { session } = useSession();
  const idUser = session?.idUser;
  const { data: docGroups, isPending, isError } = useGetDocGroups(id_project);
  const [openItems, setOpenItems] = useState<string[]>([]);

  const { mutate: deleteDocumentGroup } = useDeleteDocumentGroup(id_project);

  if (isPending) {
    return <ProjectAccordionGroupsSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Не удалось загрузить группы документов.
      </p>
    );
  }

  return (
    <>
      {[2875, 2808, 2879, 2904].includes(idUser ?? -1) && (
        <div className="flex justify-end">
          <ModalCreateGroupDoc project_id={id_project} />
        </div>
      )}
      <Accordion
        type="multiple"
        className="w-full"
        value={openItems}
        onValueChange={setOpenItems}
      >
        {docGroups.map((docGroup) => {
          const value = String(docGroup.id);
          const isOpen = openItems.includes(value);
          return (
            <AccordionItem
              key={docGroup.id}
              value={value}
              className="border-b-0"
            >
              <AccordionTrigger className={folderAccordionTriggerClassName}>
                <div className="flex flex-row items-center justify-between w-full">
                  <div className="flex flex-col items-start gap-1 text-left pr-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Folder className="size-4 shrink-0 text-muted-foreground" />
                        <span className="font-medium">{docGroup.name}</span>
                      </div>
                      <span className="text-sm font-normal">
                        {docGroup.description}
                      </span>
                    </div>
                    <span className="text-xs font-light text-muted-foreground">
                      Документов в группе: {docGroup.documents_count}
                    </span>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex flex-row gap-2"
                  >
                    {/* модалка для просмотра инфы и редактирования */}
                    {[2875, 2808, 2879, 2904].includes(idUser ?? -1) && (
                      <ModalGetGroupDoc
                        project_id={id_project}
                        docGroup={docGroup}
                      />
                    )}
                    {/* модалка для созлания группы документов */}
                    {[2875, 2808, 2879, 2904].includes(idUser ?? -1) && (
                      <ModalCreateDoc
                        project_id={id_project}
                        group_id={docGroup.id}
                      />
                    )}
                    {/* модалка для удаления группы документов */}
                    {[2875, 2808, 2879, 2904].includes(idUser ?? -1) && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm">Удалить группу</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Удалить группу?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Вы уверены, что хотите удалить группу?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Отмена</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteDocumentGroup(docGroup.id)}
                            >
                              Удалить
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-0">
                <div className="flex justify-start mt-2 mb-2"></div>
                <DocumentGroupPanel
                  id_project={id_project}
                  group_id={docGroup.id}
                  isOpen={isOpen}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
