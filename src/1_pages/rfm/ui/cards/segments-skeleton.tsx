import { Card } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import { useMemo } from "react";

const SegmentsSkeleton = ({ count }: { count: number }) => {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, idx) => (
      <Card key={idx} className="w-full gap-1 flex flex-col h-38 px-8">
        <Skeleton className="w-[320px] h-[40px] bg-muted-foreground rounded-md" />
        <div className="grid grid-cols-4 pt-4 w-full gap-10">
          <Skeleton className="w-[120px] h-[40px] bg-muted-foreground rounded-md" />
          <Skeleton className="w-[120px] h-[40px] bg-muted-foreground rounded-md" />
          <Skeleton className="w-[120px] h-[40px] bg-muted-foreground rounded-md" />
          <Skeleton className="w-[120px] h-[40px] bg-muted-foreground rounded-md" />
        </div>
      </Card>
    ));
  }, [count]);

  return <>{items}</>;
};

export default SegmentsSkeleton;
