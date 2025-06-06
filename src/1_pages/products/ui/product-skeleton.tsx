import { Card, CardContent } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-row gap-6 items-center">
          <Skeleton className="shrink-0 size-[130px] md:size-[150px] aspect-square rounded-lg" />

          <div className="flex flex-col gap-2 justify-between py-4 flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <Skeleton className="h-6 w-24 rounded-full" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-4 rounded" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <Skeleton className="h-6 w-full rounded" />
                <Skeleton className="h-6 w-3/4 rounded" />
              </div>
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>

            <Skeleton className="h-4 w-1/3 rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
