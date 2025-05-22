import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/report/sheet";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useCallback, useRef, useState, type FC } from "react";
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
import {
  FiltersState,
  useFiltersStore,
} from "@widgets/report/sheet/model/filters-store";
import { DownloadReport } from "@features/reports/download";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import { useUniqueValues } from "@widgets/report/sheet/ui/side/unique/model/list";

import InfinityTable from "./table/infinite-table";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";
import { useIndicatorList } from "@widgets/report/sheet/ui/side/indicators-filter";
import { create } from "zustand";
import { useCountStore } from "../model/usCountStore";

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
  const { count, reset, setCount } = useCountStore();
  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, setGraph, error } = useReportStore();
  const { getGraph, getTable } = useReport();
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const { table: initialRows, total: initialTotalRows } = useReportStore();
  const { tab } = useTabStore();
  const isCompleted = graph && table && total;
  const [isFiltersOpen, setIsFiltersOpen] = useState(
    !graph || !table || !total
  );
  const all_indicators = useIndicatorList(tab);
  const all_uniques = useIndicatorList(tab);
  const all_values = [...all_indicators, ...all_uniques];
  function getGroupRootIndicator(selected: string): string {
    for (const group of all_values) {
      if (group.children.some((child) => child.id === selected)) {
        return group.children[0].id;
      }
    }
    return selected;
  }

  const { resetAllFilters } = useFiltersStore();
  const { value } = useDateFilterStore();
  const indicators = useIndicatorList(tab);
  const uniques = useUniqueValues(tab);
  const { dataVersion, bumpDataVersion } = useTableVersionStore();
  const [selectedIndicator, setSelectedIndicator] = useState(allData.values[0]);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const getTopLevelLabelByValue = (value: string): string => {
    for (const group of indicators) {
      if (group.value === value) return group.label;
      const child = group.children.find((child) => child.value === value);
      if (child) return group.label;
    }

    for (const group of uniques) {
      if (group.value === value) return group.label;
      const child = group.children?.find((child) => child.value === value);
      if (child) return group.label;
    }

    return value;
  };

  const isIndicatorField = (field: string): boolean => {
    // Проверяем, является ли поле показателем (из indicators)
    for (const group of indicators) {
      if (group.value === field) return true;
      if (group.children.some((child) => child.value === field)) return true;
    }
    return false;
  };

  const toggleRowSelection = (rowData: any) => {
    setSelectedRows((prev) => {
      const isSelected = prev.some(
        (row) => JSON.stringify(row) === JSON.stringify(rowData)
      );
      if (isSelected) {
        return prev.filter(
          (row) => JSON.stringify(row) !== JSON.stringify(rowData)
        );
      } else {
        return [...prev, rowData];
      }
    });
  };

  const applyFiltersFromSelectedRows = async (field: string) => {
    if (selectedRows.length === 0) return;

    // Собираем все уникальные значения из выбранных строк
    const newFilters: FiltersState["filters"] = {
      ...allData.filters,
      store: {
        idStore: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.id_store)
              .map((row) => row.id_store)
          )
        ),
        idCity: Array.from(
          new Set(
            selectedRows.filter((row) => row.id_city).map((row) => row.id_city)
          )
        ),
        idRegion: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.id_region)
              .map((row) => row.id_region)
          )
        ),
        idManager: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.id_manager)
              .map((row) => row.id_manager)
          )
        ),
        storeCondition: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.storeCondition)
              .map((row) => row.storeCondition)
          )
        ),
        ageGroup: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.ageGroup)
              .map((row) => row.ageGroup)
          )
        ),
        idLegalEntity: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.id_legal_entity)
              .map((row) => row.id_legal_entity)
          )
        ),
        channel: Array.from(
          new Set(
            selectedRows.filter((row) => row.channel).map((row) => row.channel)
          )
        ),
        district: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.district)
              .map((row) => row.district)
          )
        ),
      },
      product: {
        groupFranchise: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.groupsFranchise)
              .map((row) => row.groupsFranchise)
          )
        ),
        ppProducts: null,
        subDivisionProducts: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.subDivisionProducts)
              .map((row) => row.subDivisionProducts)
          )
        ),
        subGroups: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.subGroups)
              .map((row) => row.subGroups)
          )
        ),
        subSubGroups: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.subSubGroups)
              .map((row) => row.subSubGroups)
          )
        ),
        typeProducts: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.typeProducts)
              .map((row) => row.typeProducts)
          )
        ),
        teamProducts: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.teamProducts)
              .map((row) => row.teamProducts)
          )
        ),
        directionProducts: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.directionProducts)
              .map((row) => row.directionProducts)
          )
        ),
        groupsEconomist: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.groupsEconomist)
              .map((row) => row.groupsEconomist)
          )
        ),
        idGroupMain: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.group_id)
              .map((row) => row.group_id)
          )
        ),
        idProduct: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.idProduct)
              .map((row) => row.idProduct)
          )
        ),
        seasonalityProducts: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.seasonalityProducts)
              .map((row) => row.seasonalityProducts)
          )
        ),
        managerAuto: Array.from(
          new Set(
            selectedRows
              .filter((row) => row.managerAuto)
              .map((row) => row.managerAuto)
          )
        ),
      },
    };

    // Определяем, нужно ли менять индикатор
    let indicatorToSet = getGroupRootIndicator(selectedIndicator);
    if (isIndicatorField(field)) {
      const rootIndicator = getGroupRootIndicator(field);
      indicatorToSet = rootIndicator;
      setSelectedIndicator(rootIndicator);
    }

    try {
      const [graph] = await Promise.all([
        getGraph({
          ...allData,
          filters: {
            ...allData.filters,
            ...newFilters,

            loyal: {
              ...newFilters.loyal,

              ageStart:
                newFilters.loyal.ageStart === 0 &&
                allData.filters.loyal.ageEnd === 100
                  ? null
                  : newFilters.loyal.ageStart,
              ageEnd:
                newFilters.loyal.ageStart === 0 &&
                allData.filters.loyal.ageEnd === 100
                  ? null
                  : newFilters.loyal.ageEnd,
            },
          },
          values: [indicatorToSet],
          groups: [value],
          sorts: { colId: [allData.values[0]], sort: "desc" },
        }),
      ]);
      setGraph(graph);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const onCellClick = async (params: any) => {
    const clickedField = params.field;

    // Определяем корневой показатель для выбранного поля (если нужно)
    const rootIndicator = getGroupRootIndicator(clickedField);

    // Меняем выбранный индикатор в состоянии
    setSelectedIndicator(rootIndicator);

    try {
      // Запрашиваем новый график с новым индикатором
      const [graph] = await Promise.all([
        getGraph({
          ...allData,
          values: [rootIndicator],
          groups: [value], // value — выбранный период из DateDropdown
          filters: allData.filters, // если хочешь, можно изменить фильтры
          sorts: { colId: [rootIndicator], sort: "desc" },
        }),
      ]);
      setGraph(graph);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

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
      setCount((await requestPromise).totalRows);
      return requestPromise;
    },
    [getTable, initialRows, initialTotalRows, getApiPayload]
  );

  const handleClearFilters = () => {
    resetAllFilters();
    clearAll();
    requestCache.current = {};
    lastRequestKey.current = "";
    bumpDataVersion();
    setSelectedIndicator(allData.values[0]);
    setSelectedRows([]);
    reset();
  };

  return (
    <>
      <Sheet />
      <div className="bg-muted max-h-screen w-full p-2 flex flex-col gap-2">
        <Header
          actions={{
            right: (
              <div className="flex flex-row gap-2">
                <DownloadReport rows={count || 0} />
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
                <h1 className="font-bold leading-none md:text-xl text-md tracking-tight flex flex-row gap-2 items-start">
                  {tab === "commerce" ? "Коммерческая" : "Чековая"}
                  <p className="flex flex-row gap-2 text-sm font-medium">
                    {selectedRows.length > 0 && (
                      <>Выбрано строк: {selectedRows.length}</>
                    )}
                  </p>
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
                      text: getTopLevelLabelByValue(selectedIndicator),
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
              {graph && !isFiltersOpen && (
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
          {table && total ? (
            <InfinityTable
              maxRows={table.totalRows}
              fetchData={fetchData as any}
              totalData={total as any}
              onCellClick={onCellClick}
              dataVersion={dataVersion}
              selectedRows={selectedRows}
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
