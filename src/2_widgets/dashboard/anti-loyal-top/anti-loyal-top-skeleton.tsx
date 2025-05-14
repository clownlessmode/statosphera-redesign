import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import BarHorizontalChartSkeleton from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart-skeleton";

const AntiLoyalTopSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <BarHorizontalChartSkeleton sort="asc" />
      </CardContent>
    </Card>
  );
};

export default AntiLoyalTopSkeleton;
