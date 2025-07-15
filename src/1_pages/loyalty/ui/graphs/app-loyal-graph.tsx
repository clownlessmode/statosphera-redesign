import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { AppLoyalGraphResponse } from "../../config";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";

export const AppLoyalGraph = ({
  graph,
  isLoading,
}: {
  graph: AppLoyalGraphResponse;
  isLoading: boolean;
}) => {
  const prepareLine = usePreparedStackedLine();
  return (
    <>
      {isLoading ? (
        <StackedLineSkeleton className="min-h-[400px]" />
      ) : (
        <StackedLine
          className="min-h-[400px]"
          option={{
            title: {
              text: "Проникновение карты лояльности",
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
