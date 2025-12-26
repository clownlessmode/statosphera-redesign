import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { cn } from "@shared/lib/utils";
import { LineGraphResponse } from "@pages/night-stores/config";

interface GraphProceedsProps {
  isLoading: boolean;
  graph: LineGraphResponse["graph"] | null;
}

const GraphProceeds = ({ isLoading, graph }: GraphProceedsProps) => {
  const prepareLine = usePreparedStackedLine();

  const option = {
    grid: {
      top: 20,
      left: 10,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    legend: {
      show: false,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1f1f1f",
      borderColor: "#333",
      borderRadius: 8,
      padding: 10,
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
      formatter: function (params: any): string {
        const items = Array.isArray(params) ? params : [params];
        const label = items[0]?.axisValueLabel || "";

        const lines = items.map((p: any) => {
          const rawValue = Array.isArray(p.value) ? p.value[1] : p.value;
          const value =
            typeof rawValue === "number" ? rawValue : Number(rawValue);

          return `
      <div>
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${
          p.color
        };margin-right:6px;"></span>
        <strong>Выручка:</strong> ${
          isNaN(value) ? "-" : value.toLocaleString("ru-RU")
        } ₽
      </div>
    `;
        });

        return `<div><strong>${label}</strong></div>${lines.join("")}`;
      },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { show: false },
      splitLine: { show: false },
    },
    series: graph && prepareLine(graph),
  };

  return (
    <>
      {!isLoading && graph ? (
        <Card className="w-full h-[400px] flex flex-col gap-0">
          <CardHeader>
            <CardTitle className="text-center max-md:text-sm">
              Ночная выручка по дням
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <StackedLine
              className={cn("border-none")}
              option={option}
              mirror={1}
            />
          </CardContent>
        </Card>
      ) : (
        <StackedLineSkeleton className="min-h-[400px]" />
      )}
    </>
  );
};

export default GraphProceeds;
