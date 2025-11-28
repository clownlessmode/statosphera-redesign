import { ReportGraphResponse } from "@entities/report/model/api/filters/data/service";
import { ForestCard } from "./forest-card";

const ForestCards = ({
  graph,

  isFiltersOpen,
}: {
  graph: ReportGraphResponse | null;
  isFiltersOpen: boolean;
}) => {
  return (
    <>
      {graph && !isFiltersOpen && (
        <div className="flex gap-2 flex-col">
          <ForestCard
            value={graph.card1.value1}
            subvalue={graph.card1.value2}
            title={graph.card1.name1}
            subtitle={graph.card1.name2}
            isNegative={graph.card1.negative}
          />
          <ForestCard
            value={graph.card2.value1}
            subvalue={graph.card2.value2}
            title={graph.card2.name1}
            subtitle={graph.card2.name2}
            isNegative={graph.card2.negative}
          />
          <ForestCard
            value={graph.card3.value1}
            subvalue={graph.card3.value2}
            title={graph.card3.name1}
            subtitle={graph.card3.name2}
            isNegative={graph.card3.negative}
          />
        </div>
      )}
    </>
  );
};

export default ForestCards;
