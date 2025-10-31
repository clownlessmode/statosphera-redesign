import { SankeyMigrationClientPerSegmentsResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { FC } from "react";
import { SankeyChart } from "@shared/ui/sankey-chart";

interface Props {
  graph: SankeyMigrationClientPerSegmentsResponse;
  isLoading: boolean;
}

export const SankeyMigrationClientPerSegments: FC<Props> = ({
  graph,
  isLoading,
}) => {
  const isSafari = useSafari();

  if (isLoading || graph?.nodes.length === 0 || graph?.links.length === 0) {
    return <StackedLineSkeleton className="h-[800px] col-span-2" />;
  }

  return (
    <Card className="h-[800px] col-span-2 gap-0 overflow-visible">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold max-md:text-sm">
          Диаграмма потоков
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full w-full">
        <SankeyChart
          data={graph}
          grid={{
            bottom: isSafari ? 50 : 20,
          }}
          formatter={(params) => {
            const tooltip =
              params.data.source || params.data.target
                ? `${params.marker}Был: ${params.data.source}<br />
                  ${params.marker}Стал: ${params.data.target}<br />`
                : `${params.marker}Сегмент: ${params.name}<br />`;
            return `
                  ${tooltip}
                  ${params.marker}Мигрировало клиентов: ${params.value
                    .toLocaleString()
                    .replace(/,/g, " ")}<br />
                `;
          }}
        />
      </CardContent>
    </Card>
  );
};
