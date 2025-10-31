import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import LeaderImSalesSkeleton from "./leader-im-sales-skeleton";
import { cn } from "@shared/lib/utils";

interface Props {
  idStore: number | undefined;
  proceedsIm: number | undefined;
  storeName: string | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const LeaderImSales = ({
  //   idStore,
  proceedsIm,
  storeName,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <LeaderImSalesSkeleton />
      ) : (
        <Card
          className="w-full h-full gap-1 flex flex-col justify-between py-2"
          data-testid="leader-im-sales-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="max-md:text-sm">
                Лидер интернет продаж
              </CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold max-md:text-lg">
                {storeName ? storeName : null}
              </p>
            </CardContent>
          </div>
          <CardFooter
            className={cn(
              "items-end flex flex-col text-left w-full",
              tv && "text-sm",
            )}
          >
            <p className="w-full max-md:text-sm">Выручка (за текущий месяц)</p>
            <p className="w-full text-muted-foreground font-bold">
              {proceedsIm
                ? `${proceedsIm.toLocaleString().replace(/,/g, " ")}₽`
                : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default LeaderImSales;
