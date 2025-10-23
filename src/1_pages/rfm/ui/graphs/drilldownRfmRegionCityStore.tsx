import { DrilldownRfmRegionCityStoreResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { BarMultiDrilldownChart } from "@shared/ui/bar-multi-drilldown-chart";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Info } from "lucide-react";
import { FC } from "react";

interface Props {
  graph: DrilldownRfmRegionCityStoreResponse;
  isLoading: boolean;
}

export const DrilldownRfmRegionCityStore: FC<Props> = ({
  graph,
  isLoading,
}) => {
  const isSafari = useSafari();

  if (isLoading || graph.data.length === 0) {
    return <StackedLineSkeleton className="h-[400px] col-span-2" />;
  }

  return (
    <Card className="w-full h-[400px] flex flex-col gap-0 col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-center text-base font-extrabold">
          Количество чеков по магазинам
          <Tooltip>
            <TooltipTrigger className="ml-1" asChild>
              <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
            </TooltipTrigger>
            <TooltipContent
              sideOffset={10}
              className="w-[300px] h-fit p-2 text-center"
              side="right"
            >
              Нажмите на столбец для перехода на следующий уровень.
            </TooltipContent>
          </Tooltip>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <BarMultiDrilldownChart
          allSeries={graph.data}
          rootName="Сегменты"
          rootId="things"
          grid={{
            bottom: isSafari ? 50 : 20,
          }}
          formatter={(params) => {
            if (Array.isArray(params)) {
              return params
                .map(
                  (item) =>
                    `${item.value?.length > 0 && item.value[0]}<br/>
                      Чеки: ${item.value?.length > 0 && item.value[1]}`,
                )
                .join("<br/>");
            }
            return `${params.value[1]}`;
          }}
        />
      </CardContent>
    </Card>
  );
};
