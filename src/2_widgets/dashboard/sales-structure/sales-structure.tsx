import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { StackedBarChart } from "@shared/ui/graphs/stacked-bars/stacked-bars";
import { SalesStructure as SalesStructureType } from "@pages/dashboard/api/types";
import SalesStructureSkeleton from "./sales-structure-skeleton";
import { cn } from "@shared/lib/utils";
interface SalesStructureProps {
  isLoading: boolean;
  data: SalesStructureType | undefined;
  tv?: boolean;
}
const SalesStructure = ({ isLoading, data, tv }: SalesStructureProps) => {
  return (
    <>
      {!isLoading &&
      data &&
      data.data &&
      data.data.xAxis &&
      data.data.series ? (
        <Card
          className={cn("w-full h-[400px] flex flex-col", tv && "h-full")}
          data-testid="sales-structure-widget"
        >
          <CardHeader>
            <CardTitle className="text-center max-md:text-sm">
              Структура продаж за 6 месяцев
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <StackedBarChart
              xAxis={data?.data.xAxis}
              series={data?.data.series}
            />
          </CardContent>
        </Card>
      ) : (
        <SalesStructureSkeleton />
      )}
    </>
  );
};

export default SalesStructure;
