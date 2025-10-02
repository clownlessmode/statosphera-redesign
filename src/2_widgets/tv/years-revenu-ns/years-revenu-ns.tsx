import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "@shared/lib/utils";
import YearsRevenuNSSkeleton from "./years-revenu-ns-skeleton";

interface Props {
  dataCurrent: { label: string; proceedCurrent: number } | undefined;
  dataPast: { label: string; proceedCurrent: number } | undefined;
  dynamic: { isSalesGrowing: boolean; numbers: number } | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const YearsRevenuNS = ({
  dataCurrent,
  dataPast,
  dynamic,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <YearsRevenuNSSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col py-2 justify-between",
            tv && "py-2",
          )}
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                Средний чек ночных магазинов (за текущий месяц)
              </CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className={cn("text-xl font-bold", tv && "text-lg")}>
                {dataCurrent?.proceedCurrent
                  ? `${dataCurrent?.proceedCurrent.toLocaleString().replace(/,/g, " ")}`
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
            <p className="w-full text-muted-foreground font-bold">
              {dataPast?.proceedCurrent
                ? `${dataPast?.proceedCurrent.toLocaleString().replace(/,/g, " ")}`
                : null}{" "}
              {dynamic?.numbers ? `(${dynamic?.numbers}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default YearsRevenuNS;
