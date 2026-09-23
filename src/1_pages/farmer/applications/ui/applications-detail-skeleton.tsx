import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const ApplicationsDetailSkeleton = () => {
  return (
    <Card className="p-6 flex flex-col gap-4">
      <div className="flex gap-2">
        <Skeleton className="h-9 w-32 rounded-lg" />
        <Skeleton className="h-9 w-32 rounded-lg" />
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <Skeleton className="h-32 w-full rounded-xl" />
        <Skeleton className="h-32 w-full rounded-xl" />
      </div>
    </Card>
  );
};
