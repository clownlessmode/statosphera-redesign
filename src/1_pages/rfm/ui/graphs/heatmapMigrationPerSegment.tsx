import { HeatmapMigrationPerSegmentResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { FC } from "react";
import { HeatChart } from "@shared/ui/heatmap-chart";
import { useIsMobile } from "@shared/hooks";

interface Props {
  graph: HeatmapMigrationPerSegmentResponse;
  isLoading: boolean;
}

export const HeatmapMigrationPerSegment: FC<Props> = ({ graph, isLoading }) => {
  const isSafari = useSafari();
  const isMobile = useIsMobile();

  if (
    isLoading ||
    graph?.xAxis.length === 0 ||
    graph?.yAxis.length === 0 ||
    graph?.matrixData.length === 0
  ) {
    return (
      <StackedLineSkeleton className="h-[800px] col-span-2 max-md:h-[600px]" />
    );
  }

  return (
    <Card className="h-[800px] col-span-2 gap-0 max-md:h-[600px] overflow-visible">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold max-md:text-sm">
          Тепловая карта
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full">
        <HeatChart
          series={graph.matrixData}
          xAxisData={graph.xAxis}
          yAxisData={graph.yAxis}
          grid={{
            bottom: isSafari ? (!isMobile ? 50 : 70) : !isMobile ? 20 : 60,
          }}
          formatter={(params) => {
            return `
                  ${params.marker}Был: ${graph.yAxis[params.value[1]]}<br />
                  ${params.marker}Стал: ${graph.xAxis[params.value[0]]}<br />
                  ${params.marker}Мигрировало клиентов: ${params.value[2].toLocaleString().replace(/,/g, " ")}<br />
                `;
          }}
        />
      </CardContent>
    </Card>
  );
};
