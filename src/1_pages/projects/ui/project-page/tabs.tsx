import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
// import { TasksGroupTab } from "./tasks-group";
import type { ProjectDetail } from "../../api/types/response";
import { DocumentsGroupTab } from "./documents-group";

export function TabsProject({ project }: { project: ProjectDetail }) {
  return (
    <Tabs defaultValue="Tasks" className="">
      <TabsList className="flex items-right w-full mb-4">
        {/* <TabsTrigger value="Tasks">Группа задач ({project.task_groups_count ?? 0})</TabsTrigger> */}
        <TabsTrigger value="Documents">
          Группа документов ({project.doc_groups_count ?? 0})
        </TabsTrigger>
      </TabsList>
      {/* <TabsContent value="Tasks">
        <TasksGroupTab id_project={project.id} />
      </TabsContent> */}
      <TabsContent value="Documents">
        <DocumentsGroupTab id_project={project.id} />
      </TabsContent>
    </Tabs>
  );
}
