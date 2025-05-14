import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CurrentRevenueSkeleton from "./current-revenue-skeleton";

interface Props {
  proceeds: number | undefined;
  proceedsYoY: number | undefined;
  proceedsYoYPercent: number | undefined;
  isLoading: boolean;
}

const CurrentRevenue = ({
  proceeds,
  proceedsYoY,
  proceedsYoYPercent,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading && !proceeds && !proceedsYoY && !proceedsYoYPercent ? (
        <CurrentRevenueSkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-primary py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка (сегодня)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {proceeds?.toLocaleString()}₽ ({proceedsYoYPercent}%)
              </p>
              {/* <ArrowBigDownDash
                className="w-4 h-4 text-destructive"
                fill="currentColor"
              /> */}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Выручка на прошлой неделе</p>
            <p className="w-full text-primary-foreground font-bold">
              {proceedsYoY?.toLocaleString()}₽ ({proceedsYoYPercent}%)
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CurrentRevenue;
