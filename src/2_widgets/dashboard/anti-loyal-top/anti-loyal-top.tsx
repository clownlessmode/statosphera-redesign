import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import AntiLoyalTopSkeleton from "./anti-loyal-top-skeleton";
import { useSession } from "@entities/session";
interface ItemData {
  appLoyalPercent: number;
  idStore: number;
  selectedColor: boolean;
  storeName: string;
}
interface AntiLoyalTopProps {
  isLoading: boolean;
  data: ItemData[] | undefined;
}
const AntiLoyalTop = ({ isLoading, data }: AntiLoyalTopProps) => {
  const { session } = useSession();

  const getItemColors = () => {
    if (!data || !session?.idStore) return [];
    return data.map((item) => {
      return session.idStore.includes(item.idStore) ? "#e50046" : "#7f7f7f74";
    });
  };

  return (
    <>
      {!isLoading && data ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Анти топ по применению карт лояльности</CardTitle>
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
