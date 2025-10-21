import { RevenueGroupsGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

import { Card } from "@shared/ui/card";

import { HorizontalStackedBarChart } from "@shared/ui/horizontal-stacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const RevenueGroupsGraph = ({
  graph,
  isLoading,
}: {
  graph: RevenueGroupsGraphResponse;
  isLoading: boolean;
}) => {
  const isSafari = useSafari();
  const isMobile = useIsMobile();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="md:h-[400px]" />
      ) : (
        <Card className="md:h-[400px]">
          <div style={{ height: "400px", width: "100%" }}>
            <HorizontalStackedBarChart
              yAxisData={graph.yAxis}
              series={graph.series.map((item) => ({
                name: item.name,
                data: item.data,
              }))}
              grid={{
                bottom: isSafari ? 50 : 20,
                top: 80,
              }}
              title={
                isMobile
                  ? "Выручка по возрасту и полу"
                  : "Выручка по возрастным группам и полу"
              }
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `${item.marker}${item.seriesName}: ${item.value.toLocaleString()} ₽`,
                    )
                    .join("<br/>");
                }
                return `${params.value}`;
              }}
            />
          </div>
        </Card>
      )}
    </>
  );
};
