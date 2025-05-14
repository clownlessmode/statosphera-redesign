import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import LoyaltySkeleton from "./loyalty-skeleton";
import { Skeleton } from "@shared/ui/skeleton";

interface Props {
  proceeds: number | undefined;
  proceedsYoY: number | undefined;
  proceedsYoYPercent: number | undefined;
  isLoading: boolean;
}

const Loyalty = ({
  proceeds,
  proceedsYoY,
  proceedsYoYPercent,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading && !proceeds && !proceedsYoY && !proceedsYoYPercent ? (
        <LoyaltySkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-muted py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Применение карт лояльности</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                <Skeleton className="w-[100px] h-[24px] bg-muted-foreground rounded-md" />
                {/* {proceeds?.toLocaleString()}₽ ({proceedsYoYPercent}%) */}
              </p>
              {/* <ArrowBigDownDash
                className="w-4 h-4 text-destructive"
                fill="currentColor"
              /> */}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Доля в процентах</p>
            <p className="w-full text-muted-foreground font-bold">
              <Skeleton className="w-[100px] h-[24px] bg-muted-foreground rounded-md" />
              {/* {proceedsYoY?.toLocaleString()}₽ ({proceedsYoYPercent}%) */}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default Loyalty;
