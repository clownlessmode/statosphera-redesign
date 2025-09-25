import { LeaderWriteOffs } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { BarHorizontalChart } from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import BarHorizontalChartSkeleton from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart-skeleton";
import { useSession } from "@entities/session";

interface WriteoffsLeadersProps {
  isLoading: boolean;
  data: LeaderWriteOffs | undefined;
}
const WriteoffsLeaders = ({ isLoading, data }: WriteoffsLeadersProps) => {
  const { session } = useSession();

  // Создаем массив цветов на основе сравнения с session.idStore
  const getItemColors = () => {
    if (!data?.data || !session?.idStore) return [];

    return data.data.map((item) => {
      // Если idStore магазина есть в массиве session.idStore, то серый цвет
      return session.idStore.includes(item.idStore) ? "#e50046" : "#7f7f7f74";
    });
  };
  return (
    <Card className="w-full md:h-[400px] flex flex-col">
      <CardHeader>
        {isLoading || !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Аутсайдеры по списаниям</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {isLoading && !data ? (
          <BarHorizontalChartSkeleton />
        ) : (
          <BarHorizontalChart
            isLoading={isLoading}
            labels={data?.data.map((item) => item.storeName) || []}
            values={data?.data.map((item) => item.writeOffPercent) || []}
            itemColors={getItemColors()}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default WriteoffsLeaders;
