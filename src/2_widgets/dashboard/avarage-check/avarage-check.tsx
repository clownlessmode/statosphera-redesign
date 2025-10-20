import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import AverageCheckSkeleton from "./avarage-check-skeleton";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface Props {
  avgCheck: number | undefined;
  avgCheckYoY: number | undefined;
  avgCheckYoYPercent: number | undefined;
  isLoading: boolean;
  negative?: boolean;
  tv?: boolean;
}

const AverageCheck = ({
  avgCheck,
  avgCheckYoY,
  avgCheckYoYPercent,
  isLoading,
  negative,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <AverageCheckSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col py-2 justify-between",
            tv && "py-2",
          )}
          data-testid="average-check-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Средний чек (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className={cn(" text-xl font-bold", tv && "text-lg")}>
                {avgCheck
                  ? `${avgCheck.toLocaleString().replace(/,/g, " ")}₽`
                  : null}{" "}
                {avgCheckYoYPercent ? `(${avgCheckYoYPercent}%)` : null}
              </p>
              {avgCheckYoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive",
                    avgCheckYoYPercent && avgCheckYoYPercent > 0
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
              {avgCheckYoY
                ? `${Math.round(avgCheckYoY).toLocaleString()}₽`
                : null}{" "}
              {avgCheckYoYPercent ? `(${avgCheckYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AverageCheck;
