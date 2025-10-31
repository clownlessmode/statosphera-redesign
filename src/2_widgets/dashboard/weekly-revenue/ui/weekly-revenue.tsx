import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import { BarChart } from "@shared/ui/graphs/bar-chart/bar-chart";
import { SalesSevenDays } from "@pages/dashboard/api/types";
import { Skeleton } from "@shared/ui/skeleton";
import WeeklyRevenueSkeleton from "./weekly-revenue-skeleton";
import { cn } from "@shared/lib/utils";

interface WeeklyRevenueProps {
  data: SalesSevenDays | undefined;
  isLoading: boolean;
  tv?: boolean;
}

export default function WeeklyRevenue({
  data,
  isLoading,
  tv,
}: WeeklyRevenueProps) {
  return (
    <Card
      className={cn(
        "w-full h-[400px] flex flex-col",
        tv && "h-full border-0 pt-0",
      )}
      data-testid="weekly-revenue-widget"
    >
      <CardHeader>
        {isLoading || !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle className="text-center max-md:text-sm">
            Выручка за последние 7 дней
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ||
        !data ||
        !data.data ||
        !data.data[0].day ||
        !data.data[0].proceeds ||
        !data.data[0].day_of_week ? (
          <WeeklyRevenueSkeleton />
        ) : (
          <BarChart
            xAxisData={data.data.map((item) => item.day_of_week)}
            yAxisData={data.data.map((item) => item.proceeds)}
            tooltipData={data.data.map((item) => item.day.toString())}
          />
        )}
      </CardContent>
    </Card>
  );
}
