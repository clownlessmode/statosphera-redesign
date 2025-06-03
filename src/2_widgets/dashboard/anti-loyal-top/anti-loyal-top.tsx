import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import AntiLoyalTopSkeleton from "./anti-loyal-top-skeleton";
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
