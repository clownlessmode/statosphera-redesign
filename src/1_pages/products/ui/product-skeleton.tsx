import { Card, CardContent } from "@shared/ui/card";

export const ProductCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent>
        <div className="flex flex-row gap-6 items-center">
          <div className="shrink-0 size-[130px] md:size-[150px] aspect-square bg-muted animate-pulse rounded-lg" />

          <div className="flex flex-col gap-2 justify-between py-4 flex-1 min-w-0">
            <div className="flex items-center gap-4">
              <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />
              <div className="flex gap-2">
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                <div className="h-4 w-4 bg-muted animate-pulse rounded" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="space-y-2">
                <div className="h-6 bg-muted animate-pulse rounded w-full" />
                <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
              </div>
              <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
            </div>

            <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
