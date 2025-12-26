import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const ValueCardSkeleton = () => {
  return (
    <Card className="items-center justify-center text-center gap-2 px-4 w-full">
      <Skeleton className="w-2/3 h-6 bg-muted-foreground/50" />
      <Skeleton className="w-full h-9 bg-muted-foreground/50" />
    </Card>
  );
};
