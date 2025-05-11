import { LeaderWriteOffs } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { BarHorizontalChart } from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
interface WriteoffsLeadersProps {
  isLoading: boolean;
  data: LeaderWriteOffs | undefined;
}
const WriteoffsLeaders = ({ isLoading, data }: WriteoffsLeadersProps) => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Лидеры по списаниям</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading && !data ? (
          <BarHorizontalChart.Skeleton />
        ) : (
          <BarHorizontalChart
            isLoading={isLoading}
            labels={data?.data.map((item) => item.storeName) || []}
            values={data?.data.map((item) => item.writeOffPercent) || []}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WriteoffsLeaders;
