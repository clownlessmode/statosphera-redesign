import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useNpsController } from "@widgets/dashboard/nps/api";
import Spinner from "@shared/ui/spinner";
import { Building2, Star } from "lucide-react";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { Badge } from "@shared/ui/badge";

interface CitiesProps {
  tv?: boolean;
  best?: boolean;
  worst?: boolean;
}

export const Cities = ({ tv, best, worst }: CitiesProps) => {
  const { allNps, isAllNpsLoading } = useNpsController();

  if (isAllNpsLoading || !allNps) {
    return (
      <Card className="animate-pulse h-full flex justify-center items-center ">
        <Spinner />
      </Card>
    );
  }

  let city = allNps.city;
  if (best) city = allNps.city.slice(0, 5);
  if (worst) city = allNps.city.slice(-5).reverse();

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 w-full h-full scrollbar-hide pb-6",
        !tv && "xs:grid-cols-2 overflow-y-auto max-h-[450px]",
      )}
    >
      {tv && best && (
        <div className="col-span-full">
          <h3 className="font-semibold text-center">Лучшие города по NPS</h3>
        </div>
      )}
      {tv && worst && (
        <div className="col-span-full">
          <h3 className="font-semibold text-center">Хучшие города по NPS</h3>
        </div>
      )}
      {city.map((item) => {
        return (
          <Card
            key={item.id_city}
            className={cn(
              "w-max-content gap-2",
              tv && "bg-background border-0 pt-2 pb-2",
            )}
          >
            <CardHeader className="justify-between w-full flex max-md:flex-wrap items-center">
              <CardTitle className="flex flex-row gap-2 items-center">
                <div
                  className={cn(
                    "rounded-md p-1.5 flex items-center justify-center",
                    getNPSColor(item.nps_card).bg,
                    getNPSColor(item.nps_card).text,
                  )}
                >
                  <Building2 className="w-4 h-4" />
                </div>
                {tv ? (
                  <span className="text-sm font-medium">{item.city}</span>
                ) : (
                  item.city
                )}
              </CardTitle>
              <CardTitle
                className={cn(
                  "text-sm flex flex-row gap-1 items-center",
                  getNPSColor(item.nps_card).text,
                )}
              >
                <Star fill="currentColor" className="w-4 h-4" />
                {item.nps_card}
              </CardTitle>
            </CardHeader>
            {!tv && (
              <CardContent>
                <Badge
                  className={cn(
                    "w-full",
                    getNPSColor(item.nps_card).bg,
                    getNPSColor(item.nps_card).text,
                  )}
                >
                  {getNPSColor(item.nps_card).label}
                </Badge>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};
