import { SecondCalculationResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { BarMultiDrilldownChart } from "@shared/ui/bar-multi-drilldown-chart";

export const SecondCalculation = ({
  graph,
  isLoading,
}: {
  graph: SecondCalculationResponse;
  isLoading: boolean;
}) => {
  console.log(graph);
  const isSafari = useSafari();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="h-[400px]" />
      ) : (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle className="text-center text-xl font-bold">
              Количество чеков
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <BarMultiDrilldownChart
              allSeries={graph}
              rootLevel="Сегменты"
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `Период: ${item.value[0]}<br/>
                      Чеки: ${item.value[1]}`,
                    )
                    .join("<br/>");
                }
                return `${params.value[1]}`;
              }}
            />
          </CardContent>
        </Card>
      )}
    </>
  );
};
