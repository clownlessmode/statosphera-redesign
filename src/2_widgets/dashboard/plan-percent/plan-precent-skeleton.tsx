import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import RadarChartSkeleton from "@shared/ui/graphs/radar-chart/radar-chart-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const PlanPercentSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <RadarChartSkeleton />
      </CardContent>
    </Card>
  );
};

export default PlanPercentSkeleton;
