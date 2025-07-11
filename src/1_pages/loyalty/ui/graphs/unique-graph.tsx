import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { UniqueGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

export const UniqueGraph = ({
  graph,
  isLoading,
}: {
  graph: UniqueGraphResponse;
  isLoading: boolean;
}) => {
  const prepareLine = usePreparedStackedLine();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton />
      ) : (
        <StackedLine
          className="min-h-[400px]"
          option={{
            title: {
              text: "Уникальные пользователи",
            },
            legend: {
              data: graph.graph.map((item) => item.name),
            },
            series: graph.graph && prepareLine(graph.graph),
          }}
        />
      )}
    </>
  );
};
