import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { StackedBarChart } from "@shared/ui/graphs/stacked-bars/stacked-bars";
import { SalesStructure as SalesStructureType } from "@pages/dashboard/api/types";
interface PlanPercentProps {
  isLoading: boolean;
  data: SalesStructureType | undefined;
}
const PlanPercent = ({ isLoading, data }: PlanPercentProps) => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Процент выполнения плана</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {(isLoading && !data) || !data?.data.xAxis || !data?.data.series ? (
          <StackedBarChart.Skeleton />
        ) : (
          <StackedBarChart
            xAxis={data?.data.xAxis}
            series={data?.data.series}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PlanPercent;
