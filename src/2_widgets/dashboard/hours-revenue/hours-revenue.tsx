import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { Skeleton } from "@shared/ui/skeleton";

interface HoursRevenueProps {
  isLoading: boolean;
  data: any | undefined;
}
const HoursRevenue = ({ isLoading, data }: HoursRevenueProps) => {
  const prepareLine = usePreparedStackedLine();
  console.log(data);
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Продажи по часам</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading && !data ? (
          <StackedLine.Skeleton />
        ) : (
          <StackedLine
            className="border-none"
            option={{
              grid: {
                top: 0,
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
        )}
      </CardContent>
    </Card>
  );
};

export default HoursRevenue;
