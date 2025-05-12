import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { DoubleHorizontalBarChart } from "@shared/ui/graphs/double-horizontal-chart/double-hotizontal-chart";
import { TopWriteOff } from "@pages/dashboard/api/types";
interface TopWriteoffsProps {
  isLoading: boolean;
  data: TopWriteOff | undefined;
}

const TopWriteoffs = ({ isLoading, data }: TopWriteoffsProps) => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Топ по группам списаний</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading && !data ? (
          <DoubleHorizontalBarChart.Skeleton />
        ) : (
          <DoubleHorizontalBarChart
            data={
              data?.data.series.map(({ name, data }) => ({
                name,
                proceeds: Number(data[0]) || 0,
                writeOff: Number(data[1]) || 0,
              })) || []
            }
            isLoading={false}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TopWriteoffs;
