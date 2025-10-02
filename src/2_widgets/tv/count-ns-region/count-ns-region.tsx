import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { DonutChart } from "@shared/ui/graphs/donut-chart/donut-chart";
import CountNSRegionSkeleton from "./count-ns-region-skeleton";
import { cn } from "@shared/lib/utils";
import { CountStoreRegion } from "@pages/tv/api/types";

interface CountNSRegionProps {
  isLoading: boolean;
  data: CountStoreRegion | undefined;
  tv?: boolean;
}
const CountNSRegion = ({ isLoading, data, tv }: CountNSRegionProps) => {
  return (
    <>
      {!isLoading && data && data[0] ? (
        <Card
          className={cn(
            "w-full h-[400px] flex flex-col",
            tv && "border-0 pt-0 h-full",
          )}
        >
          <CardHeader>
            <CardTitle className="text-center">
              Количество ночных магазинов (по регионам)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <DonutChart
              rose={true}
              isLoading={isLoading}
              data={data[0].circle || []}
            />
          </CardContent>
        </Card>
      ) : (
        <CountNSRegionSkeleton />
      )}
    </>
  );
};

export default CountNSRegion;
