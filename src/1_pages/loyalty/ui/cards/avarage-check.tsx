import { useLoyal } from "../../api";
import { Card, CardTitle, CardContent } from "@shared/ui/card";
import { Separator } from "@shared/ui/separator";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";
import { useEffect, useState } from "react";
import { AvarageCheckResponse } from "../../config";
import { Skeleton } from "@shared/ui/skeleton";
export const AvarageCheck = () => {
  const { getAvarageCheck, isAvarageCheckLoading } = useLoyal();
  const [avarageCheck, setAvarageCheck] = useState<AvarageCheckResponse>();
  useEffect(() => {
    getAvarageCheck({
      store: {
        idStore: [],
        idCity: [],
        idRegion: [],
        idManager: [],
        storeCondition: [],
        ageGroup: [],
        idLegalEntity: [],
        channel: [],
        district: [],
      },
      filterDate: {
        dateStart: "2025-05-01",
        dateEnd: "2025-05-30",
      },
    }).then((data) => {
      setAvarageCheck(data[0]);
    });
  }, []);

  if (isAvarageCheckLoading) return <AvarageCheckSkeleton />;

  return (
    <Card className=" w-[200px] !h-full flex flex-col justify-between grow min-h-[232px]">
      <CardContent className="gap-2 flex flex-col h-full w-full">
        <CardTitle>Средний чек</CardTitle>
        <div className="flex flex-row gap-2 justify-between w-full">
          <p className="text-sm ">По сети</p>
          <p className="text-sm font-semibold text-right">
            {avarageCheck?.avgCheck} ₽
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-between w-full">
          <p className="text-sm ">Без карты</p>
          <p className="text-sm font-semibold text-right">
            {avarageCheck?.avgCheckNoLoyal} ₽
          </p>
        </div>
        <div className="flex flex-row gap-2 justify-between w-full">
          <p className="text-sm ">С картой</p>
          <p className="text-sm font-semibold text-right">
            {avarageCheck?.avgCheckLoyal} ₽
          </p>
        </div>
      </CardContent>
      <div className="px-4">
        <Separator />
      </div>
      <CardContent className="h-full w-full">
        <div className="flex flex-row gap-2 justify-between w-full">
          <p className="text-sm ">Разница</p>
          <p className="text-sm font-semibold text-right items-center flex flex-row gap-0.5">
            {avarageCheck?.avgCheckDifferencePercent}%{" "}
            {avarageCheck?.avgCheckDifferencePercent &&
            avarageCheck.avgCheckDifferencePercent > 0 ? (
              <ArrowBigUpDash className="size-4 text-positive" />
            ) : (
              <ArrowBigDownDash className="size-4 text-negative" />
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const AvarageCheckSkeleton = () => {
  return (
    <Card className=" w-[200px] !h-full flex flex-col justify-between grow min-h-[232px]">
      <CardContent className="gap-2 flex flex-col h-full w-full">
        <Skeleton className="w-full h-6 bg-muted-foreground/50" />
        <Skeleton className="w-full h-4 bg-muted-foreground/50" />
        <Skeleton className="w-full h-4 bg-muted-foreground/50" />
        <Skeleton className="w-full h-4 bg-muted-foreground/50" />
      </CardContent>
      <div className="px-4">
        <Separator />
      </div>
      <CardContent className="gap-2 flex flex-col h-full w-full">
        <Skeleton className="w-full h-4 bg-muted-foreground/50" />
        <Skeleton className="w-full h-4 bg-muted-foreground/50" />
      </CardContent>
    </Card>
  );
};
