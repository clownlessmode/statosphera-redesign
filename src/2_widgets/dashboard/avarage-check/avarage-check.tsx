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
}

const AverageCheck = ({
  avgCheck,
  avgCheckYoY,
  avgCheckYoYPercent,
  isLoading,
  negative,
}: Props) => {
  return (
    <>
      {isLoading || !avgCheck || !avgCheckYoY || !avgCheckYoYPercent ? (
        <AverageCheckSkeleton />
      ) : (
        <Card className="w-full h-full gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Средний чек (за текущий месяц)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {avgCheck?.toLocaleString()}₽ ({avgCheckYoYPercent}%)
              </p>
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
            </CardContent>
          </div>
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {avgCheckYoY?.toLocaleString()}₽ ({avgCheckYoYPercent}%)
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default AverageCheck;
