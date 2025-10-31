import { SalesChannel } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { DonutChart } from "@shared/ui/graphs/donut-chart/donut-chart";
import ChannelRevenueSkeleton from "./channel-revenue-skeleton";
import { cn } from "@shared/lib/utils";

interface ChannelRevenueProps {
  isLoading: boolean;
  data: SalesChannel | undefined;
  tv?: boolean;
}
const ChannelRevenue = ({ isLoading, data, tv }: ChannelRevenueProps) => {
  return (
    <>
      {!isLoading && data && data.data ? (
        <Card
          className={cn("w-full h-[400px] flex flex-col", tv && "h-full")}
          data-testid="channel-revenue-widget"
        >
          <CardHeader>
            <CardTitle className="text-center max-md:text-sm">
              Распределение по каналам продаж
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <DonutChart
              isLoading={isLoading}
              data={data?.data[0].circle || []}
            />
          </CardContent>
        </Card>
      ) : (
        <ChannelRevenueSkeleton />
      )}
    </>
  );
};

export default ChannelRevenue;
