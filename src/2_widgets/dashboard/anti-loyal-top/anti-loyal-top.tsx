import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Skeleton } from "@shared/ui/skeleton";

import { SalesStructure as SalesStructureType } from "@pages/dashboard/api/types";
import { BarHorizontalChart } from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
interface AntiLoyalTopProps {
  isLoading: boolean;
  data: SalesStructureType | undefined;
}
const AntiLoyalTop = ({ isLoading, data }: AntiLoyalTopProps) => {
  return (
    <Card className="w-full h-[400px] flex flex-col">
      <CardHeader>
        {isLoading && !data ? (
          <CardTitle>
            <Skeleton className="w-[70%] h-[20px] bg-muted-foreground rounded-md" />
          </CardTitle>
        ) : (
          <CardTitle>Анти топ по применению карт лояльности</CardTitle>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        {(isLoading && !data) || !data?.data.xAxis || !data?.data.series ? (
          <BarHorizontalChart.Skeleton sort="asc" />
        ) : (
          //   <BarHorizontalChart
          //     labels={data?.data.xAxis}
          //     values={data?.data.series.map((series) => series.data)}
          //   />\
          <></>
        )}
      </CardContent>
    </Card>
  );
};

export default AntiLoyalTop;
