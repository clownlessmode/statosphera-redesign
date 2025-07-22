import { Header } from "@widgets/header";
import { AllUsers, AvarageCheck, ValueCard } from "./cards";
import { List } from "@shared/ui/list";
import { useLoyal } from "../api";
import { useEffect, useState, useMemo } from "react";
import {
  BonusesResponse,
  AppLoyalGraphResponse,
  GraphResponse,
  TopGroupResponse,
  TopProductRubResponse,
  TopStoreLoyalResponse,
  UniqueGraphResponse,
  TopActionsResponse,
  AvarageCheckResponse,
  NoSales30DaysUserResponse,
  LoyalCard2Response,
  AgeGroupsGraphResponse,
  AgeCircleGraphResponse,
} from "../config";

import { TopLoyalStoreCards } from "./cards/top-loyal-store-cards";
import { BonusGraph } from "./graphs";
import { UniqueGraph } from "./graphs/unique-graph";
import { AppLoyalGraph } from "./graphs/app-loyal-graph";
import { TopActions } from "./graphs/top-actions";
import { GraphDate } from "./filters/graph-date";
import { useGraphDate } from "./filters/graph-date/model/hooks/use-graph-date";
import { useLoyaltyFiltersStore } from "./filters/filters-store";
import { DaysFilter } from "./filters/days-filter";
import { ShopsFilter } from "./filters/shops-filter";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";
import { DevCard } from "@shared/ui/dev-card";
import { AgeGroupsGraph } from "./graphs/age-groups-graph";
import { AgeCircleGraph } from "./graphs/age-circle-graph";

export const Loyalty = () => {
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
  const [bonuses, setBonuses] = useState<BonusesResponse[]>([]);
  const [avarageCheck, setAvarageCheck] = useState<AvarageCheckResponse[]>([]);
  const [topGroups, setTopGroups] = useState<TopGroupResponse[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductRubResponse[]>([]);
  const [topProductsCount, setTopProductsCount] = useState<
    TopProductRubResponse[]
  >([]);
  const [topStoreLoyal, setTopStoreLoyal] = useState<TopStoreLoyalResponse[]>(
    [],
  );
  const [bonusGraph, setBonusGraph] = useState<{ graph: GraphResponse[] }>({
    graph: [],
  });
  const [uniqueGraph, setUniqueGraph] = useState<UniqueGraphResponse>({
    graph: [],
  });
  const [appLoyalGraph, setAppLoyalGraph] = useState<AppLoyalGraphResponse>({
    graph: [],
  });
  const [topActions, setTopActions] = useState<TopActionsResponse[]>([]);
  const [noSales30DaysUser, setNoSales30DaysUser] =
    useState<NoSales30DaysUserResponse>();
  const [loyalCard2, setLoyalCard2] = useState<LoyalCard2Response>();
  const [ageGroupsGraph, setAgeGroupsGraph] = useState<AgeGroupsGraphResponse>({
    xAxis: [],
    legend: [],
    series: [],
  });
  const [ageCircleGraph, setAgeCircleGraph] = useState<AgeCircleGraphResponse>({
    circle: [],
    center: [],
  });
  const {
    getNoSales30DaysUser,
    isNoSales30DaysUserLoading,
    isAvarageCheckLoading,
    getAvarageCheck,
    getBonuses,
    isBonusesLoading,
    getTopGroups,
    isTopGroupsLoading,
    getTopProducts,
    isTopProductsLoading,
    getTopProductsCount,
    isTopProductsCountLoading,
    getTopStoreLoyal,
    isTopStoreLoyalLoading,
    getBonusGraph,
    isBonusGraphLoading,
    getUniqueGraph,
    isUniqueGraphLoading,
    isAppLoyalGraphLoading,
    getAppLoyalGraph,
    getTopActions,
    isTopActionsLoading,
    getLoyalCard2,
    isLoyalCard2Loading,
    getAgeGroupsGraph,
    isAgeGroupsGraphLoading,
    getAgeCircleGraph,
    isAgeCircleGraphLoading,
  } = useLoyal();
  useEffect(() => {
    getBonuses(mock).then((data) => {
      setBonuses(data);
    });
    getTopGroups(mock).then((data) => {
      setTopGroups(data);
    });
    getTopProducts(mock).then((data) => {
      setTopProducts(data);
    });
    getTopProductsCount(mock).then((data) => {
      setTopProductsCount(data);
    });
    getTopStoreLoyal(mock).then((data) => {
      setTopStoreLoyal(data);
    });
    getBonusGraph(mock).then((data) => {
      setBonusGraph(data);
    });
    getUniqueGraph(mock).then((data) => {
      setUniqueGraph(data);
    });
    getAppLoyalGraph(mock).then((data) => {
      setAppLoyalGraph(data);
    });
    getTopActions(mock).then((data) => {
      setTopActions(data);
    });
    getAvarageCheck(mock).then((data) => {
      setAvarageCheck(data);
    });
    getNoSales30DaysUser(mock).then((data) => {
      setNoSales30DaysUser(data);
    });
    getLoyalCard2(mock).then((data) => {
      setLoyalCard2(data[0]);
    });
    getAgeGroupsGraph(mock).then((data) => {
      setAgeGroupsGraph(data);
    });
    getAgeCircleGraph(mock).then((data) => {
      setAgeCircleGraph(data);
    });
  }, [mock]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title={`Лояльность`}
        actions={{
          left: (
            <div className="flex gap-2">
              <GraphDate />
              <DaysFilter />
              <ShopsFilter />
            </div>
          ),
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)]">
        <AllUsers
          isNoSales30DaysUserLoading={isNoSales30DaysUserLoading}
          noSales30DaysUser={noSales30DaysUser as any}
        />
        <div className="flex flex-row gap-2 w-full">
          <AvarageCheck
            isAvarageCheckLoading={isAvarageCheckLoading}
            avarageCheck={avarageCheck[0]}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-2 w-full h-full">
              <ValueCard
                title="Уникальных"
                value={loyalCard2?.uniqueCardNumber ?? 0}
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Проникновение"
                value={loyalCard2?.appLoyalPercent ?? 0}
                unit="%"
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Начислено бонусов"
                unit="M"
                value={loyalCard2?.bonusAccrual ?? 0}
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Списано бонусов"
                unit="M"
                value={loyalCard2?.bonusWriteOff ?? 0 / 1000000}
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Остаток бонусов M"
                isLoading={true}
                value={400000000 / 1000000}
                unit="M"
              />
              <ValueCard
                title="Бонусы на 1 пользователя M"
                isLoading={true}
                value={148}
              />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <ValueCard
                title="Частота покупок"
                value={loyalCard2?.frequencySalesLoyal ?? 0}
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Доп. выручка"
                isLoading={isLoyalCard2Loading}
                value={loyalCard2?.proceedsAdditionalLoyal ?? 0 / 1000000}
                unit="M"
              />
              <ValueCard
                title="Доля доп. выручки"
                isLoading={isLoyalCard2Loading}
                value={loyalCard2?.proceedsAdditionalLoyalPercent ?? 0}
                unit="%"
              />
              <ValueCard
                isLoading={isBonusesLoading}
                title="% списания бонусов"
                value={bonuses[0]?.bonusWriteOffFromAccrualPercent ?? 0}
                unit="%"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 w-full">
          <List
            title="Топ 5 групп по выручке"
            isLoading={isTopGroupsLoading}
            options={topGroups.map((group) => ({
              name: group.subSubGroups,
              price: `${group.countSales} ₽`,
            }))}
          />
          <List
            title="Топ 5 товаров по выручке"
            isLoading={isTopProductsLoading}
            options={topProducts.map((group) => ({
              name: group.product,
              price: `${group.countSales} ₽`,
            }))}
          />
          <List
            title="Топ 5 товаров по количеству продаж"
            isLoading={isTopProductsCountLoading}
            options={topProductsCount.map((group) => ({
              name: group.product,
              price: `${group.countSales}`,
            }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <BonusGraph
            graph={bonusGraph.graph}
            isLoading={isBonusGraphLoading}
          />
          <UniqueGraph graph={uniqueGraph} isLoading={isUniqueGraphLoading} />
          <AppLoyalGraph
            graph={appLoyalGraph}
            isLoading={isAppLoyalGraphLoading}
          />
          <TopActions graph={topActions} isLoading={isTopActionsLoading} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <TopLoyalStoreCards
            topStoreLoyal={topStoreLoyal}
            isLoading={isTopStoreLoyalLoading}
          />
          <AgeCircleGraph
            graph={ageCircleGraph}
            isLoading={isAgeCircleGraphLoading}
          />

          <DevCard
            title="Частота чеков по полу в разрезе возрастной группы"
            className="col-span-2"
          />
          <div className="grid grid-cols-2 col-span-3 gap-2">
            <AgeGroupsGraph
              graph={ageGroupsGraph}
              isLoading={isAgeGroupsGraphLoading}
            />
            <DevCard title="Распределение выручки по полу и возрасту" />
          </div>
          <div className="grid grid-cols-2 col-span-3 gap-2">
            <DevCard title="Изменение среднего чека по частоте с разделением по полу" />
            <DevCard title="Изменение среднего чека по частоте с разделением по возрасту" />
          </div>
          <div className="grid grid-cols-2 col-span-3 gap-2">
            <DevCard title="Длина чека по возрасту и полу" />
            <DevCard title="Часы активности по времени и по возрасту" />
          </div>
        </div>
      </div>
    </div>
  );
};
