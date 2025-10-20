import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import BarHorizontalChartSkeleton from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart-skeleton";
import { cn } from "@shared/lib/utils";

const AntiLoyalTopSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card className={cn("w-full h-[400px] flex flex-col", tv && "h-full")}>
      {!tv && (
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="flex-1">
        <BarHorizontalChartSkeleton count={tv ? 9 : undefined} sort="asc" />
      </CardContent>
    </Card>
  );
};

export default AntiLoyalTopSkeleton;
