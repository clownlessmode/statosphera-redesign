import { Header } from "@widgets/header";
import { ValueCard } from "./value-card";
import { useIM } from "../api/controller";
import StackedLine from "@shared/ui/graphs/stacked-line/stacked-line";
import { usePreparedStackedLine } from "@shared/ui/graphs/stacked-line/preparedStackedLine";
import StackedLineSkeleton from "@shared/ui/graphs/stacked-line/stacked-line-skeleton";
import { Card, CardHeader, CardTitle } from "@shared/ui/card";
import { HorizontalStackedBarChart } from "@shared/ui/horizontal-stacked-bar-chart";
import { List } from "@shared/ui/list";
import { DonutChart } from "@shared/ui/graphs/donut-chart/donut-chart";
import pluralize from "@shared/lib/pluralize";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { GraphDate } from "./filters/graph-date";
import { DaysFilter } from "./filters/days-filter";
import { ShopsFilter } from "./filters/shops-filter";
import { useGraphDate } from "./filters/graph-date/model/hooks/use-graph-date";
import { useLoyaltyFiltersStore } from "./filters/filters-store";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { useMemo } from "react";

export const IM = () => {
  const { value } = useGraphDate();
  const { filterDate } = useLoyaltyFiltersStore();
  const store = useSalesDynamicsFiltersStore((state) => state.filters);
  const filters = useSalesDynamicsFiltersStore((state) => state.filters);

  const mock: any = useMemo(
    () => ({
      store,
      filters,
      filterDate: {
        dateStart: filterDate.dateStart,
        dateEnd: filterDate.dateEnd,
      },
      groups: [value],
    }),
    [store, filters, filterDate, value],
  );

  const {
    mainCards,
    isMainCardsLoading,
    ordinariesCards,
    isOrdinariesCardsLoading,
    pickupCards,
    isPickupCardsLoading,
    antitopOrderCancell,
    isAntitopOrderCancellLoading,
    topPaymentMethod,
    isTopPaymentMethodLoading,
  } = useIM(mock);

  const {
    orderProcessingGraph,
    isOrderProcessingGraphLoading,
    proceedsGraph,
    isProceedsGraphLoading,
    channelsGraph,
    isChannelsGraphLoading,
    channelsAgeGraph,
    isChannelsAgeGraphLoading,
    storeOrdinaryTable,
    isStoreOrdinaryTableLoading,
    storePickupTable,
    isStorePickupTableLoading,
    topNomenclature,
    isTopNomenclatureLoading,
    penetrationOffline,
    isPenetrationOfflineLoading,
    worstOnlineOffline,
    isWorstOnlineOfflineLoading,
  } = useIM(mock);
  const prepareLine = usePreparedStackedLine();

  // Функция для склонения слова "заказ"
  const getOrderSuffix = (count: number) => {
    return pluralize(count, ["заказ", "заказа", "заказов"]);
  };

  // Функция для склонения слова "продажа"
  const getSaleSuffix = (count: number) => {
    return pluralize(count, ["продажа", "продажи", "продаж"]);
  };

  console.log(mainCards);
  console.log("channelsGraph:", channelsGraph);
  console.log("channelsGraph data:", channelsGraph?.data);
  console.log("topPaymentMethod:", topPaymentMethod);
  console.log("topPaymentMethod data:", topPaymentMethod?.data);
  console.log("isChannelsGraphLoading:", isChannelsGraphLoading);
  console.log("isTopPaymentMethodLoading:", isTopPaymentMethodLoading);

  const isMobile = useIsMobile();

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header
        title="Интернет-магазин"
        actions={{
          left: !isMobile && (
            <div className="flex gap-2">
              <GraphDate />
              <DaysFilter />
              <ShopsFilter />
            </div>
          ),
        }}
      />
      <div className="rounded-3xl min-h-[calc(100vh-64px)] bg-background p-4 gap-4 flex flex-col">
        {isMobile && (
          <div className="flex flex-row justify-between">
            <DaysFilter />
            <GraphDate />
            <ShopsFilter />
          </div>
        )}
        {/* Основные метрики ИМ */}
        <div className="grid grid-cols-5 gap-4">
          {/* Выручка ИМ */}
          <ValueCard
            title={mainCards?.im_proceeds?.title}
            value={mainCards?.im_proceeds?.value}
            isLoading={isMainCardsLoading}
            suffix="₽"
          />
          {/* Процент онлайна */}
          <ValueCard
            title={mainCards?.online_percentage?.title}
            value={mainCards?.online_percentage?.value}
            isLoading={isMainCardsLoading}
            suffix="%"
          />
          {/* Всего заказов */}
          <ValueCard
            title={mainCards?.total_orders?.title}
            value={mainCards?.total_orders?.value}
            isLoading={isMainCardsLoading}
            suffix={null}
          />
          {/* Процент отмен */}
          <ValueCard
            title={mainCards?.cancellation_percentage?.title}
            value={mainCards?.cancellation_percentage?.value}
            isLoading={isMainCardsLoading}
            suffix="%"
          />
          {/* Закрытых заказов */}
          <ValueCard
            title={mainCards?.closed_orders?.title}
            value={mainCards?.closed_orders?.value}
            isLoading={isMainCardsLoading}
            suffix={null}
          />
        </div>
        {/* Графики */}
        <div className="grid grid-cols-2 gap-4">
          {isOrderProcessingGraphLoading ? (
            <StackedLineSkeleton className="h-[400px]" />
          ) : (
            <StackedLine
              option={{
                title: {
                  text:
                    orderProcessingGraph?.title || "График обработки заказов",
                },
                series:
                  orderProcessingGraph?.data &&
                  prepareLine([
                    {
                      name: orderProcessingGraph.title,
                      data: orderProcessingGraph.data,
                      type: "line",
                    },
                  ] as any),
              }}
              className="h-[400px]"
            />
          )}
          {isProceedsGraphLoading ? (
            <StackedLineSkeleton className="h-[400px]" />
          ) : (
            <StackedLine
              option={{
                title: {
                  text: proceedsGraph?.[0]?.title || "График выручки ИМ",
                },
                legend: {
                  data:
                    proceedsGraph
                      ?.slice(1)
                      .map((item) => item.name || item.title) || [],
                },
                series:
                  proceedsGraph?.slice(1) &&
                  prepareLine(
                    proceedsGraph.slice(1).map((item) => ({
                      name: item.name || item.title,
                      data: item.data,
                      type: "line",
                    })) as any,
                  ),
              }}
              className="h-[400px]"
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <Card className="h-[400px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">
                  {channelsGraph?.title || "Распределение заказов по каналам"}
                </CardTitle>
              </CardHeader>
              <div className="h-[320px]">
                <DonutChart
                  data={
                    channelsGraph?.data && channelsGraph.data.length > 0
                      ? channelsGraph.data.map((item) => ({
                          name: item.channel,
                          value: item.count_orders,
                        }))
                      : []
                  }
                  isLoading={isChannelsGraphLoading}
                />
              </div>
            </Card>
            {/* Топ по способу оплаты */}
            <Card className="h-[400px]">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-lg">
                  {topPaymentMethod?.title ||
                    "Распределение заказов по способу оплаты"}
                </CardTitle>
              </CardHeader>
              <div className="h-[320px]">
                <DonutChart
                  data={
                    topPaymentMethod?.data && topPaymentMethod.data.length > 0
                      ? topPaymentMethod.data.map((item) => ({
                          name: item.payment_method,
                          value: item.count_orders,
                        }))
                      : []
                  }
                  isLoading={isTopPaymentMethodLoading}
                />
              </div>
            </Card>
          </div>
          {isChannelsAgeGraphLoading ? (
            <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
          ) : (
            <Card className="md:h-[400px]">
              <div style={{ height: "400px", width: "100%" }}>
                <HorizontalStackedBarChart
                  yAxisData={Array.from(
                    new Set(
                      channelsAgeGraph?.data.map((item) => item.age_group) ||
                        [],
                    ),
                  )}
                  series={(() => {
                    if (!channelsAgeGraph?.data) return [];

                    const channels = Array.from(
                      new Set(
                        channelsAgeGraph.data.map((item) => item.channel),
                      ),
                    );
                    const ageGroups = Array.from(
                      new Set(
                        channelsAgeGraph.data.map((item) => item.age_group),
                      ),
                    );

                    return channels.map((channel) => ({
                      name: channel,
                      data: ageGroups.map((ageGroup) => {
                        const item = channelsAgeGraph.data.find(
                          (d) =>
                            d.channel === channel && d.age_group === ageGroup,
                        );
                        return item ? item.proceeds : 0;
                      }),
                    }));
                  })()}
                  grid={{
                    bottom: 20,
                    top: 80,
                  }}
                  title={
                    channelsAgeGraph?.title ||
                    "Распределение выручки по каналам и возрасту"
                  }
                  formatter={(params) => {
                    if (Array.isArray(params)) {
                      return params
                        .map(
                          (item) =>
                            `${item.marker}${item.seriesName}: ${(item.value || 0).toLocaleString()} ₽`,
                        )
                        .join("<br/>");
                    }
                    return `${params.value}`;
                  }}
                />
              </div>
            </Card>
          )}
        </div>

        {/* Заказы (обычные) */}
        <div className="grid grid-cols-3 gap-4">
          {/* Заказов (обычные) */}
          <ValueCard
            title={ordinariesCards?.total_orders?.title}
            value={ordinariesCards?.total_orders?.value}
            isLoading={isOrdinariesCardsLoading}
            suffix={null}
          />
          {/* Завершенных (обычные) */}
          <ValueCard
            title={ordinariesCards?.completed_orders?.title}
            value={ordinariesCards?.completed_orders?.value}
            isLoading={isOrdinariesCardsLoading}
            suffix={null}
          />
          {/* % отмен (обычные) */}
          <ValueCard
            title={ordinariesCards?.cancellation_percentage?.title}
            value={ordinariesCards?.cancellation_percentage?.value}
            isLoading={isOrdinariesCardsLoading}
            suffix="%"
          />
        </div>
        {/* Листы */}
        <div className="grid grid-cols-3 gap-4">
          <List
            title={
              storeOrdinaryTable?.top?.title ||
              "Лучшие по количеству заказов (обычные)"
            }
            isLoading={isStoreOrdinaryTableLoading}
            suffix={getOrderSuffix}
            options={
              storeOrdinaryTable?.top?.topStores.map((store) => ({
                name: store.store_name,
                count: store.count_orders,
              })) || []
            }
          />
          <List
            title={
              storeOrdinaryTable?.worst?.title ||
              "Худшие по количеству заказов (обычные)"
            }
            isLoading={isStoreOrdinaryTableLoading}
            suffix={getOrderSuffix}
            options={
              storeOrdinaryTable?.worst?.bottomStores.map((store) => ({
                name: store.store_name,
                count: store.count_orders,
              })) || []
            }
          />
          {/* Антитоп по отменам заказа */}
          <List
            title={antitopOrderCancell?.title || "Антитоп по отменам заказа"}
            isLoading={isAntitopOrderCancellLoading}
            suffix={(count) => `${(count || 0).toFixed(1)}%`}
            options={
              antitopOrderCancell?.data.map((store) => ({
                name: store.store_name,
                count: store.cancellation_percentage,
                price: `${store.cancelled_orders}/${store.total_orders}`,
              })) || []
            }
          />
        </div>

        {/* Заказы (самовывоз) */}
        <div className="grid grid-cols-3 gap-4">
          {/* Заказов (самовывоз) */}
          <ValueCard
            title={pickupCards?.total_orders?.title}
            value={pickupCards?.total_orders?.value}
            isLoading={isPickupCardsLoading}
            suffix={null}
          />
          {/* Завершенных (самовывоз) */}
          <ValueCard
            title={pickupCards?.completed_orders?.title}
            value={pickupCards?.completed_orders?.value}
            isLoading={isPickupCardsLoading}
            suffix={null}
          />
          {/* % отмен (самовывоз) */}
          <ValueCard
            title={pickupCards?.cancellation_percentage?.title}
            value={pickupCards?.cancellation_percentage?.value}
            isLoading={isPickupCardsLoading}
            suffix="%"
          />
        </div>

        {/* Листы самовывоза */}
        <div className="grid grid-cols-2 gap-4">
          <List
            title={
              storePickupTable?.top?.title ||
              "Лучшие по количеству заказов (самовывоз)"
            }
            isLoading={isStorePickupTableLoading}
            suffix={getOrderSuffix}
            options={
              storePickupTable?.top?.topStores.map((store) => ({
                name: store.store_name,
                count: store.count_orders,
              })) || []
            }
          />
          <List
            title={
              storePickupTable?.worst?.title ||
              "Худшие по количеству заказов (самовывоз)"
            }
            isLoading={isStorePickupTableLoading}
            suffix={getOrderSuffix}
            options={
              storePickupTable?.worst?.bottomStores.map((store) => ({
                name: store.store_name,
                count: store.count_orders,
              })) || []
            }
          />
        </div>

        {/* Строка в 3 колонки */}
        <div className="grid grid-cols-3 gap-4">
          <List
            title={
              topNomenclature?.title || "Топ номенклатур по продажам (выручка)"
            }
            isLoading={isTopNomenclatureLoading}
            suffix={getSaleSuffix}
            options={
              topNomenclature?.data.map((product) => ({
                name: product.product_name,
                count: product.count_sales || 0,
                price: `${(product.proceeds || 0).toLocaleString()} ₽`,
              })) || []
            }
          />
          {/* Вторая колонка */}
          <List
            title={
              penetrationOffline?.title || "Лучшее проникновение к офлайну"
            }
            isLoading={isPenetrationOfflineLoading}
            suffix={"%"}
            options={
              penetrationOffline?.data.map((product) => ({
                name: product.product_name,
                count: `${(product.online_penetration_percentage || 0).toFixed(1)}`,
                price: `${(product.proceeds_online || 0).toLocaleString()} ₽`,
              })) || []
            }
          />
          {/* Третья колонка */}
          <List
            title={worstOnlineOffline?.title || "Худший онлайн к офлайну"}
            isLoading={isWorstOnlineOfflineLoading}
            suffix={"%"}
            options={
              worstOnlineOffline?.data.map((item) => ({
                name: item.sub_sub_group_name,
                count: item.count_sales_online || 0,
                price: `${(item.proceeds_online || 0).toLocaleString()} ₽`,
              })) || []
            }
          />
        </div>

        {/* Новая строка в две колонки */}
        <div className="grid grid-cols-2 gap-4"></div>
      </div>
    </div>
  );
};
