import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";

import { DoubleHorizontalBarChart } from "@shared/ui/graphs/double-horizontal-chart/double-hotizontal-chart";
import { TopWriteOff } from "@pages/dashboard/api/types";

import TopWriteOffSkeleton from "./top-writeoffs-skeleton";
interface TopWriteoffsProps {
  isLoading: boolean;
  data: TopWriteOff | undefined;
}

const TopWriteoffs = ({ isLoading, data }: TopWriteoffsProps) => {
  return (
    <>
      {!isLoading && data && data.data ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Аутсайдеры по группам списаний</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <DoubleHorizontalBarChart
              data={data?.data || { yAxis: [], series: [] }}
              isLoading={false}
            />
          </CardContent>
        </Card>
      ) : (
        <TopWriteOffSkeleton />
      )}
    </>
  );
};

export default TopWriteoffs;
