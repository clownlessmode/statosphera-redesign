import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CurrentCheckSkeleton from "./current-check-skeleton";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface Props {
  check: number | undefined;
  checkYoY: number | undefined;
  checkYoYPercent: number | undefined;
  isLoading: boolean;
  negative?: boolean;
  tv?: boolean;
}

const CurrentCheck = ({
  check,
  checkYoY,
  checkYoYPercent,
  negative,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <CurrentCheckSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-full gap-1 flex flex-col py-2 justify-between",
            tv && "py-2",
          )}
          data-testid="month-checks-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="max-md:text-sm">
                Чеки (за текущий месяц)
              </CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p
                className={cn(
                  "text-xl font-bold max-md:text-lg",
                  tv && "text-lg",
                )}
              >
                {check ? `${check.toLocaleString().replace(/,/g, " ")}` : null}{" "}
                {checkYoYPercent ? `(${checkYoYPercent}%)` : null}
              </p>
              {checkYoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive",
                    checkYoYPercent && checkYoYPercent > 0 ? "rotate-180" : "",
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
            <p className="w-full max-md:text-sm">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {checkYoY
                ? `${checkYoY.toLocaleString().replace(/,/g, " ")}`
                : null}{" "}
              {checkYoYPercent ? `(${checkYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CurrentCheck;
