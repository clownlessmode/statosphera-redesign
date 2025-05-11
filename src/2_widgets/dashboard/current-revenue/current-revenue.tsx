import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
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
        <CurrentRevenue.Skeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-primary py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка (за текущий месяц)</CardTitle>
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
            <p className="w-full">Изменения к прошлому году</p>
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

CurrentRevenue.Skeleton = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
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
      <CardFooter className=" items-end flex flex-col text-left w-full gap-1">
        <p className="w-full">
          <Skeleton className="w-[70%] h-[16px] bg-muted-foreground rounded-md" />
        </p>
        <p className="w-full text-muted-foreground font-bold">
          <Skeleton className="w-[130px] h-[16px] bg-muted-foreground rounded-md" />
        </p>
      </CardFooter>
    </Card>
  );
};
