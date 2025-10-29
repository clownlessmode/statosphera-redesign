import { AgeSalesGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

import { Card } from "@shared/ui/card";

import { BarChartMultiSeries } from "@shared/ui/substacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const AgeSalesGraph = ({
  graph,
  isLoading,
}: {
  graph: AgeSalesGraphResponse;
  isLoading: boolean;
}) => {
  const isSafari = useSafari();
  const isMobile = useIsMobile();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[400px] col-span-2" />
      ) : (
        <Card className="h-[400px] col-span-2">
          <div style={{ height: 400, width: "100%" }}>
            <BarChartMultiSeries
              xAxisData={graph.xAxis}
              series={graph.series.map((item) => ({
                name: item.name,
                data: item.data,
              }))}
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `${item.marker}${item.seriesName}: ${item.value}`,
                    )
                    .join("<br/>");
                }
                return `${params.value.toLocaleString()}`;
              }}
              title={
                isMobile
                  ? "Чеки по возрастной группе"
                  : "Количество чеков по полу в разрезе возрастной группы"
              }
            />
          </div>
        </Card>
      )}
    </>
  );
};
