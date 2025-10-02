import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CurrentRevenueSkeleton from "./current-revenue-skeleton";
import { cn } from "@shared/lib/utils";

interface Props {
  proceeds: number | undefined;
  proceedsYoY: number | undefined;
  proceedsYoYPercent: number | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const CurrentRevenue = ({
  proceeds,
  proceedsYoY,
  proceedsYoYPercent,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <CurrentRevenueSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col justify-between bg-primary py-2 text-primary-foreground",
            tv && "py-2",
          )}
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className={cn("text-xl font-bold", tv && "text-lg")}>
                {proceeds
                  ? `${proceeds.toLocaleString().replace(/,/g, " ")}₽`
                  : null}{" "}
                {proceedsYoYPercent ? `(${proceedsYoYPercent}%)` : null}
              </p>
            </CardContent>
          </div>
          <CardFooter
            className={cn(
              "items-end flex flex-col text-left w-full",
              tv && "text-sm",
            )}
          >
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full  font-bold">
              {proceedsYoY
                ? `${proceedsYoY.toLocaleString().replace(/,/g, " ")}₽`
                : null}{" "}
              {proceedsYoYPercent ? `(${proceedsYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CurrentRevenue;
