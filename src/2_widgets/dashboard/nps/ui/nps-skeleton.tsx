import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

export const NpsSkeleton = () => {
  return (
    <div className="grid grid-row-2 h-full gap-2">
      <Card className="w-full h-full items-center justify-center border-0 shadow-none py-0 gap-2">
        <div className="relative inline-block">
          <h1 className="text-8xl  font-extrabold text-primary leading-none relative z-10">
            <Skeleton className="w-40 h-15 flex" />
          </h1>
        </div>
        <h2 className="text-xl font-bold mb-4">Общий NPS</h2>
      </Card>
      <Card className="w-full h-full items-center justify-center border-0 shadow-none py-0 gap-2">
        <div className="relative inline-block">
          <h1 className="text-8xl  font-extrabold text-primary leading-none relative z-10">
            <Skeleton className="w-40 h-15 flex" />
          </h1>
        </div>
        <h2 className="text-xl font-bold mb-4">Общий eNPS</h2>
      </Card>
    </div>
  );
};
