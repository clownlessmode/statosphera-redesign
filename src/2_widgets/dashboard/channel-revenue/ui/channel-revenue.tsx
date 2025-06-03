import { SalesChannel } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { DonutChart } from "@shared/ui/graphs/donut-chart/donut-chart";
import ChannelRevenueSkeleton from "./channel-revenue-skeleton";

interface ChannelRevenueProps {
  isLoading: boolean;
  data: SalesChannel | undefined;
}
const ChannelRevenue = ({ isLoading, data }: ChannelRevenueProps) => {
  return (
    <>
      {!isLoading && data && data.data ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Распределение по каналам продаж</CardTitle>
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
