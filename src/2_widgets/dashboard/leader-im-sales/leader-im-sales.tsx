import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import LeaderImSalesSkeleton from "./leader-im-sales-skeleton";

interface Props {
  idStore: number | undefined;
  proceedsIm: number | undefined;
  storeName: string | undefined;
  isLoading: boolean;
}

const LeaderImSales = ({
  //   idStore,
  proceedsIm,
  storeName,
  isLoading,
}: Props) => {
  console.log(proceedsIm);
  return (
    <>
      {isLoading || !proceedsIm || !storeName ? (
        <LeaderImSalesSkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between bg-muted py-2">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Лидер интернет продаж</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {storeName}
                {/* {proceedsIm?.toLocaleString()}₽ ({proceedsImYoYPercent}%) */}
              </p>
              {/* <ArrowBigDownDash
                className="w-4 h-4 text-destructive"
                fill="currentColor"
              /> */}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Выручка (за текущий месяц)</p>
            <p className="w-full text-muted-foreground font-bold">
              {proceedsIm?.toLocaleString()}₽
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default LeaderImSales;
