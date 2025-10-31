import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { RadarChart } from "@shared/ui/graphs/radar-chart/radar-chart";
import PlanPercentSkeleton from "./plan-precent-skeleton";
import { cn } from "@shared/lib/utils";

interface PlanPercentProps {
  isLoading: boolean;
  planAvgCheckForecastPercent: number | undefined;
  planCheckForecastPercent: number | undefined;
  planProceedsForecastPercent: number | undefined;
  planProceedsQcForecastPercent: number | null;
  planShareOfPaymentsQcForecastPercent: number | null;
  tv?: boolean;
}
const PlanPercent = ({
  isLoading,
  planAvgCheckForecastPercent,
  planCheckForecastPercent,
  planProceedsForecastPercent,
  planProceedsQcForecastPercent,
  planShareOfPaymentsQcForecastPercent,
  tv,
}: PlanPercentProps) => {
  return (
    <>
      {!isLoading &&
      (planAvgCheckForecastPercent ||
        planCheckForecastPercent ||
        planProceedsForecastPercent ||
        planProceedsQcForecastPercent ||
        planShareOfPaymentsQcForecastPercent) ? (
        <Card
          className={cn("w-full h-full flex flex-col", !tv && "h-[400px]")}
          data-testid="plan-percent-widget"
        >
          <CardHeader>
            <CardTitle className="text-center max-md:text-sm">
              Процент выполнения плана
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <RadarChart
              data={[
                { name: "Выручка", value: planProceedsForecastPercent || 0 },
                { name: "Чеки", value: planCheckForecastPercent || 0 },
                { name: "Ср. чек", value: planAvgCheckForecastPercent || 0 },
              ]}
            />
          </CardContent>
        </Card>
      ) : (
        <PlanPercentSkeleton />
      )}
    </>
  );
};

export default PlanPercent;
