import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/report/sheet";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useCallback, useState, type FC } from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import { ReportCard } from "./report-card";
import { useReportStore } from "@widgets/report/sheet/model/report-store";
import FiltersAccordeon from "./filters";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, Save, Star } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@shared/lib/utils";
import DateDropdown, { useDateFilterStore } from "./date-dropdown";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { DownloadReport } from "@features/reports/download";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { useUniqueValues } from "@widgets/report/sheet/ui/side/unique/model/list";
import { getTopLevelValues } from "@shared/lib/get-top-level";
import InfinityTable from "./table/infinite-table";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";
import { useIndicatorList } from "@widgets/report/sheet/ui/side/indicators-filter";
import { create } from "zustand";

interface TableVersionState {
  dataVersion: number;
  setDataVersion: (version: number) => void;
  bumpDataVersion: () => void; // <— новый экшен
}

export const useTableVersionStore = create<TableVersionState>((set) => ({
  dataVersion: 0,
  setDataVersion: (version: number) => set({ dataVersion: version }),
  bumpDataVersion: () =>
    set((state) => ({ dataVersion: state.dataVersion + 1 })),
}));
const Report: FC = () => {
  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, setGraph, error } = useReportStore();
  const { getGraph, getTable } = useReport();
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const { table: initialRows, total: initialTotalRows } = useReportStore();
  const { tab } = useTabStore();
  const isCompleted = graph && table && total;
  const [isFiltersOpen, setIsFiltersOpen] = useState(!isCompleted);
  const { resetAllFilters } = useFiltersStore();
  const { value } = useDateFilterStore();
  const indicators = useIndicatorList(tab);
  const uniques = useUniqueValues(tab);
  const values = [...indicators, ...uniques];
  const topLevelValues = getTopLevelValues(values);
  const { dataVersion, bumpDataVersion } = useTableVersionStore(); // Для контроля обновления таблицы

  const onCellClick = async (params: any) => {
    try {
      const [graph] = await Promise.all([
        getGraph({
          ...allData,
          values: [
            topLevelValues.includes(params.field.toLowerCase())
              ? params.field
              : allData.values[0],
          ],
          groups: [value],
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
      ]);
      setGraph(graph);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const fetchData = useCallback(
    ({ startRow, endRow }: { startRow: number; endRow: number }) => {
      // Если есть начальные данные и это первая загрузка - используем их
      if (startRow === 0 && initialRows && initialRows.data.length > 0) {
        return Promise.resolve({
          data: initialRows.data.slice(startRow, endRow),
          totalRows: initialTotalRows,
        });
      }

      // Иначе делаем запрос к API
      const payload = getApiPayload();
      return getTable({
        ...payload,
        filterDate: {
          dateStart: payload.filterDate.dateStart,
          dateEnd: payload.filterDate.dateEnd,
        },
        offset: startRow,
        limit: endRow - startRow,
        sorts: { colId: [payload.values[0]], sort: "desc" },
        groups: payload.groups,
      });
    },
    [getTable, getApiPayload, initialRows, initialTotalRows]
  );

  const handleClearFilters = () => {
    resetAllFilters();
    clearAll();
    bumpDataVersion(); // Принудительно обновляем таблицу
  };

  return (
    <>
      <Sheet />
      <div className="bg-muted max-h-screen w-full p-2 flex flex-col gap-2">
        <Header
          actions={{
            right: (
              <div className="flex flex-row gap-2">
                <DownloadReport />
                <Button variant="outline">
                  <Save />
                </Button>
                <Button variant="outline">
                  <Star /> Сохраненные отчеты
                </Button>
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background p-4 flex flex-col h-full gap-4">
          <div
            className={cn(
              "flex gap-2 max-h-[40vh]",
              isFiltersOpen ? "flex-col" : "flex-row"
            )}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-1 items-center justify-between ">
                <h1 className="font-bold leading-none md:text-xl text-md tracking-tight">
                  {tab === "commerce" ? "Коммерческая" : "Чековая"}
                </h1>
                <div className="flex flex-row gap-1 items-center">
                  <DateDropdown />
                  <Button
                    className="w-fit"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  >
                    {!isCompleted || !isFiltersOpen ? (
                      <>
                        Изменить фильтры <Cog className="text-primary/80" />
                      </>
                    ) : (
                      <>
                        Показать график <Cog className="text-primary/80" />
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleClearFilters}
                    variant="outline"
                  >
                    Очистить фильтры <Eraser className="text-primary/80" />
                  </Button>
                </div>
              </div>
              {isCompleted && !isFiltersOpen ? (
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
              ) : (
                <AnimatePresence>
                  <FiltersAccordeon
                    defaultOpen={!isCompleted}
                    isOpen={isFiltersOpen}
                  />
                </AnimatePresence>
              )}
            </div>
            <div
              className={cn(
                "flex gap-2",
                isFiltersOpen ? "flex-row" : "flex-col"
              )}
            >
              {isCompleted && !isFiltersOpen && (
                <>
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
                </>
              )}
            </div>
          </div>
          {isCompleted ? (
            <InfinityTable
              fetchData={fetchData as any}
              totalData={total as any}
              onCellClick={onCellClick}
              dataVersion={dataVersion}
            />
          ) : (
            <div className="flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-end mb-[10%]">
              {error ? <NotFoundFilters /> : <NotSelectedFilters />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Report;
