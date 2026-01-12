import { HeatmapNightStoresResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import useSafari from "@shared/hooks/use-safari";
import { FC, useState } from "react";
import { HeatChart } from "@shared/ui/heatmap-chart";
import { useIsMobile } from "@shared/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";
import { Info } from "lucide-react";

interface Props {
  graph: HeatmapNightStoresResponse | null;
  isLoading: boolean;
}

type Indicators =
  | "proceeds"
  | "profit"
  | "uniqueCheck"
  | "avgCheck"
  | "uniqueCardNumber";

export const HeatmapNightStores: FC<Props> = ({ graph, isLoading }) => {
  const [indicator, setIndicator] = useState<Indicators>("proceeds");
  const isSafari = useSafari();
  const isMobile = useIsMobile();

  if (
    isLoading ||
    !graph ||
    graph?.proceeds.xAxis.length === 0 ||
    graph?.proceeds.yAxis.length === 0 ||
    graph?.proceeds.matrixData.length === 0
  ) {
    return (
      <StackedLineSkeleton className="h-[800px] col-span-2 max-md:h-[600px]" />
    );
  }

  return (
    <Card className="h-[800px] col-span-2 gap-0 max-md:h-[600px] overflow-visible">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center max-md:text-sm">
          Тепловая карта по
        </CardTitle>
        <Select
          defaultValue="proceeds"
          onValueChange={(value) => {
            setIndicator(value as Indicators);
          }}
        >
          <SelectTrigger className="h-5! p-0! bg-card! shadow-none border-0 text-base font-semibold text-accent hover:text-accent/70 gap-0.5">
            <SelectValue placeholder="Показатель" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="proceeds">выручке</SelectItem>
            <SelectItem value="profit">прибыли</SelectItem>
            <SelectItem value="uniqueCheck">чекам</SelectItem>
            <SelectItem value="avgCheck">среднему чеку</SelectItem>
            <SelectItem value="uniqueCardNumber">уникальным картам</SelectItem>
          </SelectContent>
        </Select>
        <Tooltip>
          <TooltipTrigger className="ml-1 max-md:hidden" asChild>
            <Info className="h-4 w-4 shrink-0 text-muted-foreground hover:text-foreground transition-colors" />
          </TooltipTrigger>
          <TooltipContent
            sideOffset={10}
            className="w-[300px] h-fit p-2 text-center"
            side="right"
          >
            По вертикали — номера недель с начала периода, по горизонтали — дни
            недели.
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent className="h-full w-full">
        <HeatChart
          series={graph[indicator].matrixData}
          xAxisData={graph[indicator].xAxis}
          yAxisData={graph[indicator].yAxis}
          min={graph[indicator].min}
          max={graph[indicator].max}
          grid={{
            bottom: isSafari ? (!isMobile ? 50 : 70) : !isMobile ? 20 : 60,
          }}
          formatter={(params) => {
            return `
                  <strong>${graph[indicator].xAxis[params.value[0]]}</strong><br />
                  ${params.marker}<strong>Дата:</strong> ${graph[indicator].datesDict[`${params.data[1]}${params.data[0]}`]}<br />
                  ${params.marker}<strong>${indicator === "proceeds" ? "Выручка:" : indicator === "profit" ? "Прибыль:" : "Чеки:"}</strong> ${params.value[2].toLocaleString().replace(/,/g, " ")} ${indicator === "uniqueCheck" || indicator === "uniqueCardNumber" ? "шт." : "₽"}<br />
                `;
          }}
          formatNumber={(value) => {
            if (value >= 1000000) {
              return `${(value / 1000000).toFixed(1).replace(/\.0$/, "")} М`;
            }
            if (value >= 1000) {
              return `${(value / 1000).toFixed(1).replace(/\.0$/, "")} Т`;
            }
            return value.toFixed(0);
          }}
        />
      </CardContent>
    </Card>
  );
};
