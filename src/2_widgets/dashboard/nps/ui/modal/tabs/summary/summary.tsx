import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent } from "@shared/ui/card";
import { BarChart } from "@shared/ui/graphs/bar-chart/bar-chart";
import { NpsGraphResponse, useNpsController } from "@widgets/dashboard/nps/api";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { useEffect, useState } from "react";
import { SummarySkeleton } from "./summary-skeleton";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const Summary = () => {
  const { isSummaryNpsLoading, summaryNps, getNpsGraph, isNpsGraphLoading } =
    useNpsController();
  const [npsGraph, setNpsGraph] = useState<NpsGraphResponse[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getNpsGraph({ id_store: [] });
      setNpsGraph(data);
    };
    fetchData();
  }, []);
  const isMobile = useIsMobile();

  if (isSummaryNpsLoading || isNpsGraphLoading) {
    return <SummarySkeleton />;
  }

  return (
    <Card className="h-full">
      <CardContent className="h-full flex-1">
        <div className="text-center">
          <div className={cn("text-4xl font-bold")}>{summaryNps} / 100</div>
          <Badge
            className={cn(
              getNPSColor(summaryNps).bg,
              getNPSColor(summaryNps).text,
            )}
          >
            {getNPSColor(summaryNps).label}
          </Badge>
        </div>
        <CardContent className="h-full overflow-hidden max-h-[300px]">
          <BarChart
            xAxisData={npsGraph.map((item) => item.date) || []}
            yAxisData={npsGraph.map((item) => item.nps_card) || []}
            tooltipData={npsGraph.map((item) => item.date) || []}
            show={!isMobile}
          />
        </CardContent>
      </CardContent>
    </Card>
  );
};
