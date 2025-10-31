import { cn } from "@shared/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import { ArrowBigDownDash } from "lucide-react";
interface Props {
  householdGoods: number | undefined;
  householdGoodsPercent: number | undefined;
  householdGoodsYoY: number | undefined;
  householdGoodsYoYPercent: number | undefined;
  isLoading: boolean;
  negative?: boolean;
  tv?: boolean;
}

const WriteOffHouseholds = ({
  householdGoods,
  householdGoodsPercent,
  householdGoodsYoY,
  householdGoodsYoYPercent,
  negative,
  isLoading,
  tv,
}: Props) => {
  return (
    <>
      {isLoading ||
      !householdGoods ||
      !householdGoodsPercent ||
      !householdGoodsYoY ||
      !householdGoodsYoYPercent ? (
        <WriteOffHouseholds.Skeleton />
      ) : (
        <Card
          className={cn(
            "w-full h-[128px] gap-1 flex flex-col justify-between",
            tv && "h-full py-2",
          )}
          data-testid="writeoffs-households-widget"
        >
          <div className="flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="max-md:text-sm">Списания (ХОЗ-ы)</CardTitle>
            </CardHeader>
            <CardContent className="leading-none text-sm flex items-center gap-1">
              <p
                className={cn(
                  "text-xl font-bold max-md:text-lg",
                  tv && "text-lg",
                )}
              >
                {householdGoods
                  ? `${householdGoods.toLocaleString().replace(/,/g, " ")}₽`
                  : null}{" "}
                {householdGoodsPercent ? `(${householdGoodsPercent}%)` : null}
              </p>
              {householdGoodsYoYPercent && negative !== undefined && (
                <ArrowBigDownDash
                  className={cn(
                    "w-4 h-4",
                    negative ? "text-destructive" : "text-positive",
                    householdGoodsYoYPercent && householdGoodsYoYPercent > 0
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
            <p className="w-full max-md:text-sm">Изменения к прошлому году</p>
            <p className="w-full text-muted-foreground font-bold">
              {householdGoodsYoY
                ? `${householdGoodsYoY.toLocaleString().replace(/,/g, " ")}₽`
                : null}{" "}
              {householdGoodsYoYPercent
                ? `(${householdGoodsYoYPercent}%)`
                : null}
            </p>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default WriteOffHouseholds;

WriteOffHouseholds.Skeleton = () => {
  return (
    <Card className="w-full h-[128px] gap-1 flex flex-col justify-between">
      <div className="flex flex-col gap-1">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>
            <Skeleton className="w-[120px] h-[16px] bg-muted-foreground rounded-md" />
          </CardTitle>
        </CardHeader>
        <CardContent className="leading-none text-sm flex items-center gap-1">
          <p className=" text-xl font-bold">
            <Skeleton className="w-[100px] h-[20px] bg-muted-foreground rounded-md" />
          </p>
        </CardContent>
      </div>
      <CardFooter className=" items-end flex flex-col text-left w-full gap-1">
        <p className="w-full">
          <Skeleton className="w-[70%] h-[16px] bg-muted-foreground rounded-md" />
        </p>
        <p className="w-full text-muted-foreground font-bold">
          <Skeleton className="w-[130px] h-[16px] bg-muted-foreground rounded-md" />
        </p>
      </CardFooter>
    </Card>
  );
};
