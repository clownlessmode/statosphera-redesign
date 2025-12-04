import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/forest/sheet";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import { useForestStore } from "@widgets/forest/sheet/model/forest-store";
import FiltersAccordeon from "./filters";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@shared/lib/utils";
import DateDropdown from "./date-dropdown";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { DownloadReport } from "@features/reports/download";
import { useForest } from "@entities/forest/model/api/filters/data/controller";
import InfinityTable from "./table/infinite-table";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";
import { create } from "zustand";
import ForestCards from "./forest-cards";
import { getLabelByValue } from "./values-badges";
import { useIndicatorList } from "@widgets/forest/sheet/ui/side/indicators-filter";
import { useUniqueValues } from "@widgets/forest/sheet/ui/side/uniques-filter";
import { SavedReports } from "@features/reports/saved-reports";
import { SaveReport } from "@features/reports/save-report";
import { useDateFilterStore } from "./date-dropdown";
import Spinner from "@shared/ui/spinner";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useWriteOffController } from "@entities/forest/model/api/filters/data-write-off/controller";

function extractFiltersFromRow(_row: any, selectedRows: any[]) {
  const filters = {
    store: {
      idStore: [],
      idCity: [],
      idRegion: [],
    },
    product: {
      idProduct: [],
      idGroupProduct: [],
      oneLvlGroupProduct: [],
      twoLvlGroupProduct: [],
      threeLvlGroupProduct: [],
      dishMeasureUnit: [],
    },
    check: {
      typePayment: [],
      discountType: [],
    },
  };

  const mapping: Record<string, string[]> = {
    // Store
    id_store: filters.store.idStore,
    id_city: filters.store.idCity,
    id_region: filters.store.idRegion,

    // Product
    id_product: filters.product.idProduct,
    group_id: filters.product.idGroupProduct,
    idSubGroups: filters.product.oneLvlGroupProduct,
    idSubSubGroups: filters.product.twoLvlGroupProduct,
    idSubSubSubGroups: filters.product.threeLvlGroupProduct,

    // Check
    typePayment: filters.check.typePayment,
    discountType: filters.check.discountType,
  };

  for (const currentRow of selectedRows) {
    for (const [rowKey, targetArray] of Object.entries(mapping)) {
      const value = currentRow[rowKey];
      if (value && !targetArray.includes(value)) {
        targetArray.push(value);
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

const Forest: FC = () => {
  const { value: dateFilterValue } = useDateFilterStore();
  const requestCache = useRef<RequestCache>({});
  const lastRequestKey = useRef<string>("");
  const { getApiPayload } = useFiltersStore();
  const allData = getApiPayload();
  console.log("allData:", allData);
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
    if (!initialFiltersRef.current && graph && table && total) {
      initialFiltersRef.current = {
        filters: JSON.parse(JSON.stringify(allData.filters)),
        values: [...allData.values],
        groups: [dateFilterValue],
        graph: graph,
      };
    }
  }, [graph, table, total, allData.filters, allData.values]);

  const handleRowClick = useCallback(
    (rowData: any) => {
      // Проверяем, есть ли уже эта строка в выбранных
      const isRowSelected = selectedRows.some(
        (row) =>
          // Сравниваем по нескольким ключевым полям
          row.id_store === rowData.id_store &&
          row.id_product === rowData.id_product &&
          row.id_city === rowData.id_city,
      );

      let newSelectedRows;
      if (isRowSelected) {
        // Убираем строку из выбранных
        newSelectedRows = selectedRows.filter(
          (row) =>
            !(
              row.id_store === rowData.id_store &&
              row.id_product === rowData.id_product &&
              row.id_city === rowData.id_city
            ),
        );
      } else {
        // Добавляем строку к выбранным
        newSelectedRows = [...selectedRows, rowData];
      }

      setSelectedRows(newSelectedRows);

      // Если нет выбранных строк, восстанавливаем начальный график
      if (newSelectedRows.length === 0 && initialFiltersRef.current) {
        // Делаем новый запрос с начальными фильтрами, но текущей группировкой
        const payload = getApiPayload();
        getGraph({
          ...payload,
          filters: initialFiltersRef.current.filters,
          groups: [dateFilterValue],
          values: initialFiltersRef.current.values,
        }).then((response) => {
          if (response) {
            setGraph(response);
          }
        });
        return;
      }

      // Извлекаем фильтры из всех выбранных строк
      const extractedFilters = extractFiltersFromRow(rowData, newSelectedRows);

      // Делаем запрос за новыми данными для графика с извлеченными фильтрами
      const payload = getApiPayload();

      // Создаем новые фильтры, объединяя текущие с извлеченными
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
          idGroupProduct:
            extractedFilters.product.idGroupProduct.length > 0
              ? extractedFilters.product.idGroupProduct
              : payload.filters.product.idGroupProduct,
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
          dishMeasureUnit:
            extractedFilters.product.dishMeasureUnit.length > 0
              ? extractedFilters.product.dishMeasureUnit
              : payload.filters.product.dishMeasureUnit,
        },
      };

      // Запрашиваем только график с новыми фильтрами
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
        }
      });
    },
    [
      selectedRows,
      getApiPayload,
      getGraph,
      getWriteOffGraph,
      setGraph,
      dateFilterValue,
    ], // Добавляем в зависимости
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

        // Извлекаем фильтры из строки, на которую кликнули
        const extractedFilters = extractFiltersFromRow(info.rowData, [
          info.rowData,
        ]);

        // Делаем запрос за новыми данными для графика
        const payload = getApiPayload();

        // Используем начальные фильтры как базу, если они есть
        const baseFilters = initialFiltersRef.current
          ? initialFiltersRef.current.filters
          : payload.filters;

        // Создаем новые фильтры, объединяя начальные с извлеченными из строки
        const mergedFilters = {
          ...baseFilters,
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
            dishMeasureUnit:
              extractedFilters.product.dishMeasureUnit.length > 0
                ? extractedFilters.product.dishMeasureUnit
                : baseFilters.product.dishMeasureUnit,
          },
          check: {
            ...baseFilters.check,
            typePayment:
              extractedFilters.check.typePayment.length > 0
                ? extractedFilters.check.typePayment
                : baseFilters.check.typePayment,
            discountType:
              extractedFilters.check.discountType.length > 0
                ? extractedFilters.check.discountType
                : baseFilters.check.discountType,
          },
          //loyal: {
          //  ...baseFilters.loyal,
          //  cardNumber:
          //    extractedFilters.loyal.cardNumber.length > 0
          //      ? extractedFilters.loyal.cardNumber
          //      : baseFilters.loyal.cardNumber,
          //  sex:
          //    extractedFilters.loyal.sex.length > 0
          //      ? extractedFilters.loyal.sex
          //      : baseFilters.loyal.sex,
          //  colorsDiscount:
          //    extractedFilters.loyal.colorsDiscount &&
          //    extractedFilters.loyal.colorsDiscount.length > 0
          //      ? extractedFilters.loyal.colorsDiscount
          //      : baseFilters.loyal.colorsDiscount || [],
          //  ageStart:
          //    baseFilters.loyal.ageStart === 0 &&
          //    baseFilters.loyal.ageEnd === 100
          //      ? null
          //      : baseFilters.loyal.ageStart,
          //  ageEnd:
          //    baseFilters.loyal.ageStart === 0 &&
          //    baseFilters.loyal.ageEnd === 100
          //      ? null
          //      : baseFilters.loyal.ageEnd,
          //},
        };

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
          }
        });
      } else {
        // Если кликнули не на показатель, вызываем обработчик строки
        handleRowClick(info.rowData);
      }
    },
    [
      indicators,
      uniques,
      getApiPayload,
      getGraph,
      setGraph,
      handleRowClick,
      graph,
      table,
      total,
      dateFilterValue, // Добавляем в зависимости
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

      return requestPromise;
    },
    [
      getTable,
      getWriteOffTable,
      initialRows,
      initialTotalRows,
      getApiPayload,
      allData.filters,
    ],
  );

  const handleClearFilters = () => {
    resetAllFilters();
    clearAll();
    requestCache.current = {}; // Полная очистка кэша
    lastRequestKey.current = "";
    bumpDataVersion();
  };
  useEffect(() => {
    requestCache.current = {};
    lastRequestKey.current = "";
    bumpDataVersion();
  }, [allData.filters, bumpDataVersion]);

  const { isGraphLoading, isTableLoading, isTotalLoading } = useForestStore();
  const isMobile = useIsMobile();
  const isLoading = isGraphLoading || isTableLoading || isTotalLoading;

  return (
    <>
      <Sheet />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:max-h-screen">
        <Header
          title="Проект Лес"
          actions={{
            right: !isMobile && (
              <div className="flex flex-row gap-2">
                <DownloadReport rows={table?.totalRows || 0} />
                <SaveReport />
                <SavedReports />
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background flex flex-col h-full gap-4 max-md:gap-2 p-4">
          {isMobile && (
            <div className="w-full flex flex-row gap-2 justify-between">
              <DownloadReport rows={table?.totalRows || 0} />
              <SaveReport />
              <SavedReports />
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
                        getLabelByValue(indicators, allData.values[0]) ||
                        getLabelByValue(uniques, allData.values[0]),
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
              totalData={total as any}
              onCellClick={handleCellClick}
              onRowClick={handleRowClick}
              selectedRows={selectedRows}
              dataVersion={dataVersion}
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
                  <NotFoundFilters />
                ) : (
                  <NotSelectedFilters />
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
