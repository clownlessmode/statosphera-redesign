import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

import { ArrowBigDownDash } from "lucide-react";
import TodayRevenueSkeleton from "./today-revenue-skeleton";
interface Props {
  negative: boolean | undefined;
  proceedsTotal: number | string | undefined;
  proceedsWoYPercent: number | string | undefined;
  weekAgoProceedsTotal: number | string | undefined;
  isLoading: boolean;
  tv?: boolean;
}

const TodayRevenue = ({
  negative,
  proceedsTotal,
  proceedsWoYPercent,
  weekAgoProceedsTotal,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ||
      !proceedsTotal ||
      !proceedsWoYPercent ||
      !weekAgoProceedsTotal ? (
        <TodayRevenueSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col justify-between",
            tv && "py-2",
          )}
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка (сегодня)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {proceedsTotal
                  ? `${proceedsTotal.toLocaleString().replace(/,\d+/g, "")}₽`
                  : null}{" "}
                {proceedsWoYPercent ? `(${proceedsWoYPercent}%)` : null}
              </p>
              {proceedsWoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive rotate-180",
                  )}
                  fill="currentColor"
                />
              )}
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Выручка на прошлой неделе</p>
            <p className="w-full text-muted-foreground font-bold">
              {weekAgoProceedsTotal
                ? `${weekAgoProceedsTotal.toLocaleString().replace(/,\d+/g, "")}₽`
                : null}{" "}
              {proceedsWoYPercent ? `(${proceedsWoYPercent}%)` : null}
            </p>

            <p className="w-full">Изменения к последнему закрытому часу</p>
            <p className="w-full text-muted-foreground font-bold">
              {weekAgoProceedsTotal
                ? `${weekAgoProceedsTotal.toLocaleString().replace(/,\d+/g, "")}₽`
                : null}{" "}
              {proceedsWoYPercent ? `(${proceedsWoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default TodayRevenue;
