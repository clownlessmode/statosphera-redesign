import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { BarChartMultiSeries } from "@shared/ui/substacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { BarGraphResponse } from "../../config";

interface HourProceedsGraphProps {
  isLoading: boolean;
  graph: BarGraphResponse["data"] | null;
}

const HourProceedsGraph = ({ isLoading, graph }: HourProceedsGraphProps) => {
  const isSafari = useSafari();
  const isMobile = useIsMobile();

  return (
    <>
      {!isLoading && graph ? (
        <Card className="w-full h-[400px] flex flex-col gap-0">
          <CardHeader>
            <CardTitle className="text-center max-md:text-sm">
              Выручка по часам
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full w-full">
            <BarChartMultiSeries
              mirror={2}
              xAxisData={graph.categories}
              showLegend={false}
              series={graph.series.map((item) => ({
                name: item.name,
                data: item.value,
              }))}
              grid={{
                bottom: isSafari ? 50 : 20,
              }}
              formatter={(params) => {
                if (Array.isArray(params)) {
                  return params
                    .map(
                      (item) =>
                        `<strong>Час ${item.name}</strong><br/>
                        <strong>Выручка:</strong> ${item.value.toLocaleString().replace(/,/g, " ")} ₽`,
                    )
                    .join("<br/>");
                }
                return `${!isMobile ? params.value.toLocaleString().replace(/,/g, " ") : ""}`;
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <StackedLineSkeleton className="min-h-[400px]" />
      )}
    </>
  );
};

export default HourProceedsGraph;
