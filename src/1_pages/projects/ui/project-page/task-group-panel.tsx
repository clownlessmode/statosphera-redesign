import { useGetTasks } from "@pages/projects/api/controller";
import { GroupNestedList } from "./components/group-nested-list";
import { GroupNestedListSkeleton } from "./components/group-nested-list-skeleton";
import { ProjectTaskItem } from "./components/project-task-item";

type Props = {
  id_project: number;
  group_id: number;
  isOpen: boolean;
};

export function TaskGroupPanel({ id_project, group_id, isOpen }: Props) {
  const {
    data: tasks,
    isPending,
    isError,
  } = useGetTasks(id_project, group_id, {
    enabled: isOpen,
  });

  if (isPending) {
    return <GroupNestedListSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive pl-2">
        Не удалось загрузить задачи.
      </p>
    );
  }

  if (!tasks?.length) {
    return (
      <p className="text-sm text-muted-foreground pl-2">
        В группе пока нет задач.
      </p>
    );
  }

  return (
    <GroupNestedList>
      {tasks.map((task) => (
        <ProjectTaskItem key={task.id} task={task} />
      ))}
    </GroupNestedList>
  );
}
