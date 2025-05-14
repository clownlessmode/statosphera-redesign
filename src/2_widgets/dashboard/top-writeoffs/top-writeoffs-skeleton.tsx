import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import DoubleHorizontalBarChartSkeleton from "@shared/ui/graphs/double-horizontal-chart/double-horizontal-chart-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const TopWriteOffSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <DoubleHorizontalBarChartSkeleton />
      </CardContent>
    </Card>
  );
};

export default TopWriteOffSkeleton;
