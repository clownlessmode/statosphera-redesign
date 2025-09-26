import { AgeGroupsGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

import { Card } from "@shared/ui/card";

import { BarChartMultiSeries } from "@shared/ui/substacked-bar-chart";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const AgeGroupsGraph = ({
  graph,
  isLoading,
}: {
  graph: AgeGroupsGraphResponse;
  isLoading: boolean;
}) => {
  const isMobile = useIsMobile();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[400px]" />
      ) : (
        <Card className="h-[400px]">
          <BarChartMultiSeries
            xAxisData={graph.xAxis}
            series={graph.series.map((item) => ({
              name: item.name,
              data: item.data,
            }))}
            title={
              isMobile
                ? "Покупки по возрасту и полу"
                : "Частота покупок по возрастным группам и полу"
            }
          />
        </Card>
      )}
    </>
  );
};
