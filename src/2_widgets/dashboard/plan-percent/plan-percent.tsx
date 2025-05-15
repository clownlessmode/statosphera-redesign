import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { RadarChart } from "@shared/ui/graphs/radar-chart/radar-chart";
import PlanPercentSkeleton from "./plan-precent-skeleton";

interface PlanPercentProps {
  isLoading: boolean;
  planAvgCheckForecastPercent: number | undefined;
  planCheckForecastPercent: number | undefined;
  planProceedsForecastPercent: number | undefined;
  planProceedsQcForecastPercent: number | null;
  planShareOfPaymentsQcForecastPercent: number | null;
}
const PlanPercent = ({
  isLoading,
  planAvgCheckForecastPercent,
  planCheckForecastPercent,
  planProceedsForecastPercent,
  planProceedsQcForecastPercent,
  planShareOfPaymentsQcForecastPercent,
}: PlanPercentProps) => {
  console.log(
    !isLoading,
    planAvgCheckForecastPercent,
    planCheckForecastPercent,
    planProceedsForecastPercent,
    planProceedsQcForecastPercent,
    planShareOfPaymentsQcForecastPercent
  );

  return (
    <>
      {!isLoading &&
      (planAvgCheckForecastPercent ||
        planCheckForecastPercent ||
        planProceedsForecastPercent ||
        planProceedsQcForecastPercent ||
        planShareOfPaymentsQcForecastPercent) ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Процент выполнения плана</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <RadarChart
              data={[
                { name: "Выручка", value: planProceedsForecastPercent || 0 },
                { name: "Чеки", value: planCheckForecastPercent || 0 },
                { name: "Ср. чек", value: planAvgCheckForecastPercent || 0 },
                {
                  name: "Применение QC",
                  value: planProceedsQcForecastPercent || 0,
                },
                {
                  name: "Выручка QC",
                  value: planShareOfPaymentsQcForecastPercent || 0,
                },
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
