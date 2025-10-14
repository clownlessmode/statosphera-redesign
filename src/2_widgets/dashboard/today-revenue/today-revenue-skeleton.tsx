import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
const TodayRevenueSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card
      className={cn(
        "w-full h-full gap-1 flex flex-col justify-between",
        tv && "min-h-[166px]",
      )}
    >
      <div className="flex flex-col gap-1">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <Skeleton className="w-[120px] h-[16px] bg-muted-foreground rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm flex items-center gap-1">
          <p className=" text-xl font-bold">
            <Skeleton className="w-[100px] h-[20px] bg-muted-foreground rounded-md" />
          </p>
        </CardContent>
      </div>
      <CardFooter className=" items-start flex flex-col text-left w-full gap-1">
        <Skeleton className="w-[70%] h-[16px] bg-muted-foreground rounded-md" />
        <Skeleton className="w-[130px] h-[16px] bg-muted-foreground rounded-md" />
        <Skeleton className="w-[50%] h-[16px] bg-muted-foreground rounded-md" />
        <Skeleton className="w-[130px] h-[16px] bg-muted-foreground rounded-md" />
      </CardFooter>
    </Card>
  );
};
export default TodayRevenueSkeleton;
