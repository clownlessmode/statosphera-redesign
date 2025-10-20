import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useNpsController } from "@widgets/dashboard/nps/api";
import Spinner from "@shared/ui/spinner";
import { MapPin, Star } from "lucide-react";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { Badge } from "@shared/ui/badge";

export const Regions = ({ tv }: { tv?: boolean }) => {
  const { allNps, isAllNpsLoading } = useNpsController();

  if (isAllNpsLoading || !allNps) {
    return (
      <Card className="animate-pulse h-full flex justify-center items-center ">
        <Spinner />
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 w-full h-full scrollbar-hide pb-6",
        !tv && "md:grid-cols-2 h-[450px] overflow-y-auto",
      )}
      style={{
        gridAutoRows: "max-content",
      }}
    >
      {tv && (
        <div className="col-span-full">
          <h3 className="font-semibold text-center">NPS по регионам</h3>
        </div>
      )}
      {allNps.region.map((item) => {
        return (
          <Card
            key={item.id_region}
            className={cn(
              "w-max-content gap-2 h-fit",
              tv && "bg-background border-0 pt-1 pb-1",
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
                  <MapPin className="w-4 h-4" />
                </div>
                {tv ? (
                  <span className="text-sm font-medium">{item.region}</span>
                ) : (
                  item.region
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
