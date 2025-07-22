import { AgeGroupsGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

import { Card } from "@shared/ui/card";

export const AgeGroupsGraph = ({
  //   graph,
  isLoading,
}: {
  graph: AgeGroupsGraphResponse;
  isLoading: boolean;
}) => {
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="min-h-[400px]" />
      ) : (
        <Card className="min-h-[400px]">
          {/* <StackedBarChart
            series={graph.series.map((item) => ({
              name: item.name,
              data: item.data.map((item) => item[1] as number),
            }))}
            xAxisData={graph.xAxis}
            title="Распределение по полу и возрасту"
          /> */}
        </Card>
      )}
    </>
  );
};
