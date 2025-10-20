import { cn } from "@shared/lib/utils";
import { Badge } from "@shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { BarChart } from "@shared/ui/graphs/bar-chart/bar-chart";
import { NpsGraphResponse, useNpsController } from "@widgets/dashboard/nps/api";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { useEffect, useState } from "react";
import { SummarySkeleton } from "./summary-skeleton";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const Summary = ({ tv }: { tv?: boolean }) => {
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
    <Card className={cn("h-full shrink-0", tv && "border-0 pt-0")}>
      {tv && (
        <CardHeader>
          <CardTitle className="text-center">NPS сводка по месяцам</CardTitle>
          <CardTitle className="text-center mt-4">
            <div className={cn("text-4xl font-bold")}>{summaryNps} / 100</div>
            <Badge
              className={cn(
                getNPSColor(summaryNps).bg,
                getNPSColor(summaryNps).text,
              )}
            >
              {getNPSColor(summaryNps).label}
            </Badge>
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="h-full shrink-0">
        {!tv && (
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
        )}
        {tv ? (
          <CardContent className="flex-1 h-full overflow-hidden max-h-[300px]">
            <BarChart
              xAxisData={
                npsGraph.map(
                  (item) =>
                    new Date(item.date).toLocaleString("ru-RU", {
                      month: "long",
                    }), // Преобразование даты в название месяца
                ) || []
              }
              yAxisData={npsGraph.map((item) => item.nps_card) || []}
              tooltipData={npsGraph.map((item) => item.date) || []}
              show={!isMobile}
            />
          </CardContent>
        ) : (
          <BarChart
            xAxisData={
              npsGraph.map(
                (item) =>
                  new Date(item.date).toLocaleString("ru-RU", {
                    month: "long",
                  }), // Преобразование даты в название месяца
              ) || []
            }
            yAxisData={npsGraph.map((item) => item.nps_card) || []}
            tooltipData={npsGraph.map((item) => item.date) || []}
            show={!isMobile}
          />
        )}
      </CardContent>
    </Card>
  );
};
