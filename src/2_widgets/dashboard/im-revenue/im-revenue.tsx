import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import ImRevenueSkeleton from "./im-revenue-skeleton";

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
      {isLoading || !proceedsIm || !proceedsImYoY || !proceedsImYoYPercent ? (
        <ImRevenueSkeleton />
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
