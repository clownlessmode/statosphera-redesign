import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";

import HoursRevenueSkeleton from "./hours-revenue-skeleton";

interface HoursRevenueProps {
  isLoading: boolean;
  data: any | undefined;
}

const HoursRevenue = ({ isLoading, data }: HoursRevenueProps) => {
  const prepareLine = usePreparedStackedLine();
  return (
    <>
      {!isLoading && data ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Продажи по часам</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <StackedLine
              className="border-none"
              option={{
                grid: {
                  top: 5,
                  left: 10,
                  right: 10,
                  bottom: 0,
                  containLabel: true,
                },
                legend: {
                  data: ["Выбранный период", "Прошлый год"],
                },
                toolbox: {
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
                      const rawValue = Array.isArray(p.value)
                        ? p.value[1]
                        : p.value;
                      const value =
                        typeof rawValue === "number"
                          ? rawValue
                          : Number(rawValue);

                      return `
      <div>
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${
          p.color
        };margin-right:6px;"></span>
        <strong>${p.seriesName}:</strong> ${
                        isNaN(value) ? "-" : value.toLocaleString("ru-RU")
                      } ₽
      </div>
    `;
                    });

                    return `<div><strong>${label}</strong></div>${lines.join(
                      ""
                    )}`;
                  },
                },

                yAxis: {
                  type: "value",
                  axisLine: { show: false },
                  axisTick: { show: false },
                  axisLabel: { show: false },
                  splitLine: { show: false },
                },
                series: data && prepareLine(data),
              }}
            />
          </CardContent>
        </Card>
      ) : (
        <HoursRevenueSkeleton />
      )}
    </>
  );
};

export default HoursRevenue;
