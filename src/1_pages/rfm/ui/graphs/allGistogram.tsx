import { AllGistogramResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import { BarChartMultiSeries } from "@shared/ui/substacked-bar-chart";
import useSafari from "@shared/hooks/use-safari";
import { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { Button } from "@shared/ui/button";

interface Props {
  graph: AllGistogramResponse;
  isLoading: boolean;
}

export const AllGistogram: FC<Props> = ({ graph, isLoading }) => {
  const [value, setValue] = useState<typeof graph.allDataCount | undefined>();
  const isSafari = useSafari();

  useEffect(() => {
    if (graph && graph.allDataCount) {
      setValue(graph.allDataCount);
    }
  }, [graph]);

  if (
    isLoading ||
    !value ||
    graph.actionDataCount.series.length === 0 ||
    graph.actionDataProceed.series.length === 0 ||
    graph.actionDataProfit.series.length === 0 ||
    graph.allDataCount.series.length === 0 ||
    graph.allDataProceed.series.length === 0 ||
    graph.allDataProfit.series.length === 0 ||
    graph.imDataCount.series.length === 0 ||
    graph.imDataProfit.series.length === 0 ||
    graph.imDataProceed.series.length === 0 ||
    graph.avgDataCount.series.length === 0 ||
    graph.avgDataProceed.series.length === 0 ||
    graph.avgDataProfit.series.length === 0 ||
    graph.avgDayCountPerClient.series.length === 0 ||
    graph.countInDanger.series.length === 0 ||
    graph.countUniqClient.series.length === 0
  ) {
    return <StackedLineSkeleton className="h-[400px] col-span-2" />;
  }

  const options = [
    {
      label: "по количеству чеков",
      value: graph.allDataCount,
    },
    {
      label: "по выручке",
      value: graph.allDataProceed,
    },
    {
      label: "по прибыли",
      value: graph.allDataProfit,
    },
    {
      label: "по количеству чеков с применением акций",
      value: graph.actionDataCount,
    },
    {
      label: "по выручка с применением акций",
      value: graph.actionDataProceed,
    },
    {
      label: "по прибыли с применением акций",
      value: graph.actionDataProfit,
    },
    {
      label: "по количеству чеков интернет магазина",
      value: graph.imDataCount,
    },
    {
      label: "по выручке интернет магазина",
      value: graph.imDataProceed,
    },
    {
      label: "по прибыли интернет магазина",
      value: graph.imDataProfit,
    },
    {
      label: "по среднему количеству чеков",
      value: graph.avgDataCount,
    },
    {
      label: "по средней выручке",
      value: graph.avgDataProceed,
    },
    {
      label: "по средней прибыли",
      value: graph.avgDataProfit,
    },
    {
      label: "по средней частоте покупок",
      value: graph.avgDayCountPerClient,
    },
    {
      label: "по количеству уникальных клиентов",
      value: graph.countUniqClient,
    },
    {
      label: "по количеству клиентов в зоне риска",
      value: graph.countInDanger,
    },
  ];

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <Card className="h-[400px] col-span-2">
      <CardHeader className="flex flex-row justify-center items-center gap-1">
        <CardTitle className="text-center text-lg font-semibold">
          График
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="px-1.5 text-lg font-semibold" variant="outline">
              {selectedLabel}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>График</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {options.map((option) => (
              <DropdownMenuItem
                onClick={() => setValue(option.value)}
                key={option.label}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <div style={{ height: 400, width: "100%" }}>
        <BarChartMultiSeries
          xAxisData={value.categories}
          showLegend={false}
          series={value.series.map((item) => ({
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
                  (item) => `${item.marker}${item.seriesName}: ${item.value}`,
                )
                .join("<br/>");
            }
            return `${params.value}`;
          }}
        />
      </div>
      {/*<div className="flex flex-col px-4">
            {graph.text.map((text) => (
              <p>{text}</p>
            ))}
          </div>*/}
    </Card>
  );
};
