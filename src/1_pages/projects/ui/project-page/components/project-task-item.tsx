import type { Task } from "@pages/projects/api/types/response";
import { cn } from "@shared/lib/utils";
import { formatProjectDay } from "../lib/format-project-date";

const cardClass = cn(
  "rounded-lg border bg-card/50 px-3 py-2.5 text-sm",
  "transition-colors hover:bg-muted/40",
);

type Props = {
  task: Task;
};

function formatAssigneeLine(assignees: Task["assignees"]) {
  const names =
    assignees?.map((a) => a.name).filter((n) => Boolean(n?.trim())) ?? [];
  if (!names.length) return null;
  const label = names.length > 1 ? "Исполнители" : "Исполнитель";
  return `${label}: ${names.join(", ")}`;
}

export function ProjectTaskItem({ task }: Props) {
  const assigneeLine = formatAssigneeLine(task.assignees);

  return (
    <li className={cardClass}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <span className="font-medium leading-snug">{task.name}</span>
        <span className="shrink-0 text-xs text-muted-foreground whitespace-nowrap">
          до {formatProjectDay(task.due_date)}
        </span>
      </div>
      {task.status && (
        <p className="mt-1 text-xs text-muted-foreground">
          Статус: {task.status}
        </p>
      )}
      {assigneeLine && (
        <p className="mt-1 text-xs text-muted-foreground">{assigneeLine}</p>
      )}
    </li>
  );
}
