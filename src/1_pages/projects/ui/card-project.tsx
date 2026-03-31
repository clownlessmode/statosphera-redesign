import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Projects } from "../api/types/response";
import { cn } from "@shared/lib/utils";
import { Clock, ClockAlert, ShieldUser, User, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@shared/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";

const formatProjectDate = (value: string) => {
  if (!value) return "";
  return value.split("T")[0];
};

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

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

export const CardProject = ({ project }: { project: Projects }) => {
  const isClosed = project.stage === "Закрытие";
  const endMs = new Date(project.end_date).getTime();
  const nowMs = Date.now();
  const isOverdue = !isClosed && endMs < nowMs;
  const isDueSoon = !isClosed && !isOverdue && endMs - nowMs < WEEK_MS;

  const borderClass = isOverdue
    ? "border-red-500"
    : isDueSoon
      ? "border-yellow-500"
      : "";

  return (
    <Card
      className={cn(
        borderClass,
        "cursor-pointer transition-all duration-300 hover:-translate-y-1 group",
      )}
    >
      <CardHeader>
        <CardTitle>
          <div className="grid grid-cols-[1fr_auto] items-center gap-2">
            <p className="text-sm truncate">{project.name}</p>
            <p
              className={cn(
                project.priority === "Высокий"
                  ? "text-red-500 bg-red-500/10 rounded-full px-2 py-1"
                  : project.priority === "Средний"
                    ? "text-yellow-500 bg-yellow-500/10 rounded-full px-2 py-1"
                    : "text-green-500 bg-green-500/10 rounded-full px-2 py-1",
                "text-[12px] font-light",
              )}
            >
              {project.priority}
            </p>
          </div>
        </CardTitle>
        <CardContent className="px-0 pt-2 flex flex-col gap-4">
          <div>
            <p
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 text-[12px] font-medium",
                stageColorMap[project.stage] ??
                  "text-muted-foreground bg-muted",
              )}
            >
              {project.stage}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={"/avatar.png"} />
              <AvatarFallback className="bg-primary">
                {project.responsible_name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-light truncate max-w-48">
                {project.responsible_name}
              </p>
              <p className="text-[12px] text-muted-foreground">Ответственный</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-2">
                <div>
                  <Tooltip>
                    <TooltipTrigger className="flex flex-row items-center gap-2">
                      <ShieldUser className="size-4" />
                      <p className="text-sm font-light truncate max-w-32">
                        {project.pm_name}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Проджект-менеджер</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip>
                    <TooltipTrigger className="flex flex-row items-center gap-2">
                      <Users className="size-4" />
                      <p className="text-sm font-light truncate max-w-36">
                        {project.team_info}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Команда</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div>
                <Tooltip>
                  <TooltipTrigger className="flex flex-row items-center gap-2">
                    <User className="size-4" />
                    <p className="text-sm font-light truncate max-w-32">
                      {project.client_name}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Заказчик</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-600 rounded-full"></div>
          <div className="flex flex-row justify-between">
            <div>
              <Tooltip>
                <TooltipTrigger className="flex flex-row items-center gap-1">
                  <Clock className="size-4" />
                  <p className="text-sm font-light">
                    {formatProjectDate(project.start_date)}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Дата начала проекта</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger className="flex flex-row items-center gap-1">
                  <ClockAlert className="size-4" />
                  <p className="text-sm font-light">
                    {formatProjectDate(project.end_date)}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Дата окончания проекта</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
