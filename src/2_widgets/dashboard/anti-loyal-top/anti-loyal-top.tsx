import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import AntiLoyalTopSkeleton from "./anti-loyal-top-skeleton";
import { useSession } from "@entities/session";
import { cn } from "@shared/lib/utils";
import { useGraphColors } from "@shared/hooks/use-graph-colors";
interface ItemData {
  appLoyalPercent: number;
  idStore: number;
  selectedColor: boolean;
  storeName: string;
}
interface AntiLoyalTopProps {
  isLoading: boolean;
  data: ItemData[] | undefined;
  tv?: boolean;
}
const AntiLoyalTop = ({ isLoading, data, tv }: AntiLoyalTopProps) => {
  const { session } = useSession();
  const colors = useGraphColors();

  const getItemColors = () => {
    if (!data || !session?.idStore) return [];
    return data.map((item) => {
      if (tv) return colors.series[0];
      return session.idStore.includes(item.idStore)
        ? colors.series[0]
        : `${colors.series[0]}74`;
    });
  };

  return (
    <>
      {!isLoading && data ? (
        <Card
          className={cn(
            "w-full h-full flex flex-col max-md:mt-5",
            !tv && "md:h-[400px]",
          )}
          data-testid="anti-loyalty-widget"
        >
          <CardHeader>
            <CardTitle className="text-center">
              Анти топ по применению карт лояльности
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <BarHorizontalChart
              labels={data.map((item) => item.storeName)}
              values={data.map((item) => item.appLoyalPercent)}
              itemColors={getItemColors()}
            />
          </CardContent>
        </Card>
      ) : (
        <AntiLoyalTopSkeleton />
      )}
    </>
  );
};

export default AntiLoyalTop;
