import { SalesChannel } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";
import { DonutChart } from "@shared/ui/graphs/donut-chart/donut-chart";
interface ChannelRevenueProps {
  isLoading: boolean;
  data: SalesChannel | undefined;
}
const ChannelRevenue = ({ isLoading, data }: ChannelRevenueProps) => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Распределение по каналам продаж</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading && !data ? (
          <DonutChart.Skeleton />
        ) : (
          <DonutChart isLoading={isLoading} data={data?.data[0].circle || []} />
        )}
      </CardContent>
    </Card>
  );
};

export default ChannelRevenue;
