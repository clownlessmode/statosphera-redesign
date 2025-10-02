import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import MonthRevenueNSSkeleton from "./month-revenue-ns-skeleton";
import { cn } from "@shared/lib/utils";
import { ArrowBigDownDash } from "lucide-react";

interface Props {
  dataCurrent: { label: string; proceedCurrent: number } | undefined;
  dataPast: { label: string; proceedCurrent: number } | undefined;
  dynamic: { isSalesGrowing: boolean; numbers: number } | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const MonthRevenueNS = ({
  dataCurrent,
  dataPast,
  dynamic,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <MonthRevenueNSSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col justify-between bg-primary py-2 text-primary-foreground",
            tv && "py-2",
          )}
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка ночных магазинов (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className={cn("text-xl font-bold", tv && "text-lg")}>
                {dataCurrent?.proceedCurrent
                  ? `${dataCurrent?.proceedCurrent.toLocaleString().replace(/,/g, " ")}₽`
                  : null}{" "}
                {dynamic?.numbers ? `(${dynamic?.numbers}%)` : null}
              </p>
              {dynamic?.numbers && dynamic.isSalesGrowing !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    !dynamic.isSalesGrowing
                      ? "text-destructive"
                      : "text-positive",
                    dynamic?.numbers && dynamic?.numbers > 0
                      ? "rotate-180"
                      : "",
                  )}
                  fill="currentColor"
                />
              )}
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
              {dataPast
                ? `${dataPast?.proceedCurrent.toLocaleString().replace(/,/g, " ")}₽`
                : null}{" "}
              {dynamic?.numbers ? `(${dynamic?.numbers}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default MonthRevenueNS;
