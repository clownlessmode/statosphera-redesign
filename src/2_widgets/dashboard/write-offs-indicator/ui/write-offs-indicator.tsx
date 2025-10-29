import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

import WriteOffIndicatorSkeleton from "./write-offs-indicator-skeleton";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "@shared/lib/utils";
interface Props {
  writeOff: number | undefined;
  writeOffPercent: number | undefined;
  writeOffYoY: number | undefined;
  writeOffYoYPercent: number | undefined;
  isLoading: boolean;
  negative: boolean | undefined;
  tv?: boolean;
}

const WriteOffIndicator = ({
  writeOff,
  writeOffPercent,
  writeOffYoY,
  writeOffYoYPercent,
  isLoading,
  negative,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <WriteOffIndicatorSkeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-[128px] gap-1 flex flex-col justify-between",
            tv && "h-full py-2",
          )}
          data-testid="writeoffs-indicator-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Списания (показатель)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className={cn("text-xl font-bold", tv && "text-lg")}>
                {writeOff
                  ? `${writeOff.toLocaleString().replace(/,/g, " ")}₽`
                  : null}{" "}
                {writeOffPercent ? `(${writeOffPercent}%)` : null}
              </p>
              {writeOffYoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive",
                    writeOffYoYPercent && writeOffYoYPercent > 0
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
              tv && " text-sm",
            )}
          >
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {writeOffYoY
                ? `${writeOffYoY.toLocaleString().replace(/,/g, " ")}₽`
                : null}{" "}
              {writeOffYoYPercent ? `(${writeOffYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WriteOffIndicator;
