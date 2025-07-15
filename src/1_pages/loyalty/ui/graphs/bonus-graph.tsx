import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { GraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

export const BonusGraph = ({
  graph,
  isLoading,
}: {
  graph: GraphResponse[];
  isLoading: boolean;
}) => {
  const prepareLine = usePreparedStackedLine();
  // Кастомные цвета: начисления — зелёный, списания — красный
  const customColors = ["#50A253FF", "#E50046", "#50A2537E", "#E5004591"];
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="min-h-[400px]" />
      ) : (
        <StackedLine
          className="min-h-[400px]"
          option={{
            title: {
              text: "Начисления и списания бонусов",
            },
            legend: {
              data: graph.map((item) => item.name),
            },
            series: graph && prepareLine(graph),
          }}
          customColors={customColors}
        />
      )}
    </>
  );
};
