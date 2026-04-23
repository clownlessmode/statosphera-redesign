import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion";
import { useGetTaskGroups } from "@pages/projects/api/controller";
import { ProjectAccordionGroupsSkeleton } from "./components/project-accordion-groups-skeleton";
import { folderAccordionTriggerClassName } from "./lib/accordion-styles";
import { TaskGroupPanel } from "./task-group-panel";
import { Folder } from "lucide-react";
import { ModalCreateGroupTask } from "./components/modal-create-group-task";
import { ModalCreateTask } from "./components/modal-create-task";
import { useSession } from "@entities/session";

export const TasksGroupTab = ({ id_project }: { id_project: number }) => {
  const { data: taskGroups, isPending, isError } = useGetTaskGroups(id_project);
  const { session } = useSession();
  const idUser = session?.idUser;
  const [openItems, setOpenItems] = useState<string[]>([]);

  if (isPending) {
    return <ProjectAccordionGroupsSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Не удалось загрузить группы задач.
      </p>
    );
  }

  return (
    <>
      {(idUser === 2875 || idUser === 2808 || idUser === 2879) && (
        <div className="flex justify-end">
          <ModalCreateGroupTask project_id={id_project} />
        </div>
      )}
      <Accordion
        type="multiple"
        className="w-full"
        value={openItems}
        onValueChange={setOpenItems}
      >
        {taskGroups.map((taskGroup) => {
          const value = String(taskGroup.id);
          const isOpen = openItems.includes(value);
          return (
            <AccordionItem
              key={taskGroup.id}
              value={value}
              className="border-b-0"
            >
              <AccordionTrigger className={folderAccordionTriggerClassName}>
                <div className="flex flex-col items-start gap-1 text-left pr-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <Folder className="size-4 shrink-0 text-muted-foreground" />
                      <span className="font-medium">{taskGroup.name}</span>
                    </div>
                    <span className="text-sm font-normal">
                      {taskGroup.description}
                    </span>
                  </div>
                  <span className="text-xs font-normal text-muted-foreground">
                    Задач в группе: {taskGroup.tasks_count}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2 pt-0">
                <div className="flex justify-end mt-2 mb-2">
                  <ModalCreateTask
                    project_id={id_project}
                    group_id={taskGroup.id}
                  />
                </div>
                <TaskGroupPanel
                  id_project={id_project}
                  group_id={taskGroup.id}
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
