import { HeatmapMigrationPerSegmentResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { FC } from "react";
import { HeatChart } from "@shared/ui/heatmap-chart";

interface Props {
  graph: HeatmapMigrationPerSegmentResponse;
  isLoading: boolean;
}

export const HeatmapMigrationPerSegment: FC<Props> = ({ graph, isLoading }) => {
  const isSafari = useSafari();

  if (
    isLoading ||
    graph?.xAxis.length === 0 ||
    graph?.yAxis.length === 0 ||
    graph?.matrixData.length === 0
  ) {
    return <StackedLineSkeleton className="h-[800px] col-span-2" />;
  }

  return (
    <Card className="h-[800px] col-span-2 gap-0">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          Тепловая карта
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full">
        <HeatChart
          series={graph.matrixData}
          xAxisData={graph.xAxis}
          yAxisData={graph.yAxis}
          grid={{
            bottom: isSafari ? 50 : 20,
          }}
          formatter={(params) => {
            return `
                  ${params.marker}Был: ${graph.yAxis[params.value[1]]}<br />
                  ${params.marker}Стал: ${graph.xAxis[params.value[0]]}<br />
                  ${params.marker}Мигрировало клиентов: ${params.value[2]}<br />
                `;
          }}
        />
      </CardContent>
    </Card>
  );
};
