import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/report/sheet";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";

import { useReportStore } from "@widgets/report/sheet/model/report-store";
import FiltersAccordeon from "./filters";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, Save, Star } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@shared/lib/utils";
import DateDropdown from "./date-dropdown";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { DownloadReport } from "@features/reports/download";
import { useReport } from "@entities/report/model/api/filters/data/controller";

import InfinityTable from "./table/infinite-table";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";

import { create } from "zustand";
import ReportCards from "./report-cards";

interface TableVersionState {
  dataVersion: number;
  setDataVersion: (version: number) => void;
  bumpDataVersion: () => void;
}
interface RequestCache {
  [key: string]: Promise<{ data: any[]; totalRows: number }>;
}
export const useTableVersionStore = create<TableVersionState>((set) => ({
  dataVersion: 0,
  setDataVersion: (version: number) => set({ dataVersion: version }),
  bumpDataVersion: () =>
    set((state) => ({ dataVersion: state.dataVersion + 1 })),
}));

const Report: FC = () => {
  const requestCache = useRef<RequestCache>({});
  const lastRequestKey = useRef<string>("");
  const { getApiPayload } = useFiltersStore();

  const allData = getApiPayload();

  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, error } = useReportStore();
  const { getTable } = useReport();
  const { table: initialRows, total: initialTotalRows } = useReportStore();
  const { tab } = useTabStore();
  const isCompleted = graph && table && total;
  const [isFiltersOpen, setIsFiltersOpen] = useState(!graph);
  const { resetAllFilters } = useFiltersStore();
  const { dataVersion, bumpDataVersion } = useTableVersionStore();

  const fetchData = useCallback(
    async ({
      startRow,
      endRow,
      sortModel = [],
    }: {
      startRow: number;
      endRow: number;
      sortModel?: { colId: string; sort: "asc" | "desc" }[];
    }) => {
      const requestKey = JSON.stringify({
        startRow,
        endRow,
        sortModel,
        values: getApiPayload().values,
        groups: getApiPayload().groups,
        filters: getApiPayload().filters,
      });

      if (
        requestKey === lastRequestKey.current &&
        (await requestCache.current[requestKey])
      ) {
        return requestCache.current[requestKey];
      }

      if (
        startRow === 0 &&
        initialRows &&
        initialRows.data.length > 0 &&
        sortModel.length === 0
      ) {
        const result = {
          data: initialRows.data.slice(startRow, endRow),
          totalRows: initialTotalRows,
        };

        const cachedPromise = Promise.resolve(result);
        requestCache.current[requestKey] = (await cachedPromise) as any;
        lastRequestKey.current = requestKey;

        return cachedPromise;
      }

      const payload = getApiPayload();
      const sorts =
        sortModel.length > 0
          ? { colId: [sortModel[0].colId], sort: sortModel[0].sort }
          : { colId: [payload.values[0]], sort: "desc" as "asc" | "desc" };

      const requestPromise = getTable({
        ...payload,
        filterDate: {
          dateStart: payload.filterDate.dateStart,
          dateEnd: payload.filterDate.dateEnd,
        },
        filters: {
          ...payload.filters,
          loyal: {
            ...payload.filters.loyal,
            ageStart:
              payload.filters.loyal.ageStart === 0 &&
              allData.filters.loyal.ageEnd === 100
                ? null
                : payload.filters.loyal.ageStart,
            ageEnd:
              payload.filters.loyal.ageStart === 0 &&
              allData.filters.loyal.ageEnd === 100
                ? null
                : payload.filters.loyal.ageEnd,
          },
        },
        offset: startRow,
        limit: endRow - startRow,
        sorts: sorts,
        groups: payload.groups,
      });

      requestCache.current[requestKey] = requestPromise;
      lastRequestKey.current = requestKey;

      return requestPromise;
    },
    [getTable, initialRows, initialTotalRows, getApiPayload, allData.filters]
  );

  const handleClearFilters = () => {
    resetAllFilters();
    clearAll();
    requestCache.current = {}; // Полная очистка кэша
    lastRequestKey.current = "";
    bumpDataVersion();
  };
  useEffect(() => {
    // Сбрасываем кэш при изменении фильтров
    requestCache.current = {};
    lastRequestKey.current = "";
    bumpDataVersion();
  }, [allData.filters, bumpDataVersion]);
  return (
    <>
      <Sheet />
      <div className="bg-muted max-h-screen w-full p-2 flex flex-col gap-2">
        <Header
          actions={{
            right: (
              <div className="flex flex-row gap-2">
                <DownloadReport rows={table?.totalRows || 0} />
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
              <div className="flex flex-row gap-1 items-center justify-between flex-1 w-full! shrink-0">
                <h1 className="font-bold leading-none md:text-xl text-md tracking-tight flex flex-row gap-2 items-start">
                  {tab === "commerce" ? "Коммерческая" : "Чековая"}
                </h1>
                <div className="flex flex-row gap-1 items-center ">
                  <DateDropdown />
                  <Button
                    className="w-fit"
                    size="sm"
                    variant="outline"
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  >
                    {!graph || !isFiltersOpen ? (
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
                    onClick={() => {
                      handleClearFilters();
                      setIsFiltersOpen(true);
                    }}
                    variant="outline"
                  >
                    Очистить фильтры <Eraser className="text-primary/80" />
                  </Button>
                </div>
              </div>
              {graph && !isFiltersOpen ? (
                <StackedLine
                  option={{
                    title: {
                      text: allData.values[0],
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
            <ReportCards isFiltersOpen={isFiltersOpen} graph={graph} />
          </div>
          {table && total ? (
            <InfinityTable
              maxRows={table.totalRows}
              fetchData={fetchData as any}
              totalData={total as any}
              onCellClick={(field) => console.log(field)}
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
