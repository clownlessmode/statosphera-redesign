import { Header } from "@widgets/header";
import SummaryFiltersSheet from "@widgets/summary/sheet/sheet";
import { NomenklaturaList } from "./nomenklatura-list";
import { Button } from "@shared/ui/button";
import { useSummaryController } from "../api/controller";
import { useSummaryFiltersStore } from "@widgets/summary/sheet/model/filters-store";
import { transformToComparisonCardsDto } from "../utils/transform-summary-dto";
import {
  useSummaryStore,
  useSelectedProductStore,
  useSummaryVersionStore,
} from "../model";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { SummaryCard } from "./summary-card";
import { SummaryCardSkeleton } from "./skeleton/summary-card-skeleton";
import { SummaryChartSkeleton } from "./skeleton/summary-chart-skeleton";
import { SummaryTableSkeleton } from "./skeleton/summary-table-skeleton";
import { Funnel, Info, X } from "lucide-react";
import { Card } from "@shared/ui/card";
import BarHorizontalChart from "@shared/ui/graphs/bar-horizontal-chart/bar-horizontal-chart";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useProduct } from "@widgets/report/sheet/ui/side/products-filter";
import { useNavigate, useSearchParams } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import NotSelectedFilters from "@shared/assets/capibara/not-selected-filters";
import NotFoundFilters from "@shared/assets/capibara/not-found-filters";
import { Dialog, DialogContent, DialogTrigger } from "@shared/ui/dialog";
import { Input } from "@shared/ui/input";
import { useTabStore } from "@widgets/summary/sheet/model/url-store";
import { PackageFilters } from "./package-filters";
import InfinityTable from "@pages/report/ui/table/infinite-table";
import pluralize from "@shared/lib/pluralize";
import { useIsMobile } from "@shared/hooks/use-mobile";

export const Summary = () => {
  const { getComparisonCards, getGraph } = useSummaryController();
  const { getApiPayload } = useSummaryFiltersStore();
  const { updateProductFilter, getApiPayload: getApiPayloadFilters } =
    useFiltersStore();
  const { cards, graph, setCards, setGraph, nomenklatura } = useSummaryStore();
  const { getTable } = useSummaryController();
  const packageFilter = useSummaryFiltersStore((state) => state.package);
  const { selectedProducts } = useSelectedProductStore();
  const [selectedTableRows, setSelectedTableRows] = useState<any[]>([]);
  const [modalSearchTerm, setModalSearchTerm] = useState<string>("");
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const { dataVersion, bumpDataVersion } = useSummaryVersionStore();

  // Ref для кэширования запросов таблицы
  const requestCache = useRef<Record<string, Promise<any>>>({});
  const lastRequestKey = useRef<string>("");

  // useEffect(() => {
  //   requestCache.current = {};
  //   lastRequestKey.current = "";
  // }, [dataVersion]);

  const handleGetComparisonCards = async (productIds: number[]) => {
    try {
      setIsLoadingData(true);

      const payload = getApiPayload();
      const dto = transformToComparisonCardsDto(payload, productIds);

      const cardsResponse = await getComparisonCards(dto);
      setCards(cardsResponse.total);

      const graphPayload = {
        ...payload,
        filters: {
          ...payload.filters,
          product: {
            ...payload.filters.product,
            idProduct: productIds.map((id) => id.toString()),
          },
        },
      };

      const graphResponse = await getGraph(graphPayload);
      setGraph(graphResponse);
    } catch (error) {
      console.error("❌ Error fetching comparison cards:", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Автоматический вызов запросов при выборе продукта
  useEffect(() => {
    // Очищаем данные сразу при смене продукта
    setCards(null);
    setGraph(null);
    setSelectedTableRows([]);
    setModalSearchTerm("");

    // Очищаем кэш таблицы при смене продукта
    requestCache.current = {};
    lastRequestKey.current = "";
    bumpDataVersion();

    if (selectedProducts.length > 0) {
      handleGetComparisonCards(selectedProducts);
    }
  }, [selectedProducts, packageFilter]);

  // Функция для получения данных таблицы с пагинацией
  const fetchTableData = useCallback(
    async ({
      startRow,
      endRow,
      sortModel = [],
    }: {
      startRow: number;
      endRow: number;
      sortModel?: { colId: string; sort: "asc" | "desc" }[];
    }) => {
      if (selectedProducts.length === 0) {
        return { data: [], totalRows: 0 };
      }

      const requestKey = JSON.stringify({
        startRow,
        endRow,
        sortModel,
        selectedProducts,
        payload: getApiPayload(),
      });

      // Проверяем кэш
      if (
        requestKey === lastRequestKey.current &&
        requestKey in requestCache.current
      ) {
        return await requestCache.current[requestKey];
      }

      const payload = getApiPayload();

      const tablePayload = {
        ...payload,
        filters: {
          ...payload.filters,
          product: {
            ...payload.filters.product,
            idProduct: selectedProducts.map((id) => id.toString()),
          },
        },
        limit: endRow - startRow,
        offset: startRow,
        ...(sortModel.length > 0 && {
          sorts: {
            sort: sortModel[0].sort,
            colId: [sortModel[0].colId],
          },
        }),
      };

      const requestPromise = getTable(tablePayload).then((response) => {
        const data = response.tbl || [];

        // Если с сервера пришел totalRows - используем его
        if (response.totalRows !== undefined && response.totalRows !== null) {
          return {
            data,
            totalRows: response.totalRows,
          };
        }

        // Fallback логика: если данных пришло меньше чем запрашивалось - это конец
        const requestedCount = endRow - startRow;
        const isLastPage = data.length < requestedCount;
        const actualTotalRows = isLastPage
          ? startRow + data.length // Точный конец данных
          : Math.max(startRow + data.length + 100, 1000); // Небольшой буфер для продолжения загрузки

        return {
          data,
          totalRows: actualTotalRows,
        };
      });

      requestCache.current[requestKey] = requestPromise;
      lastRequestKey.current = requestKey;

      return requestPromise;
    },
    [selectedProducts, getApiPayload, getTable],
  );

  const getDisplayName = useCallback((item: any) => {
    return (
      item.product || // Основное поле после трансформации
      item.product_name || // Fallback для обратной совместимости
      item.productName || // Альтернативное поле
      `Продукт ${item.id_product || item.idProduct || "без ID"}`
    );
  }, []);

  // Функция для получения названия типа выбранных элементов
  const getSelectedItemsLabel = useCallback(() => {
    return "продукты";
  }, []);

  // Обработчик выбора строк в таблице
  const handleTableRowSelection = (selectedRows: any[]) => {
    // Сохраняем полные объекты строк
    setSelectedTableRows(selectedRows);

    // Сбрасываем поиск в модалке при изменении выбора
    setModalSearchTerm("");
  };

  const payload = getApiPayloadFilters();
  const { handleOpenProductSelect } = useProduct(payload);
  const navigate = useNavigate();

  const handleGetMoreInfo = async ({ tab }: { tab: string }) => {
    if (!selectedTableRows || selectedTableRows.length === 0) {
      return;
    }

    // Загружаем опции продуктов и устанавливаем фильтр
    await handleOpenProductSelect(true);

    const productValues = selectedTableRows.map((row) => {
      const id = row.id_product || row.idProduct;
      return String(JSON.stringify(id));
    });

    updateProductFilter("idProduct", productValues);

    navigate(`${ROUTES_PATH.REPORT}?open=true&tab=${tab}`);
  };

  //Работа с графиком
  const barChartData = Array.isArray(graph) ? graph : [];

  const xAxisData = barChartData.map((item: any) => String(item.product_name));
  const yAxisData = barChartData.map((item: any) => item.checkCount);

  // Определяем, есть ли данные
  const hasNomenklatura = nomenklatura && nomenklatura.length > 0;
  const hasData = cards && cards.length > 0;
  const hasGraphData = barChartData && barChartData.length > 0;

  // Фильтрация выбранных продуктов в модалке
  const filteredSelectedRows = useMemo(() => {
    if (!selectedTableRows || selectedTableRows.length === 0) return [];

    const term = modalSearchTerm.trim().toLowerCase();
    if (!term) return selectedTableRows;

    const tokens = term.split(/\s+/).filter((t) => t.length > 1);
    return selectedTableRows.filter((row: any) => {
      // Получаем название продукта для поиска
      const productName = getDisplayName(row).toLowerCase();

      // Если нет токенов (короткий поиск), ищем точное вхождение
      if (tokens.length === 0) {
        return productName.includes(term);
      }

      // Проверяем, что все токены присутствуют
      const fullMatch = tokens.every((token) => productName.includes(token));
      if (fullMatch) return true;

      // Нечеткий поиск
      let idx = 0;
      for (let i = 0; i < term.length; i++) {
        const char = term[i];
        idx = productName.indexOf(char, idx);
        if (idx === -1) return false;
        idx++;
      }
      return true;
    });
  }, [selectedTableRows, modalSearchTerm, getDisplayName]);

  // Вызов таба с фильтрами
  const [searchParams, setSearchParams] = useSearchParams();
  const { setTargetViewValue } = useTabStore();

  const handleOpenSheet = () => {
    setTargetViewValue("summary");
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("open", "true");
    setSearchParams(newSearchParams, { replace: true });
  };

  const isMobile = useIsMobile();

  return (
    <>
      <SummaryFiltersSheet />
      <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header
          title="Парные продажи"
          actions={{
            left: !isMobile && <PackageFilters />,
          }}
        />
        <div className="rounded-3xl bg-background p-4 flex flex-col gap-4 flex-1 min-h-0">
          {isMobile && (
            <div className="flex flex-row w-full justify-between">
              <PackageFilters />
            </div>
          )}
          {!hasNomenklatura ? (
            <div className="flex flex-col gap-4 h-full w-full justify-center items-center">
              <div className="dark:opacity-70">
                <NotSelectedFilters />
              </div>

              <div className="opacity-100">
                <Button onClick={handleOpenSheet}>
                  Изменить фильтры <Funnel />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 h-screen overflow-y-auto scrollbar-hide md:min-h-0 flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-4 max-md:h-[50vh] md:min-h-0">
                <div className="flex-1 min-h-0">
                  <NomenklaturaList
                    onSelectedProductChange={(selectedProducts) => {
                      // Обновляем store с массивом выбранных продуктов
                      useSelectedProductStore
                        .getState()
                        .setSelectedProducts(selectedProducts);
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-2 md:min-h-0">
                {isLoadingData ? (
                  <>
                    <div className="flex flex-row gap-2 auto-rows-max h-fit">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <SummaryCardSkeleton key={index} />
                      ))}
                    </div>

                    <SummaryChartSkeleton />

                    <SummaryTableSkeleton />
                  </>
                ) : hasData ? (
                  <>
                    <div className="grid grid-cols-2 md:flex md:flex-row gap-2 md:auto-rows-max h-fit">
                      {cards.flatMap((card) => [
                        <SummaryCard
                          key={`total-${card.totalProceeds}`}
                          title="Общая выручка"
                          value={card.totalProceeds}
                          // icons={
                          //   <BadgeRussianRuble
                          //     color="#E50046"
                          //     className="w-4 h-4"
                          //   />
                          // }
                          trigger={<Info className="w-3 h-7" />}
                          text="Выручка по выбранной номенклатуре с учетом других товаров"
                        />,
                        <SummaryCard
                          key={`selected-${card.selectedProceeds}`}
                          title="Выбранная номенклатура"
                          value={card.selectedProceeds}
                          trigger={<Info className="w-3 h-3" />}
                          text="Выручка только по выбранной номенклатуре без учета других товаров"
                        />,
                        <SummaryCard
                          key={`count-${card.checkCount}`}
                          title="Количество чеков"
                          value={`${pluralize(card.checkCount, ["шт", "шт", "шт"])}`}
                          trigger={<Info className="w-3 h-3" />}
                          text="Количество чеков с выбранной номенклатурой"
                        />,
                        <SummaryCard
                          key={`avg-${card.avgCheck}`}
                          title="Средний чек"
                          value={card.avgCheck}
                          trigger={<Info className="w-3 h-3" />}
                          text="Средний чек по выбранной номенклатуре с входящими продуктами в чек"
                        />,
                      ])}
                    </div>
                    {hasGraphData || selectedProducts.length > 0 ? (
                      <>
                        {hasGraphData && (
                          <Card className="flex-1 md:pl-10 md:pr-20 md:py-0 md:max-h-[300px]">
                            <BarHorizontalChart
                              title="Количество чеков с продуктом"
                              labels={xAxisData}
                              values={yAxisData}
                              formatNumbers={true}
                              pluralForms={
                                //["Чек", "Чека", "Чеков"]
                                ["", "", ""]
                              }
                              formatter={(params: any) => {
                                return `${params.value}`;
                              }}
                            />
                          </Card>
                        )}

                        {selectedProducts.length > 0 && (
                          <>
                            <div className="flex-shrink-0 mb-0 gap-2 flex max-md:flex-wrap items-center">
                              {selectedTableRows.length > 0 && (
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline">
                                      Выбранные {getSelectedItemsLabel()}:{" "}
                                      {selectedTableRows.length}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="h-[80vh] flex flex-col">
                                    <div className="flex-shrink-0">
                                      <h3 className="text-lg font-semibold mb-4">
                                        Выбранные продукты
                                      </h3>
                                      {selectedTableRows.length > 20 && (
                                        <Input
                                          placeholder="Поиск по выбранным продуктам"
                                          className="w-full mb-4"
                                          value={modalSearchTerm}
                                          onChange={(e) =>
                                            setModalSearchTerm(e.target.value)
                                          }
                                        />
                                      )}
                                    </div>
                                    <div className="flex-1 overflow-y-auto pr-2">
                                      <div className="space-y-2">
                                        {filteredSelectedRows.map(
                                          (row, index) => (
                                            <div
                                              key={row.id_product || index}
                                              className="flex flex-row justify-between items-center p-2 border rounded-lg hover:bg-muted transition-colors"
                                            >
                                              <span className="flex-1 pr-2">
                                                {getDisplayName(row)}
                                              </span>
                                              <X
                                                className="cursor-pointer hover:text-red-500 transition-colors flex-shrink-0"
                                                size={16}
                                                onClick={() => {
                                                  const newSelectedRows =
                                                    selectedTableRows.filter(
                                                      (selectedRow) =>
                                                        selectedRow !== row,
                                                    );
                                                  handleTableRowSelection(
                                                    newSelectedRows,
                                                  );
                                                }}
                                              />
                                            </div>
                                          ),
                                        )}
                                      </div>
                                      {filteredSelectedRows.length === 0 &&
                                        modalSearchTerm && (
                                          <div className="text-center text-muted-foreground py-4">
                                            Продукты не найдены
                                          </div>
                                        )}
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              )}
                            </div>

                            <div className="flex-1 min-h-[300px] md:min-h-0 overflow-hidden">
                              <InfinityTable
                                key={dataVersion}
                                fetchData={fetchTableData}
                                totalData={[]}
                                onSelectionChange={handleTableRowSelection}
                                selectedRows={selectedTableRows}
                                dataVersion={dataVersion}
                                rowSelection="multiple"
                                cacheBlockSize={100}
                                maxBlocksInCache={10}
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 md:flex-shrink-0">
                              <Button
                                className="w-full"
                                size={isMobile ? "default" : "lg"}
                                disabled={
                                  !selectedTableRows ||
                                  selectedTableRows.length === 0
                                }
                                onClick={() =>
                                  handleGetMoreInfo({ tab: "commerce" })
                                }
                              >
                                Перейти в коммерческий отчет
                              </Button>
                              <Button
                                className="w-full"
                                size={isMobile ? "default" : "lg"}
                                disabled={
                                  !selectedTableRows ||
                                  selectedTableRows.length === 0
                                }
                                onClick={() =>
                                  handleGetMoreInfo({ tab: "check" })
                                }
                              >
                                Перейти в чековый отчет
                              </Button>
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-row gap-2 flex-1 dark:opacity-70 w-full justify-center items-center">
                        <NotFoundFilters />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-row gap-2 h-full dark:opacity-70 w-full justify-center items-center">
                    <NotSelectedFilters />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
