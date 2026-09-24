import { useFarmerApplicationDetail } from "@entities/farmer";
import { FarmerApplication } from "@entities/farmer";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { StageTimeline } from "./stage-timeline";
import { ApplicationTabs } from "./application-tabs";
import {
  FarmerApprovalForm,
  LabelApprovalForm,
  MrpRevisionForm,
  NdFillForm,
  NdRevisionForm,
} from "@features/farmer/applications";
import { getStage } from "../config/stage-flow";
import { X } from "lucide-react";
import { Separator } from "@shared/ui/separator";
import { ApplicationsDetailSkeleton } from "./applications-detail-skeleton";

interface ApplicationDetailProps {
  application: FarmerApplication;
  onBack: () => void;
}

export const ApplicationDetail = ({
  application,
  onBack,
}: ApplicationDetailProps) => {
  const { data, isLoading, isError, refetch } = useFarmerApplicationDetail(
    application.itemId,
  );

  const stage = getStage(
    data?.common?.stage_name || application.stageKey,
    application.stageId,
  );

  return (
    <div className="flex flex-col gap-4 animate-in fade-in-50 duration-200">
      <Card className="flex flex-col p-5">
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            <X className="size-4" />
          </Button>
          <span className="text-xl font-bold uppercase tracking-wider text-foreground sm:text-2xl">
            Заявка #{application.itemId}
          </span>
        </div>

        <Separator />

        <StageTimeline currentStage={stage} />
      </Card>

      {isLoading ? (
        <ApplicationsDetailSkeleton />
      ) : isError ? (
        <Card className="p-8 flex flex-col items-center justify-center gap-3 text-center">
          <p className="text-sm font-semibold text-destructive">
            Не удалось загрузить подробные данные заявки
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Повторить попытку
          </Button>
        </Card>
      ) : data ? (
        <>
          {stage?.stageKey === "UC_HRKJ5S" && (
            <FarmerApprovalForm itemId={application.itemId} />
          )}
          {stage?.stageKey === "UC_XA4NH4" && (
            <MrpRevisionForm itemId={application.itemId} />
          )}
          {stage?.stageKey === "UC_1B20Z0" && (
            <NdFillForm itemId={application.itemId} />
          )}
          {stage?.stageKey === "UC_21AWKG" && (
            <NdRevisionForm itemId={application.itemId} />
          )}
          {stage?.stageKey === "UC_1BO6E2" && (
            <LabelApprovalForm itemId={application.itemId} />
          )}
          <ApplicationTabs application={data} summaryApp={application} />
        </>
      ) : null}
    </div>
  );
};
