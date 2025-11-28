import { Card, CardContent, CardHeader } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const WriteOffIndicatorSkeleton = () => {
  return (
    <Card className="w-full h-[200px]">
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-bold">
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
          <Skeleton className="w-[100px] h-[20px]" />
        </div>
      </CardHeader>
      <CardContent className="leading-none">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="w-[150px] h-[20px]" />
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="w-[200px] h-[20px]" />
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
          <div className="flex flex-row items-center justify-between">
            <Skeleton className="w-[180px] h-[20px]" />
            <Skeleton className="w-[100px] h-[20px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
