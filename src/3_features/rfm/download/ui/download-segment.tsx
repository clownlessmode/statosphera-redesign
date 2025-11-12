import { Button } from "@shared/ui/button";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { Download } from "lucide-react";
import { useDownloadSegmentController } from "../model/api/controller";
import React from "react";

const DownloadSegment = ({ rfmCode }: { rfmCode: number }) => {
  const { getApiPayload } = useFiltersStore();
  const { downloadSegment } = useDownloadSegmentController();

  const handleDownloadReport = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    const { agePeriods, sex, period } = getApiPayload();

    await downloadSegment({
      rfmCode: rfmCode,
      age: agePeriods,
      sex: sex,
      period: period,
    });
  };

  return (
    <Button asChild size="sm" className="h-full" variant="ghost">
      <div onClick={(e) => handleDownloadReport(e)}>
        <Download />
      </div>
    </Button>
  );
};

export default DownloadSegment;
