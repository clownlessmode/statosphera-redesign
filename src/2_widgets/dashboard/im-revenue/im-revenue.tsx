import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import ImRevenueSkeleton from "./im-revenue-skeleton";
import { ArrowBigDownDash } from "lucide-react";
import { cn } from "@shared/lib/utils";

interface Props {
  proceedsIm: number | undefined;
  proceedsImYoY: number | undefined;
  proceedsImYoYPercent: number | undefined;
  isLoading: boolean;
  negative?: boolean;
  tv?: boolean;
}

const ImRevenue = ({
  proceedsIm,
  proceedsImYoY,
  proceedsImYoYPercent,
  isLoading,
  negative,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ? (
        <ImRevenueSkeleton />
      ) : (
        <Card
          className="w-full h-full gap-1 flex flex-col justify-between py-2"
          data-testid="im-revenue-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Выручка интернет магазина</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p className=" text-xl font-bold">
                {proceedsIm
                  ? `${proceedsIm.toLocaleString().replace(/,/g, " ")}₽`
                  : null}
              </p>
              {proceedsImYoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive",
                    proceedsImYoYPercent && proceedsImYoYPercent > 0
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
              {proceedsImYoY
                ? `${proceedsImYoY.toLocaleString().replace(/,/g, " ")}₽`
                : null}{" "}
              {proceedsImYoYPercent ? `(${proceedsImYoYPercent}%)` : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default ImRevenue;
