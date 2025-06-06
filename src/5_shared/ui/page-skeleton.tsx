import { Skeleton } from "./skeleton";
import { useSidebar } from "./sidebar";
import { cn } from "@shared/lib/utils";

const PageSkeleton = () => {
  const { isMobile } = useSidebar();
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row items-center gap-1 sm:gap-2">
          {isMobile && <Skeleton className="size-7 bg-background" />}
          <Skeleton className="w-[150px] h-[18px] bg-background" />
        </div>
        <div className="flex flex-row gap-1 sm:gap-2">
          <Skeleton
            className={cn(
              isMobile ? "w-[36px]" : "w-[155px]",
              "h-[36px] bg-background rounded-md",
            )}
          />
          <Skeleton
            className={cn(
              isMobile ? "w-[36px]" : "w-[170px]",
              "h-[36px] bg-background rounded-md",
            )}
          />
          <Skeleton
            className={cn(
              isMobile ? "w-[36px]" : "w-[160px]",
              "h-[36px] bg-background rounded-md",
            )}
          />
        </div>
      </div>
      <Skeleton className="rounded-3xl h-full bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3" />
    </div>
  );
};

export default PageSkeleton;
