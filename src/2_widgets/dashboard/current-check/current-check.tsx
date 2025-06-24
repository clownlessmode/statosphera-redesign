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
}

const CurrentCheck = ({
  check,
  checkYoY,
  checkYoYPercent,
  negative,
  isLoading,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <CurrentCheckSkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Чеки (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {check ? `${check.toLocaleString()}` : null}{" "}
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
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {checkYoY ? `${checkYoY.toLocaleString()}` : null}{" "}
              {checkYoYPercent ? `(${checkYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default CurrentCheck;
