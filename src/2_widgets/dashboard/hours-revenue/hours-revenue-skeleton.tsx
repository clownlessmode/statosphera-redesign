import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const HoursRevenueSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card
      className={cn(
        "w-full h-[400px] flex flex-col",
        tv && "border-0 pt-0 h-full",
      )}
    >
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

export default HoursRevenueSkeleton;
