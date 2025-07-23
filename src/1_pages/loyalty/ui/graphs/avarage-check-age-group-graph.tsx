import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { AvarageCheckAgeGroupGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

export const AvarageCheckAgeGroupGraph = ({
  graph,
  isLoading,
}: {
  graph: AvarageCheckAgeGroupGraphResponse;
  isLoading: boolean;
}) => {
  const prepareLine = usePreparedStackedLine();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="min-h-[400px] col-span-3" />
      ) : (
        <StackedLine
          className="min-h-[400px] col-span-3"
          customColors={[
            "#e74c3c",
            "#3498db",
            "#2ecc71",
            "#f39c12",
            "#9b59b6",
            "#e91e63",
            "#ff5722",
          ]}
          option={{
            title: {
              text: "Средний чек по возрастным группам",
            },
            legend: {
              data: graph.graph.map((item) => item.name),
            },
            series: graph.graph && prepareLine(graph.graph as any),
          }}
        />
      )}
    </>
  );
};
