import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
interface Props {
  proceedsIm: number | undefined;
  proceedsImYoY: number | undefined;
  proceedsImYoYPercent: number | undefined;
  isLoading: boolean;
}

const ImRevenue = ({
  proceedsIm,
  proceedsImYoY,
  proceedsImYoYPercent,
  isLoading,
}: Props) => {
  console.log(proceedsIm);
  return (
    <>
      {isLoading && !proceedsIm && !proceedsImYoY && !proceedsImYoYPercent ? (
        <ImRevenue.Skeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-muted py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка интернет магазина</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {proceedsIm?.toLocaleString()}₽ ({proceedsImYoYPercent}%)
              </p>
              {/* <ArrowBigDownDash
                className="w-4 h-4 text-destructive"
                fill="currentColor"
              /> */}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {proceedsImYoY?.toLocaleString()}₽ ({proceedsImYoYPercent}%)
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ImRevenue;

ImRevenue.Skeleton = () => {
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
