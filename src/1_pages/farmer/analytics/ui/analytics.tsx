import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import { Header } from "@widgets/header";
import { Sheet } from "@widgets/farmer/analytics/sheet";
import { useCallback, useEffect, useRef, useState, type FC } from "react";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { useFarmerAnalyticsStore } from "@widgets/farmer/analytics/sheet/model/analytics-store";
import FiltersAccordeon from "./filters";
import { Button } from "@shared/ui/button";
import { Cog, Eraser, X } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { cn } from "@shared/lib/utils";
import DateDropdown from "./date-dropdown";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { useReport } from "@entities/report/model/api/filters/data/controller";
import InfinityTable from "./table/infinite-table";
import { create } from "zustand";
import { getLabelByValue } from "./values-badges";
import { useIndicatorList } from "@widgets/farmer/analytics/sheet/ui/side/indicators-filter";
import { useUniqueValues } from "@widgets/farmer/analytics/sheet/ui/side/uniques-filter";
import { useDateFilterStore } from "./date-dropdown";
import Spinner from "@shared/ui/spinner";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { DownloadFarmer } from "@features/farmer/download";
import { useTabStore } from "@widgets/farmer/analytics/sheet/model/url-store";
import NotSelectedFiltersNY from "@shared/assets/capibara/not-selected-filters-new-year";
import NotFoundFiltersNY from "@shared/assets/capibara/not-found-filters-new-year";

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

const FarmerAnalytics: FC = () => {
  const { value: dateFilterValue } = useDateFilterStore();
  const requestCache = useRef<RequestCache>({});
  const lastRequestKey = useRef<string>("");
  const { getApiPayload, updateIndicators, updateUniques } = useFiltersStore();
  const allData = getApiPayload();
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(
    null,
  );
  const { tab } = useTabStore();
  const prepareLine = usePreparedStackedLine();
  const { graph, table, total, clearAll, error, setGraph } =
    useFarmerAnalyticsStore();
  const { getTable, getGraph } = useReport();
  const { table: initialRows, total: initialTotalRows } =
    useFarmerAnalyticsStore();
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

  const handleSelectionChange = useCallback(
    (newSelectedRows: any[]) => {
      // Сравниваем, изменился ли выбор реально, чтобы избежать лишних запросов

      setSelectedRows(newSelectedRows);

      // Если нет выбранных строк, восстанавливаем начальный график
      if (newSelectedRows.length === 0 && initialFiltersRef.current) {
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
            setSelectedIndicator(null);
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
      // Запрашиваем график
      getGraph({
        ...payload,
        filterDate: {
          dateStart: payload.filterDate.dateStart,
          dateEnd: payload.filterDate.dateEnd,
        },
        filters: mergedFilters,
        groups: [dateFilterValue],
        values: payload.values,
      }).then((response) => {
        if (response) {
          setGraph(response);
          setSelectedIndicator(payload.values[0]);
        }
      });
    },
    [getApiPayload, getGraph, setGraph, dateFilterValue],
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

        const payload = getApiPayload();

        // Используем начальные фильтры как базу, если они есть
        const baseFilters = initialFiltersRef.current
          ? initialFiltersRef.current.filters
          : payload.filters;

        let mergedFilters;

        if (selectedRows.length > 0) {
          // Если есть выбранные строки, фильтруем по ним
          const extractedFilters = extractFiltersFromRow(
            info.rowData,
            selectedRows,
          );

          mergedFilters = {
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
              storeCondition:
                extractedFilters.store.storeCondition.length > 0
                  ? extractedFilters.store.storeCondition
                  : baseFilters.store.storeCondition,
              ageGroup:
                extractedFilters.store.ageGroup.length > 0
                  ? extractedFilters.store.ageGroup
                  : baseFilters.store.ageGroup,
              channel:
                extractedFilters.store.channel.length > 0
                  ? extractedFilters.store.channel
                  : baseFilters.store.channel,
            },
            product: {
              ...baseFilters.product,
              idProduct:
                extractedFilters.product.idProduct.length > 0
                  ? extractedFilters.product.idProduct
                  : baseFilters.product.idProduct,
              idGroupMain:
                extractedFilters.product.idGroupMain.length > 0
                  ? extractedFilters.product.idGroupMain
                  : baseFilters.product.idGroupMain,
              groupFranchise:
                extractedFilters.product.groupFranchise.length > 0
                  ? extractedFilters.product.groupFranchise
                  : baseFilters.product.groupFranchise,
              subGroups:
                extractedFilters.product.subGroups.length > 0
                  ? extractedFilters.product.subGroups
                  : baseFilters.product.subGroups,
              subSubGroups:
                extractedFilters.product.subSubGroups.length > 0
                  ? extractedFilters.product.subSubGroups
                  : baseFilters.product.subSubGroups,
              typeProducts:
                extractedFilters.product.typeProducts.length > 0
                  ? extractedFilters.product.typeProducts
                  : baseFilters.product.typeProducts,
              teamProducts:
                extractedFilters.product.teamProducts.length > 0
                  ? extractedFilters.product.teamProducts
                  : baseFilters.product.teamProducts,
              directionProducts:
                extractedFilters.product.directionProducts.length > 0
                  ? extractedFilters.product.directionProducts
                  : baseFilters.product.directionProducts,
              groupsEconomist:
                extractedFilters.product.groupsEconomist.length > 0
                  ? extractedFilters.product.groupsEconomist
                  : baseFilters.product.groupsEconomist,
              seasonalityProducts:
                extractedFilters.product.seasonalityProducts.length > 0
                  ? extractedFilters.product.seasonalityProducts
                  : baseFilters.product.seasonalityProducts,
              managerAuto:
                extractedFilters.product.managerAuto.length > 0
                  ? extractedFilters.product.managerAuto
                  : baseFilters.product.managerAuto,
            },
            check: {
              ...baseFilters.check,
              tabNumber:
                extractedFilters.check.tabNumber.length > 0
                  ? extractedFilters.check.tabNumber
                  : baseFilters.check.tabNumber,
              cashBox:
                extractedFilters.check.cashBox.length > 0
                  ? extractedFilters.check.cashBox
                  : baseFilters.check.cashBox,
              idCheck:
                extractedFilters.check.idCheck.length > 0
                  ? extractedFilters.check.idCheck
                  : baseFilters.check.idCheck,
              type:
                extractedFilters.check.type.length > 0
                  ? extractedFilters.check.type
                  : baseFilters.check.type,
            },
            loyal: {
              ...baseFilters.loyal,
              cardNumber:
                extractedFilters.loyal.cardNumber.length > 0
                  ? extractedFilters.loyal.cardNumber
                  : baseFilters.loyal.cardNumber,
              sex:
                extractedFilters.loyal.sex.length > 0
                  ? extractedFilters.loyal.sex
                  : baseFilters.loyal.sex,
              colorsDiscount:
                extractedFilters.loyal.colorsDiscount &&
                extractedFilters.loyal.colorsDiscount.length > 0
                  ? extractedFilters.loyal.colorsDiscount
                  : baseFilters.loyal.colorsDiscount || [],
              ageStart:
                baseFilters.loyal.ageStart === 0 &&
                baseFilters.loyal.ageEnd === 100
                  ? null
                  : baseFilters.loyal.ageStart,
              ageEnd:
                baseFilters.loyal.ageStart === 0 &&
                baseFilters.loyal.ageEnd === 100
                  ? null
                  : baseFilters.loyal.ageEnd,
            },
            onlineStore: {
              ...baseFilters.onlineStore,
              imTypeOrder:
                extractedFilters.onlineStore.imTypeOrder.length > 0
                  ? extractedFilters.onlineStore.imTypeOrder
                  : baseFilters.onlineStore.imTypeOrder,
              imDeliveryMethod:
                extractedFilters.onlineStore.imDeliveryMethod.length > 0
                  ? extractedFilters.onlineStore.imDeliveryMethod
                  : baseFilters.onlineStore.imDeliveryMethod,
              imPaymentMethod:
                extractedFilters.onlineStore.imPaymentMethod.length > 0
                  ? extractedFilters.onlineStore.imPaymentMethod
                  : baseFilters.onlineStore.imPaymentMethod,
              imStatusOrder:
                extractedFilters.onlineStore.imStatusOrder.length > 0
                  ? extractedFilters.onlineStore.imStatusOrder
                  : baseFilters.onlineStore.imStatusOrder,
              imPromo:
                extractedFilters.onlineStore.imPromo.length > 0
                  ? extractedFilters.onlineStore.imPromo
                  : baseFilters.onlineStore.imPromo,
              imReceiveInterval:
                extractedFilters.onlineStore.imReceiveInterval.length > 0
                  ? extractedFilters.onlineStore.imReceiveInterval
                  : baseFilters.onlineStore.imReceiveInterval,
            },
          };
        } else {
          // Если НЕТ выбранных строк, используем БАЗОВЫЕ фильтры (все строки)
          mergedFilters = {
            ...baseFilters,
            // Для loyal нужно перенести логику ageStart/ageEnd
            loyal: {
              ...baseFilters.loyal,
              ageStart:
                baseFilters.loyal.ageStart === 0 &&
                baseFilters.loyal.ageEnd === 100
                  ? null
                  : baseFilters.loyal.ageStart,
              ageEnd:
                baseFilters.loyal.ageStart === 0 &&
                baseFilters.loyal.ageEnd === 100
                  ? null
                  : baseFilters.loyal.ageEnd,
            },
          };
        }

        // Используем новый показатель в values
        const newValues = [parentIndicator];

        // Запрашиваем только график
        getGraph({
          ...payload,
          filterDate: {
            dateStart: payload.filterDate.dateStart,
            dateEnd: payload.filterDate.dateEnd,
          },
          filters: mergedFilters,
          groups: [dateFilterValue], // Используем значение из DateFilterStore
          values: newValues,
        }).then((response) => {
          if (response) {
            setGraph(response);
            console.log(newValues[0]);
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
      updateIndicators,
      updateUniques,
      getApiPayload,
      getGraph,
      setGraph,
      graph,
      table,
      total,
      dateFilterValue,
      selectedRows,
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

      setSelectedIndicator(null);
      return requestPromise;
    },
    [getTable, initialRows, initialTotalRows, getApiPayload, allData.filters],
  );

  const handleClearFilters = () => {
    setSelectedIndicator(null);
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

  const { isGraphLoading, isTableLoading, isTotalLoading } =
    useFarmerAnalyticsStore();
  const isMobile = useIsMobile();
  const isLoading = isGraphLoading || isTableLoading || isTotalLoading;

  return (
    <>
      <Sheet />
      <div className="bg-muted w-full p-2 flex flex-col gap-2 md:max-h-screen">
        <Header
          title="Аналитика"
          actions={{
            right: !isMobile && (
              <div className="flex flex-row gap-2">
                <DownloadFarmer rows={table?.totalRows || 0} />
              </div>
            ),
          }}
        />
        <div className="rounded-3xl bg-background flex flex-col h-full gap-4 max-md:gap-2 max-md:pb-4 max-md:*:px-4 max-md:*:first:px-0 max-md:*:last:px-0 md:p-4">
          {isMobile && (
            <div className="w-full flex flex-col gap-2">
              <div className="w-full flex flex-row gap-2 justify-between px-4 pt-2">
                <DownloadFarmer rows={table?.totalRows || 0} />
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
                              setSelectedIndicator(null);
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
                  className="min-h-80"
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
          </div>
          {table && total ? (
            <InfinityTable
              maxRows={table.totalRows}
              fetchData={fetchData as any}
              totalData={total as any}
              onCellClick={handleCellClick}
              onSelectionChange={handleSelectionChange}
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

export default FarmerAnalytics;
