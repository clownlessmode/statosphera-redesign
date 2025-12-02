import { cn } from "@shared/lib/utils";
import { Card } from "@shared/ui/card";
import Spinner from "@shared/ui/spinner";

export const SummarySkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card
      className={cn(
        "animate-pulse h-[450px] flex justify-center items-center",
        tv && "border-0 shadow-none h-full",
      )}
    >
      <Spinner />
    </Card>
  );
};
