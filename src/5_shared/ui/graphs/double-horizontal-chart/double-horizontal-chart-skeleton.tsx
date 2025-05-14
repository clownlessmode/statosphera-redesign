import { Skeleton } from "@shared/ui/skeleton";

const DoubleHorizontalBarChartSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col gap-[10px] items-start justify-end animate-pulse pb-1">
      {Array.from({ length: 9 }).map((_, idx) => (
        <div key={idx} className="flex flex-col gap-1">
          <Skeleton
            className="h-[10px] rounded-md bg-muted-foreground"
            style={{ width: `${50 + Math.random() * 150}px` }}
          />
          <Skeleton
            className="h-[10px] rounded-md bg-muted-foreground"
            style={{ width: `${50 + Math.random() * 150}px` }}
          />
        </div>
      ))}
    </div>
  );
};
export default DoubleHorizontalBarChartSkeleton;
