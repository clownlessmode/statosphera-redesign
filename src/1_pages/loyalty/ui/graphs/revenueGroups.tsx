import { AgeGroupsGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

import { Card } from "@shared/ui/card";

import { HorizontalStackedBarChart } from "@shared/ui/horizontal-stacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";

export const RevenueGroupsGraph = ({
  graph,
  isLoading,
}: {
  graph: AgeGroupsGraphResponse;
  isLoading: boolean;
}) => {
  const isSafari = useSafari();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[400px]" />
      ) : (
        <Card className="h-[400px]">
          <div style={{ height: 400, width: "100%" }}>
            <HorizontalStackedBarChart
              yAxisData={graph.xAxis}
              series={graph.series.map((item) => ({
                name: item.name,
                data: item.data,
              }))}
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              title="Выручка по возрастным группам и полу"
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `${item.marker}${item.seriesName}: ${item.value}`,
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
