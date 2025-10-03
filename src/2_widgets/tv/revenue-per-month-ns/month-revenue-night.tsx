import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import RevenuePerMonthNightSkeleton from "./revenue-per-month-night-skeleton";
import { cn } from "@shared/lib/utils";

interface RevenuePerMonthNight {
  isLoading: boolean;
  data: any | undefined;
  tv?: boolean;
}

const RevenuePerMonthNight = ({
  isLoading,
  data,
  tv,
}: RevenuePerMonthNight) => {
  const prepareLine = usePreparedStackedLine();

  const option = {
    grid: {
      top: 30,
      left: 10,
      right: 10,
      bottom: 0,
      containLabel: true,
    },
    legend: {
      data: ["Этот год", "Прошлый год"],
      top: -5,
    },
    toolbox: {
      show: false,
    },
    tooltip: {
      show: false,
    },
    series: data?.graph && prepareLine(data.graph),
  };

  return (
    <>
      {!isLoading && data ? (
        <Card
          className={cn(
            "w-full h-[400px] flex flex-col",
            tv && "border-0 pt-0 h-full",
          )}
        >
          <CardHeader>
            <CardTitle className="text-center">
              Выручка ночных магазинов (по месяцам)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <StackedLine
              className={cn("border-none", tv && "shadow-none")}
              option={option}
            />
          </CardContent>
        </Card>
      ) : (
        <RevenuePerMonthNightSkeleton />
      )}
    </>
  );
};

export default RevenuePerMonthNight;
