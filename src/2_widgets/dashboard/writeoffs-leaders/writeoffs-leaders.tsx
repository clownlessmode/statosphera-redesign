import { LeaderWriteOffs } from "@pages/dashboard/api/types";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { BarHorizontalChart } from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import BarHorizontalChartSkeleton from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart-skeleton";
import { useSession } from "@entities/session";
import { cn } from "@shared/lib/utils";
import { useGraphColors } from "@shared/hooks/use-graph-colors";

interface WriteoffsLeadersProps {
  isLoading: boolean;
  data: LeaderWriteOffs | undefined;
  tv?: boolean;
}
const WriteoffsLeaders = ({ isLoading, data, tv }: WriteoffsLeadersProps) => {
  const { session } = useSession();
  const colors = useGraphColors();

  // Создаем массив цветов на основе сравнения с session.idStore
  const getItemColors = () => {
    if (!data?.data || !session?.idStore) return [];

    return data.data.map((item) => {
      if (tv) return colors.series[0];
      // Если idStore магазина есть в массиве session.idStore, то основной цвет
      return session.idStore.includes(item.idStore)
        ? colors.series[0]
        : `${colors.series[0]}74`;
    });
  };
  return (
    <Card
      className={cn("w-full h-full flex flex-col", !tv && "md:h-[400px]")}
      data-testid="writeoffs-leaders-widget"
    >
      <CardHeader>
        {isLoading || !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle className="text-center">Аутсайдеры по списаниям</CardTitle>
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
