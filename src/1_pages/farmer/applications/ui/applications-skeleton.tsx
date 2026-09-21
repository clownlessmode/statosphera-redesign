import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const ApplicationsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="gap-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="size-4" />
            </div>
            <Skeleton className="h-8 w-12" />
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Skeleton className="h-9 w-full sm:flex-1" />
        <Skeleton className="h-9 w-full sm:w-56" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="flex flex-col justify-between p-5">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-24" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="block h-1.5 w-full rounded-full" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
