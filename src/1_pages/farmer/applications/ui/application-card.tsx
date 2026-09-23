import { Card } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Clock, ChevronRight, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { FarmerApplication } from "@entities/farmer";
import {
  getStage,
  getStageProgress,
  TOTAL_MAIN_STEPS,
} from "../config/stage-flow";
import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";

interface ApplicationCardProps {
  application: FarmerApplication;
  onOpenDetails: (application: FarmerApplication) => void;
}

export const ApplicationCard = ({
  application,
  onOpenDetails,
}: ApplicationCardProps) => {
  const stage = getStage(application.stageKey, application.stageId);

  return (
    <Card className="flex flex-col justify-between p-5">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-foreground uppercase tracking-wider">
              Заявка #{application.itemId}
            </span>
            {stage?.category === "action_required" && (
              <AlertCircle className="size-4 text-primary" />
            )}
          </div>
          {stage?.shortName && (
            <Badge variant="muted">{stage?.shortName}</Badge>
          )}
        </div>
        <p
          className={cn(
            "line-clamp-3 text-xs leading-relaxed text-muted-foreground",
            !application.technical_task && "italic text-muted-foreground",
          )}
        >
          {application.technical_task || "Техническое задание не указано"}
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {stage && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-foreground">Прогресс</span>
              <span className="text-xs text-foreground">
                {stage.mainStep} из {TOTAL_MAIN_STEPS} этапов
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-background overflow-hidden">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${getStageProgress(stage)}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3 shrink-0" />
            <span className="text-xs">
              {format(new Date(application.updatedTime), "d MMM yyyy, HH:mm", {
                locale: ru,
              })}
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => onOpenDetails(application)}
            className="text-xs group/btn gap-1"
          >
            Подробнее
            <ChevronRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
