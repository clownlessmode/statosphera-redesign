import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

const MarkupSkeleton = ({ tv }: { tv?: boolean }) => {
  return (
    <Card
      className={cn(
        "w-full gap-1 flex flex-col justify-between",
        tv ? "min-h-[110px]" : "h-[128px]",
      )}
    >
      <div className="flex flex-col  gap-1">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <Skeleton className="w-[56px] h-[16px] bg-muted-foreground rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm">
          <Skeleton className="w-[150px] h-[14px] bg-muted-foreground rounded-md" />
        </CardContent>
      </div>
      <CardFooter className="text-3xl font-bold items-start flex flex-row text-left w-fit">
        <Skeleton className="w-[100px] h-[36px] bg-muted-foreground rounded-md" />
      </CardFooter>
    </Card>
  );
};
export default MarkupSkeleton;
