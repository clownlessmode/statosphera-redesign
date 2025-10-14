import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const RevenuePerMonthNightSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card className={cn("w-full h-full flex flex-col", tv && "border-0")}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <StackedLineSkeleton className={cn(tv && "border-0 shadow-none")} />
      </CardContent>
    </Card>
  );
};

export default RevenuePerMonthNightSkeleton;
