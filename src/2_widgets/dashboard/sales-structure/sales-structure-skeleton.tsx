import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import StackedBarChartSkeleton from "@shared/ui/graphs/stacked-bars/stacked-bars-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const SalesStructureSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <StackedBarChartSkeleton />
      </CardContent>
    </Card>
  );
};

export default SalesStructureSkeleton;
