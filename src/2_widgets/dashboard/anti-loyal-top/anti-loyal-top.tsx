import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { SalesStructure as SalesStructureType } from "@pages/dashboard/api/types";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import AntiLoyalTopSkeleton from "./anti-loyal-top-skeleton";

interface AntiLoyalTopProps {
  isLoading: boolean;
  data: SalesStructureType | undefined;
}
const AntiLoyalTop = ({ isLoading, data }: AntiLoyalTopProps) => {
  return (
    <>
      {!isLoading && data && data.label && data.data && data.data.xAxis ? (
        <Card className="w-full h-[400px] flex flex-col">
          <CardHeader>
            <CardTitle>Анти топ по применению карт лояльности</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <BarHorizontalChart
              labels={data?.data.xAxis}
              values={data?.data.series.map((series) => series.data) as any}
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
