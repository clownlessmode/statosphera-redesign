import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import RadarChartSkeleton from "@shared/ui/graphs/radar-chart/radar-chart-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const PlanPercentSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card className={cn("w-full h-[400px] flex flex-col", tv && "h-full")}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 justify-center w-full items-center mx-auto flex relative">
        <RadarChartSkeleton />
      </CardContent>
    </Card>
  );
};

export default PlanPercentSkeleton;
