import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { TopActionsResponse } from "../../config";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import AntiLoyalTopSkeleton from "@widgets/dashboard/anti-loyal-top/anti-loyal-top-skeleton";
import { useGraphColors } from "@shared/hooks/use-graph-colors";

export const TopActions = ({
  graph,
  isLoading,
}: {
  graph: TopActionsResponse[];
  isLoading: boolean;
}) => {
  const colors = useGraphColors();

  return (
    <>
      {!isLoading && graph ? (
        <Card className="w-full min-h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Топ 5 примененных скидок по карте лояльности</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <BarHorizontalChart
              unit={"₽"}
              labels={graph.map((item) => item.discountType)}
              values={graph.map((item) => item.discount)}
              itemColors={graph.map(() => colors.series[0])}
              formatter={(params: any) => {
                const name = graph[params.dataIndex].discountType;
                return `${name}`;
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <AntiLoyalTopSkeleton />
      )}
    </>
  );
};
