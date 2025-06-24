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
}

const WriteOffIndicator = ({
  writeOff,
  writeOffPercent,
  writeOffYoY,
  writeOffYoYPercent,
  isLoading,
  negative,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <WriteOffIndicatorSkeleton />
      ) : (
        <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Списания (показатель)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {writeOff ? `${writeOff.toLocaleString()}₽` : null}{" "}
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
          <CardFooter className=" items-end flex flex-col text-left w-full">
            <p className="w-full">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {writeOffYoY ? `${writeOffYoY.toLocaleString()}₽` : null}{" "}
              {writeOffYoYPercent ? `(${writeOffYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WriteOffIndicator;
