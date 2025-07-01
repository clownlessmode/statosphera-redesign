import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const NpsSkeleton = () => {
  return (
    <Card className="w-full items-center justify-center">
      <div className="relative inline-block">
        <h1 className="text-9xl  font-extrabold text-primary leading-none relative z-10">
          <Skeleton className="w-full h-full" />
        </h1>
      </div>
      <h2 className="text-2xl font-bold mb-4">Общий NPS</h2>
    </Card>
  );
};
