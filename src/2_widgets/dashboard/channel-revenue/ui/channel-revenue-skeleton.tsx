import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import DonutChartSkeleton from "@shared/ui/graphs/donut-chart/donut-chart-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const ChannelRevenueSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card className={cn("w-full h-[400px] flex flex-col", tv && "h-full")}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <DonutChartSkeleton />
      </CardContent>
    </Card>
  );
};

export default ChannelRevenueSkeleton;
