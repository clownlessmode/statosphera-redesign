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
import { Cog, Eraser, X } from "lucide-react";
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
import { getLabelByValue } from "./values-badges";
import { useIndicatorList } from "@widgets/report/sheet/ui/side/indicators-filter";
import { useUniqueValues } from "@widgets/report/sheet/ui/side/uniques-filter";
import { SavedReports } from "@features/reports/saved-reports";
import { SaveReport } from "@features/reports/save-report";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { useDateFilterStore } from "./date-dropdown";
import Spinner from "@shared/ui/spinner";
import { useIsMobile } from "@shared/hooks/use-mobile";
// import { useNavigate } from "react-router";
function extractFiltersFromRow(_row: any, selectedRows: any[]) {
  const filters: any = {
    store: {
      idStore: [],
      idCity: [],
      idRegion: [],
      storeCondition: [],
      ageGroup: [],
      channel: [],
    },
    product: {
      idProduct: [],
      idGroupMain: [],
      groupFranchise: [],
      subGroups: [],
      subSubGroups: [],
      typeProducts: [],
      teamProducts: [],
      directionProducts: [],
      groupsEconomist: [],
      seasonalityProducts: [],
      managerAuto: [],
    },
    check: {
      tabNumber: [],
      cashBox: [],
      idCheck: [],
      type: [],
    },
    loyal: {
      cardNumber: [],
      sex: [],
    },
    onlineStore: {
      imTypeOrder: [],
      imDeliveryMethod: [],
      imPaymentMethod: [],
      imStatusOrder: [],
      imPromo: [],
      imReceiveInterval: [],
    },
  };
  for (const currentRow of selectedRows) {
    if (
      currentRow.id_store &&
      !filters.store.idStore.includes(currentRow.id_store)
    ) {
      filters.store.idStore.push(currentRow.id_store);
    }
    if (
      currentRow.id_city &&
      !filters.store.idCity.includes(currentRow.id_city)
    ) {
      filters.store.idCity.push(currentRow.id_city);
    }
    if (
      currentRow.id_region &&
      !filters.store.idRegion.includes(currentRow.id_region)
    ) {
      filters.store.idRegion.push(currentRow.id_region);
    }
    if (
      currentRow.storeCondition &&
      !filters.store.storeCondition.includes(currentRow.storeCondition)
    ) {
      filters.store.storeCondition.push(currentRow.storeCondition);
    }
    if (
      currentRow.ageGroup &&
      !filters.store.ageGroup.includes(currentRow.ageGroup)
    ) {
      filters.store.ageGroup.push(currentRow.ageGroup);
    }
    if (
      currentRow.channel &&
      !filters.store.channel.includes(currentRow.channel)
    ) {
      filters.store.channel.push(currentRow.channel);
    }
    if (
      currentRow.id_product &&
      !filters.product.idProduct.includes(currentRow.id_product)
    ) {
      filters.product.idProduct.push(currentRow.id_product);
    }
    if (
      currentRow.group_id &&
      !filters.product.idGroupMain.includes(currentRow.group_id)
    ) {
      filters.product.idGroupMain.push(currentRow.group_id);
    }
    if (
      currentRow.idGroupsFranchise &&
      !filters.product.groupFranchise.includes(currentRow.idGroupsFranchise)
    ) {
      filters.product.groupFranchise.push(currentRow.idGroupsFranchise);
    }
    if (
      currentRow.idSubGroups &&
      !filters.product.subGroups.includes(currentRow.idSubGroups)
    ) {
      filters.product.subGroups.push(currentRow.idSubGroups);
    }
    if (
      currentRow.idSubSubGroups &&
      !filters.product.subSubGroups.includes(currentRow.idSubSubGroups)
    ) {
      filters.product.subSubGroups.push(currentRow.idSubSubGroups);
    }
    if (
      currentRow.idTypeProducts &&
      !filters.product.typeProducts.includes(currentRow.idTypeProducts)
    ) {
      filters.product.typeProducts.push(currentRow.idTypeProducts);
    }
    if (
      currentRow.idTeamProducts &&
      !filters.product.teamProducts.includes(currentRow.idTeamProducts)
    ) {
      filters.product.teamProducts.push(currentRow.idTeamProducts);
    }
    if (
      currentRow.idDirectionProducts &&
      !filters.product.directionProducts.includes(
        currentRow.idDirectionProducts,
      )
    ) {
      filters.product.directionProducts.push(currentRow.idDirectionProducts);
    }
    if (
      currentRow.idGroupsEconomist &&
      !filters.product.groupsEconomist.includes(currentRow.idGroupsEconomist)
    ) {
      filters.product.groupsEconomist.push(currentRow.idGroupsEconomist);
    }
    if (
      currentRow.idSeasonalityProducts &&
      !filters.product.seasonalityProducts.includes(
        currentRow.idSeasonalityProducts,
      )
    ) {
      filters.product.seasonalityProducts.push(
        currentRow.idSeasonalityProducts,
      );
    }
    if (
      currentRow.idManagerAuto &&
      !filters.product.managerAuto.includes(currentRow.idManagerAuto)
    ) {
      filters.product.managerAuto.push(currentRow.idManagerAuto);
    }
    if (
      currentRow.tabNumber &&
      !filters.check.tabNumber.includes(currentRow.tabNumber)
    ) {
      filters.check.tabNumber.push(currentRow.tabNumber);
    }
    if (
      currentRow.cashBox &&
      !filters.check.cashBox.includes(currentRow.cashBox)
    ) {
      filters.check.cashBox.push(currentRow.cashBox);
    }
    if (
      currentRow.idCheck &&
      !filters.check.idCheck.includes(currentRow.idCheck)
    ) {
      filters.check.idCheck.push(currentRow.idCheck);
    }
    if (currentRow.type && !filters.check.type.includes(currentRow.type)) {
      filters.check.type.push(currentRow.type);
    }
    if (
      currentRow.colorsDiscount &&
      !filters.loyal.colorsDiscount.includes(currentRow.colorsDiscount)
    ) {
      filters.loyal.colorsDiscount.push(currentRow.colorsDiscount);
    }
    if (
      currentRow.cardNumber &&
      !filters.loyal.cardNumber.includes(currentRow.cardNumber)
    ) {
      filters.loyal.cardNumber.push(currentRow.cardNumber);
    }
    if (
      currentRow.sexLoyal &&
      !filters.loyal.sex.includes(currentRow.sexLoyal)
    ) {
      filters.loyal.sex.push(currentRow.sexLoyal);
    }
    if (
      currentRow.imTypeOrder &&
      !filters.onlineStore.imTypeOrder.includes(currentRow.imTypeOrder)
    ) {
      filters.onlineStore.imTypeOrder.push(currentRow.imTypeOrder);
    }
    if (
      currentRow.imDeliveryMethod &&
      !filters.onlineStore.imDeliveryMethod.includes(
        currentRow.imDeliveryMethod,
      )
    ) {
      filters.onlineStore.imDeliveryMethod.push(currentRow.imDeliveryMethod);
    }
    if (
      currentRow.imPaymentMethod &&
      !filters.onlineStore.imPaymentMethod.includes(currentRow.imPaymentMethod)
    ) {
      filters.onlineStore.imPaymentMethod.push(currentRow.imPaymentMethod);
    }
    if (
      currentRow.imStatusOrder &&
      !filters.onlineStore.imStatusOrder.includes(currentRow.imStatusOrder)
    ) {
      filters.onlineStore.imStatusOrder.push(currentRow.imStatusOrder);
    }
    if (
      currentRow.imPromo &&
      !filters.onlineStore.imPromo.includes(currentRow.imPromo)
    ) {
      filters.onlineStore.imPromo.push(currentRow.imPromo);
    }
    if (
      currentRow.imReceiveInterval &&
      !filters.onlineStore.imReceiveInterval.includes(
        currentRow.imReceiveInterval,
      )
    ) {
      filters.onlineStore.imReceiveInterval.push(currentRow.imReceiveInterval);
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

const Report: FC = () => {
  const { value: dateFilterValue } = useDateFilterStore();
  const requestCache = useRef<RequestCache>({});
  const lastRequestKey = useRef<string>("");
  const { getApiPayload, updateIndicators, updateUniques } = useFiltersStore();
  const allData = getApiPayload();

  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, error, setGraph } = useReportStore();
  const { getTable, getGraph } = useReport();
  const { table: initialRows, total: initialTotalRows } = useReportStore();
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
          filterDate: {
            dateStart: payload.filterDate.dateStart,
            dateEnd: payload.filterDate.dateEnd,
          },
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
          idGroupMain:
            extractedFilters.product.idGroupMain.length > 0
              ? extractedFilters.product.idGroupMain
              : payload.filters.product.idGroupMain,
        },
        loyal: {
          ...payload.filters.loyal,
          ageStart:
            payload.filters.loyal.ageStart === 0 &&
            payload.filters.loyal.ageEnd === 100
              ? null
              : payload.filters.loyal.ageStart,
          ageEnd:
            payload.filters.loyal.ageStart === 0 &&
            payload.filters.loyal.ageEnd === 100
              ? null
              : payload.filters.loyal.ageEnd,
        },
      };

      // Запрашиваем только график с новыми фильтрами
      getGraph({
        ...payload,
        filterDate: {
          dateStart: payload.filterDate.dateStart,
          dateEnd: payload.filterDate.dateEnd,
        },
        filters: mergedFilters,
        groups: [dateFilterValue], // Используем значение из DateFilterStore
        values: payload.values,
      }).then((response) => {
        if (response) {
          setGraph(response);
        }
      });
    },
    [selectedRows, getApiPayload, getGraph, setGraph, dateFilterValue], // Добавляем в зависимости
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

        // Обновляем показатели
        if (isFieldAnIndicator) {
          updateIndicators([parentIndicator]);
          updateUniques([]);
        } else {
          updateUniques([parentIndicator]);
          updateIndicators([]);
        }

        // Делаем запрос за новыми данными для графика
        const payload = getApiPayload();

        // Подготавливаем фильтры с корректной обработкой loyal
        const preparedFilters = {
          ...payload.filters,
          loyal: {
            ...payload.filters.loyal,
            ageStart:
              payload.filters.loyal.ageStart === 0 &&
              payload.filters.loyal.ageEnd === 100
                ? null
                : payload.filters.loyal.ageStart,
            ageEnd:
              payload.filters.loyal.ageStart === 0 &&
              payload.filters.loyal.ageEnd === 100
                ? null
                : payload.filters.loyal.ageEnd,
          },
        };

        // Запрашиваем только график
        getGraph({
          ...payload,
          filterDate: {
            dateStart: payload.filterDate.dateStart,
            dateEnd: payload.filterDate.dateEnd,
          },
          filters: preparedFilters,
          groups: [dateFilterValue], // Используем значение из DateFilterStore
          values: payload.values,
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
      updateIndicators,
      updateUniques,
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
    [getTable, initialRows, initialTotalRows, getApiPayload, allData.filters],
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

  const { isGraphLoading, isTableLoading, isTotalLoading } = useReportStore();
  const isMobile = useIsMobile();
  const isLoading = isGraphLoading || isTableLoading || isTotalLoading;

  return (
    <>
      <Sheet />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:max-h-screen">
        <Header
          title="Отчеты"
          actions={{
            right: !isMobile && (
              <div className="flex flex-row gap-2">
                <DownloadReport rows={table?.totalRows || 0} />
                <SaveReport />
                <SavedReports />
              </div>
            ),
            left: !isMobile && (
              <div className="ml-6 -mb-4 flex flex-row gap-1">
                <Button
                  variant="outline"
                  className="border-b-0! rounded-b-none!"
                >
                  {tab === "commerce" ? "Коммерческая" : "Чековая"}
                </Button>
                <Link to={ROUTES_PATH.WRITE_OFF}>
                  <Button
                    variant="outline"
                    className="border-b-0! rounded-b-none! opacity-50"
                  >
                    Списания
                  </Button>
                </Link>
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background flex flex-col h-full gap-4 max-md:pb-4 max-md:*:px-4 max-md:*:first:px-0 max-md:*:last:px-0 md:p-4">
          {isMobile && (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full h-full flex flex-row">
                <Button
                  variant="outline"
                  className="border-0 rounded-none! rounded-tl-3xl!  h-10 w-1/2 px-1"
                >
                  {tab === "commerce" ? "Коммерческая" : "Чековая"}
                </Button>
                <Link to={ROUTES_PATH.WRITE_OFF} className="w-1/2">
                  <Button
                    variant="outline"
                    className="opacity-50 border-0 border-b-1 border-l-1 rounded-none! rounded-tr-3xl! w-full h-10 px-1"
                  >
                    Списания
                  </Button>
                </Link>
              </div>
              <div className="w-full flex flex-row gap-2 justify-between px-4">
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
            <ReportCards isFiltersOpen={isFiltersOpen} graph={graph} />
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
              className="w-full max-md:mx-auto max-md:w-[calc(100%-32px)]"
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

export default Report;
