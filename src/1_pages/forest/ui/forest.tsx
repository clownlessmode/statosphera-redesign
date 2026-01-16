import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/forest/sheet";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FC,
  useMemo,
} from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { useForestStore } from "@widgets/forest/sheet/model/forest-store";
import FiltersAccordeon from "./filters";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@shared/lib/utils";
import DateDropdown from "./date-dropdown";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { DownloadForest } from "@features/forest/download";
import { useForest } from "@entities/forest/model/api/filters/data/controller";
import InfinityTable from "./table/infinite-table";
import { create } from "zustand";
import ForestCards from "./forest-cards";
import { getLabelByValue } from "./values-badges";
import { useIndicatorList } from "@widgets/forest/sheet/ui/side/indicators-filter";
import { useUniqueValues } from "@widgets/forest/sheet/ui/side/uniques-filter";
//import { SavedReports } from "@features/reports/saved-reports";
//import { SaveReport } from "@features/reports/save-report";
import { useDateFilterStore } from "./date-dropdown";
import Spinner from "@shared/ui/spinner";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useWriteOffController } from "@entities/forest/model/api/filters/data-write-off/controller";
import NotSelectedFiltersNY from "@shared/assets/capibara/not-selected-filters-new-year";
import NotFoundFiltersNY from "@shared/assets/capibara/not-found-filters-new-year";

function extractFiltersFromRow(_row: any, selectedRows: any[]) {
  const filters: any = {
    store: {
      idStore: [],
      idCity: [],
      idRegion: [],
    },
    product: {
      idProduct: [],
      oneLvlGroupProduct: [],
      twoLvlGroupProduct: [],
      threeLvlGroupProduct: [],
    },
  };

  const mapping: Record<string, any[]> = {
    id_store: filters.store.idStore,
    id_city: filters.store.idCity,
    id_region: filters.store.idRegion,
    id_product: filters.product.idProduct,
    idOneLvlGroupProduct: filters.product.oneLvlGroupProduct,
    idTwoLvlGroupProduct: filters.product.twoLvlGroupProduct,
    idThreeLvlGroupProduct: filters.product.threeLvlGroupProduct,
  };

  for (const currentRow of selectedRows) {
    for (const key in mapping) {
      const val = currentRow[key];
      if (val != null && !mapping[key].includes(val)) {
        mapping[key].push(val);
      }
    }
  }
  return filters;
}

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

interface GraphVersionState {
  graphVersion: number;
  setGraphVersion: (version: number) => void;
  bumpGraphVersion: () => void;
}

export const useGraphVersionStore = create<GraphVersionState>((set) => ({
  graphVersion: 0,
  setGraphVersion: (version: number) => set({ graphVersion: version }),
  bumpGraphVersion: () =>
    set((state) => ({ graphVersion: state.graphVersion + 1 })),
}));

const Forest: FC = () => {
  const { value: dateFilterValue } = useDateFilterStore();
  const requestCache = useRef<RequestCache>({});
  const lastRequestKey = useRef<string>("");
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null,
  );
  const { graphVersion, bumpGraphVersion } = useGraphVersionStore();
  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, error, setGraph } = useForestStore();
  const { getTable, getGraph } = useForest();
  const { getTable: getWriteOffTable, getGraph: getWriteOffGraph } =
    useWriteOffController();
  const { table: initialRows, total: initialTotalRows } = useForestStore();
  const { tab } = useTabStore();
  const indicators = useIndicatorList(tab);
  const uniques = useUniqueValues(tab);
  const isCompleted = graph && table && total;
  const [isFiltersOpen, setIsFiltersOpen] = useState(!graph);
  const { resetAllFilters } = useFiltersStore();
  const { dataVersion, bumpDataVersion } = useTableVersionStore();
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const initialFiltersRef = useRef<any>(null);

  useEffect(() => {
    if (graph && table && total) {
      if (selectedRows.length === 0) {
        initialFiltersRef.current = {
          filters: JSON.parse(JSON.stringify(allData.filters)),
          values: [...allData.values],
          groups: [dateFilterValue],
          graph: graph,
        };
      }
    }
  }, [
    graph,
    table,
    total,
    allData.filters,
    allData.values,
    selectedRows.length,
  ]);

  const handleSelectionChange = useCallback(
    (newSelectedRows: any[]) => {
      setSelectedRows(newSelectedRows);

      // Если нет выбранных строк, восстанавливаем начальный график
      if (newSelectedRows.length === 0 && initialFiltersRef.current) {
        const payload = getApiPayload();

        const requestPromise =
          tab === "write-off"
            ? getWriteOffGraph({
                ...payload,
                filters: initialFiltersRef.current.filters,
                groups: [dateFilterValue],
                values: initialFiltersRef.current.values,
              })
            : getGraph({
                ...payload,
                filters: initialFiltersRef.current.filters,
                groups: [dateFilterValue],
                values: initialFiltersRef.current.values,
              });

        requestPromise.then((response) => {
          if (response) {
            setGraph(response);
            bumpGraphVersion();
          }
        });
        return;
      }

      const extractedFilters = extractFiltersFromRow(
        newSelectedRows[0],
        newSelectedRows,
      );

      const payload = getApiPayload();

      const mergedFilters = {
        ...payload.filters,
        store: {
          ...payload.filters.store,
          idStore:
            extractedFilters.store.idStore.length > 0
              ? extractedFilters.store.idStore
              : payload.filters.store.idStore,
          idCity:
            extractedFilters.store.idCity.length > 0
              ? extractedFilters.store.idCity
              : payload.filters.store.idCity,
          idRegion:
            extractedFilters.store.idRegion.length > 0
              ? extractedFilters.store.idRegion
              : payload.filters.store.idRegion,
        },
        product: {
          ...payload.filters.product,
          idProduct:
            extractedFilters.product.idProduct.length > 0
              ? extractedFilters.product.idProduct
              : payload.filters.product.idProduct,
          oneLvlGroupProduct:
            extractedFilters.product.oneLvlGroupProduct.length > 0
              ? extractedFilters.product.oneLvlGroupProduct
              : payload.filters.product.oneLvlGroupProduct,
          twoLvlGroupProduct:
            extractedFilters.product.twoLvlGroupProduct.length > 0
              ? extractedFilters.product.twoLvlGroupProduct
              : payload.filters.product.twoLvlGroupProduct,
          threeLvlGroupProduct:
            extractedFilters.product.threeLvlGroupProduct.length > 0
              ? extractedFilters.product.threeLvlGroupProduct
              : payload.filters.product.threeLvlGroupProduct,
        },
      };

      // Запрашиваем график
      const requestPromise =
        tab === "write-off"
          ? getWriteOffGraph({
              ...payload,
              filters: mergedFilters,
              groups: [dateFilterValue],
              values: payload.values,
            })
          : getGraph({
              ...payload,
              filters: mergedFilters,
              groups: [dateFilterValue],
              values: payload.values,
            });

      requestPromise.then((response) => {
        if (response) {
          setGraph(response);
          setSelectedIndicator(payload.values[0]);
        }
      });
    },
    [getApiPayload, getGraph, getWriteOffGraph, setGraph, dateFilterValue, tab],
  );

  // Обработчик клика на ячейку для установки показателя
  const handleCellClick = useCallback(
    (info: { rowData: any; field: string; value: any }) => {
      // Проверяем что данные загружены
      if (!graph || !table || !total) {
        return;
      }

      // Проверяем, является ли поле показателем
      const isFieldAnIndicator = indicators.some((group) =>
        group.children?.some((child: any) => child.value === info.field),
      );
      const isFieldAUnique = uniques.some((group) =>
        group.children?.some((child: any) => child.value === info.field),
      );

      if (isFieldAnIndicator || isFieldAUnique) {
        // Находим родительский показатель
        let parentIndicator = info.field;

        // Ищем родителя в indicators
        for (const group of indicators) {
          const found = group.children?.find(
            (child: any) => child.value === info.field,
          );
          if (found) {
            parentIndicator = group.children[0].value;
            break;
          }
        }

        // Если не нашли в indicators, ищем в uniques
        if (parentIndicator === info.field) {
          for (const group of uniques) {
            const found = group.children?.find(
              (child: any) => child.value === info.field,
            );
            if (found) {
              parentIndicator = group.children[0].value;
              break;
            }
          }
        }

        // Делаем запрос за новыми данными для графика
        const payload = getApiPayload();

        // Используем начальные фильтры как базу, если они есть
        const baseFilters = initialFiltersRef.current
          ? initialFiltersRef.current.filters
          : payload.filters;

        let mergedFilters;

        if (selectedRows.length > 0) {
          const extractedFilters = extractFiltersFromRow(
            info.rowData,
            selectedRows,
          );

          mergedFilters = {
            ...baseFilters,
            filterDate: payload.filters.filterDate,
            filterTime: payload.filters.filterTime,
            store: {
              ...baseFilters.store,
              idStore:
                extractedFilters.store.idStore.length > 0
                  ? extractedFilters.store.idStore
                  : baseFilters.store.idStore,
              idCity:
                extractedFilters.store.idCity.length > 0
                  ? extractedFilters.store.idCity
                  : baseFilters.store.idCity,
              idRegion:
                extractedFilters.store.idRegion.length > 0
                  ? extractedFilters.store.idRegion
                  : baseFilters.store.idRegion,
            },
            product: {
              ...baseFilters.product,
              idProduct:
                extractedFilters.product.idProduct.length > 0
                  ? extractedFilters.product.idProduct
                  : baseFilters.product.idProduct,
              oneLvlGroupProduct:
                extractedFilters.product.oneLvlGroupProduct.length > 0
                  ? extractedFilters.product.oneLvlGroupProduct
                  : baseFilters.product.oneLvlGroupProduct,
              twoLvlGroupProduct:
                extractedFilters.product.twoLvlGroupProduct.length > 0
                  ? extractedFilters.product.twoLvlGroupProduct
                  : baseFilters.product.twoLvlGroupProduct,
              threeLvlGroupProduct:
                extractedFilters.product.threeLvlGroupProduct.length > 0
                  ? extractedFilters.product.threeLvlGroupProduct
                  : baseFilters.product.threeLvlGroupProduct,
            },
          };
        } else {
          // Если строки не выбраны -> используем базовые фильтры (все строки)
          mergedFilters = {
            ...baseFilters,
            filterDate: payload.filters.filterDate,
            filterTime: payload.filters.filterTime,
          };
        }

        // Используем новый показатель в values
        const newValues = [parentIndicator];

        // Запрашиваем только график
        getGraph({
          ...payload,
          filters: mergedFilters,
          groups: [dateFilterValue],
          values: newValues,
        }).then((response) => {
          if (response) {
            setGraph(response);
            if (newValues[0]) {
              setSelectedIndicator(newValues[0]);
            }
          }
        });
      }
    },
    [
      indicators,
      uniques,
      getApiPayload,
      getGraph,
      setGraph,
      graph,
      table,
      total,
      dateFilterValue,
      selectedRows,
      tab,
    ],
  );

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
      const payload = getApiPayload();

      const requestKey = JSON.stringify({
        startRow,
        endRow,
        sortModel,
        filterDate: JSON.stringify(allData.filters.filterDate),
        filterTime: JSON.stringify(allData.filters.filterTime),
        values: payload.values,
        groups: payload.groups,
        filters: payload.filters,
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

      const sorts =
        sortModel.length > 0
          ? { colId: [sortModel[0].colId], sort: sortModel[0].sort }
          : {
              colId: tab !== "write-off" ? [payload.values[0]] : ["costPrice"],
              sort: "desc" as "asc" | "desc",
            };

      const requestPromise =
        tab === "write-off"
          ? getWriteOffTable({
              ...payload,
              filters: {
                ...payload.filters,
              },
              offset: startRow,
              limit: endRow - startRow,
              sorts: sorts,
              groups: payload.groups,
            })
          : getTable({
              ...payload,
              filters: {
                ...payload.filters,
              },
              offset: startRow,
              limit: endRow - startRow,
              sorts: sorts,
              groups: payload.groups,
            });

      requestCache.current[requestKey] = requestPromise;
      lastRequestKey.current = requestKey;

      bumpGraphVersion();
      return requestPromise;
    },
    [
      getTable,
      getWriteOffTable,
      initialRows,
      initialTotalRows,
      getApiPayload,
      allData.filters,
      tab,
    ],
  );

  const handleClearFilters = () => {
    bumpGraphVersion();
    resetAllFilters();
    clearAll();
    requestCache.current = {}; // Полная очистка кэша
    lastRequestKey.current = "";
    bumpDataVersion();
    setSelectedRows([]);
  };

  useEffect(() => {
    setSelectedRows([]);
    requestCache.current = {};
    lastRequestKey.current = "";
    bumpDataVersion();
  }, [allData.filters, bumpDataVersion]);

  useEffect(() => {
    setSelectedIndicator(null);
  }, [graphVersion]);

  const { isGraphLoading, isTableLoading, isTotalLoading } = useForestStore();
  const isMobile = useIsMobile();
  const isLoading = isGraphLoading || isTableLoading || isTotalLoading;

  const showCheckbox = useMemo(() => {
    return [
      //"city",
      //"store",
      //"region",
      //"group",
      //"oneLvlGroupProduct",
      //"twoLvlGroupProduct",
      //"threeLvlGroupProduct",
      //"dishMeasureUnit",
      "product",
    ].some((item) => allData.groups.includes(item));
  }, [allData.groups]);

  return (
    <>
      <Sheet />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:max-h-screen">
        <Header
          title="Проект Лес"
          actions={{
            right: !isMobile && (
              <div className="flex flex-row gap-2">
                <DownloadForest rows={table?.totalRows || 0} tab={tab} />
                {/*<SaveReport />
                <SavedReports />*/}
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background flex flex-col h-[calc(100vh-124px)] max-md:h-full gap-4 max-md:gap-2 p-4">
          {isMobile && (
            <div className="w-full flex flex-row gap-2 justify-between">
              <DownloadForest rows={table?.totalRows || 0} tab={tab} />
              {/*<SaveReport />
              <SavedReports />*/}
              <DateDropdown />
              <Button
                className="w-fit"
                size="default"
                variant="outline"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Cog className="text-primary/80" />
              </Button>
              <Button
                size="default"
                onClick={() => {
                  handleClearFilters();
                  setIsFiltersOpen(true);
                }}
                variant="outline"
              >
                <Eraser className="text-primary/80" />
              </Button>
            </div>
          )}
          <div
            className={cn(
              "flex gap-2 md:max-h-[40vh] max-md:flex-col",
              isFiltersOpen ? "md:flex-col" : "md:flex-row",
            )}
          >
            <div className="flex flex-col gap-2 w-full">
              {!isMobile && (
                <div className="flex flex-row gap-1 items-center justify-between flex-1 w-full! shrink-0">
                  <div className="flex flex-row gap-1 items-center justify-end w-full">
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
                    {selectedRows.length > 0 && (
                      <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-md">
                        <span className="text-sm font-medium">
                          Выбрано: {selectedRows.length}
                        </span>
                        <Button
                          onClick={() => {
                            setSelectedRows([]);
                            // Восстанавливаем начальный график
                            if (initialFiltersRef.current) {
                              setGraph(initialFiltersRef.current.graph);
                              bumpGraphVersion();
                            }
                          }}
                          size="sm"
                          variant="ghost"
                          className="p-1 h-6 w-6"
                        >
                          <X className="size-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {graph && !isFiltersOpen ? (
                <StackedLine
                  className="max-md:min-h-80"
                  option={{
                    title: {
                      text:
                        getLabelByValue(
                          indicators,
                          selectedIndicator || allData.values[0],
                        ) ||
                        getLabelByValue(
                          uniques,
                          selectedIndicator || allData.values[0],
                        ),
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
            <ForestCards isFiltersOpen={isFiltersOpen} graph={graph} />
          </div>
          {table && total ? (
            <InfinityTable
              maxRows={table.totalRows}
              fetchData={fetchData as any}
              totalData={
                Array.isArray(total)
                  ? total
                  : (total as any)?.data
                    ? (total as any).data
                    : [total]
              }
              onCellClick={handleCellClick}
              onSelectionChange={handleSelectionChange}
              selectedRows={selectedRows}
              dataVersion={dataVersion}
              showCheckbox={showCheckbox && tab !== "write-off"}
              className="w-full"
            />
          ) : (
            <div
              className={cn(
                isLoading ? "mb-[25%]" : "mb-[10%]",
                "flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-end",
              )}
            >
              {!isLoading ? (
                error ? (
                  <NotFoundFiltersNY />
                ) : (
                  <NotSelectedFiltersNY />
                )
              ) : (
                <Spinner />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Forest;
