import { cn } from "@shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { useNpsController } from "@widgets/dashboard/nps/api";
import Spinner from "@shared/ui/spinner";
import { Building2, Star } from "lucide-react";
import { getNPSColor } from "@widgets/dashboard/nps/model";
import { Badge } from "@shared/ui/badge";

export const Cities = () => {
  const { allNps, isAllNpsLoading } = useNpsController();

  if (isAllNpsLoading || !allNps) {
    return (
      <Card className="animate-pulse h-full flex justify-center items-center ">
        <Spinner />
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 w-full overflow-y-auto h-full max-h-[450px] scrollbar-hide pb-6">
      {allNps.city.map((item) => {
        return (
          <Card key={item.id_city} className={cn("w-max-content gap-2")}>
            <CardHeader className="justify-between w-full flex items-center">
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
                {item.city}
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
          </Card>
        );
      })}
    </div>
  );
};
