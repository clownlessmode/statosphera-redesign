import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/report/sheet";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import { type FC } from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { ReportCard } from "./report-card";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import FiltersAccordeon from "./filters";

const Report: FC = () => {
  const prepareLine = usePreparedStackedLine();
  const { graph } = useReportStore();
  const { tab } = useTabStore();

  return (
    <>
      <Sheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
        <Header title={tab === "commerce" ? "Коммерческая" : "Чековая"} />
        <div className="rounded-3xl bg-background p-4 flex flex-col h-full">
          <FiltersAccordeon />
          {graph ? (
            <div className="flex flex-row gap-2 h-full w-full">
              <StackedLine
                option={{
                  title: {
                    text: "Выручка",
                  },
                  legend: {
                    data: ["Выбранный период", "Прошлый год"],
                  },
                  series: graph?.graph && prepareLine(graph.graph),
                }}
              />
              {/* <div className="flex flex-col gap-2">
                <ReportCard
                  value={graph.card1.value1}
                  subvalue={graph.card1.value2}
                  title={graph.card1.name1}
                  subtitle={graph.card1.name2}
                  isNegative={graph.card1.negative}
                />
                <ReportCard
                  value={graph.card2.value1}
                  subvalue={graph.card2.value2}
                  title={graph.card2.name1}
                  subtitle={graph.card2.name2}
                  isNegative={graph.card2.negative}
                />
                <ReportCard
                  value={graph.card3.value1}
                  subvalue={graph.card3.value2}
                  title={graph.card3.name1}
                  subtitle={graph.card3.name2}
                  isNegative={graph.card3.negative}
                />
              </div> */}
            </div>
          ) : (
            <div className="flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-center">
              <NotSelectedFilters />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
