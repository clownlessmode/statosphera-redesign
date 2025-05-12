import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { RadarChart } from "@shared/ui/graphs/radar-chart/radar-chart";

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
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Процент выполнения плана</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading ? (
          <RadarChart.Skeleton />
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
};

export default PlanPercent;
