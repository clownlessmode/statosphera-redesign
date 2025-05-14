import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

const HoursRevenueSkeleton = () => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>
          <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <StackedLineSkeleton />
      </CardContent>
    </Card>
  );
};

export default HoursRevenueSkeleton;
