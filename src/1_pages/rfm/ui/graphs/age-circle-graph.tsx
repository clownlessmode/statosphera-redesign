import { Card } from "@shared/ui/card";
import { PieChart } from "@shared/ui/graphs/pie-chart/pie-chart";
import { AgeCircleGraphResponse } from "../../config";

export const AgeCircleGraph = ({
  graph,
}: {
  graph: AgeCircleGraphResponse;
  isLoading: boolean;
}) => {
  return (
    <Card className="h-[400px] px-10">
      <PieChart
        data={graph.circle.map((item) => ({
          name: item.name,
          value: item.value,
        }))}
        title="Распределение по полу"
        formatter={(params) => {
          return `${params.name} ${params.percent ? params.percent.toFixed(1) : "0"}%`;
        }}
      />
    </Card>
  );
};
