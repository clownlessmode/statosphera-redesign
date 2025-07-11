import { Header } from "@widgets/header";
import { AllUsers, AvarageCheck, ValueCard } from "./cards";
import { List } from "@shared/ui/list";
import { useLoyal } from "../api";
import { useEffect, useState } from "react";
import {
  BonusesResponse,
  AppLoyalGraphResponse,
  GraphResponse,
  TopGroupResponse,
  TopProductRubResponse,
  TopStoreLoyalResponse,
  UniqueGraphResponse,
} from "../config";

import { TopLoyalStoreCards } from "./cards/top-loyal-store-cards";
import { BonusGraph } from "./graphs";
import { UniqueGraph } from "./graphs/unique-graph";
import { AppLoyalGraph } from "./graphs/app-loyal-graph";
const mock = {
  store: {
    idStore: [],
    idCity: [],
    idRegion: [],
    idManager: [],
    storeCondition: [],
    ageGroup: [],
    idLegalEntity: [],
    channel: [],
    district: [],
  },
  filterDate: {
    dateStart: "2025-05-01",
    dateEnd: "2025-05-30",
  },
  groups: ["day"],
};
export const Loyalty = () => {
  const [bonuses, setBonuses] = useState<BonusesResponse[]>([]);
  const [topGroups, setTopGroups] = useState<TopGroupResponse[]>([]);
  const [topProducts, setTopProducts] = useState<TopProductRubResponse[]>([]);
  const [topProductsCount, setTopProductsCount] = useState<
    TopProductRubResponse[]
  >([]);
  const [topStoreLoyal, setTopStoreLoyal] = useState<TopStoreLoyalResponse[]>(
    [],
  );
  const [bonusGraph, setBonusGraph] = useState<GraphResponse[]>([]);
  const [uniqueGraph, setUniqueGraph] = useState<UniqueGraphResponse>({
    graph: [],
  });
  const [appLoyalGraph, setAppLoyalGraph] = useState<AppLoyalGraphResponse>({
    graph: [],
  });
  const {
    uniques,
    isUniquesLoading,
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
  }, [mock]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Лояльность`} />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)]">
        <AllUsers />
        <div className="flex flex-row gap-2 w-full">
          <AvarageCheck />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row gap-2 w-full">
              <ValueCard
                title="Уникальных"
                value={uniques ?? 0}
                isLoading={isUniquesLoading}
              />
              <ValueCard title="Проникновение" value={54.5} unit="%" />
              <ValueCard
                title="Начислено бонусов"
                unit="M"
                value={bonuses[0]?.bonusAccrual / 1000000}
                isLoading={isBonusesLoading}
              />
              <ValueCard
                title="Списано бонусов"
                unit="M"
                value={bonuses[0]?.bonusWriteOff / 1000000}
                isLoading={isBonusesLoading}
              />
              <ValueCard
                title="Остаток бонусов M"
                value={400000000 / 1000000}
                unit="M"
              />
              <ValueCard title="Бонусы на 1 пользователя M" value={148} />
            </div>
            <div className="flex flex-row gap-2 w-full">
              <ValueCard title="Частота покупок M" value={3.2} />
              <ValueCard title="Доп. выручка M" value={34.231} unit="M" />
              <ValueCard title="Доля доп. выручки M" value={30} unit="%" />
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
          <BonusGraph graph={bonusGraph} isLoading={isBonusGraphLoading} />
          <UniqueGraph graph={uniqueGraph} isLoading={isUniqueGraphLoading} />
          <AppLoyalGraph
            graph={appLoyalGraph}
            isLoading={isAppLoyalGraphLoading}
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <TopLoyalStoreCards
            topStoreLoyal={topStoreLoyal}
            isLoading={isTopStoreLoyalLoading}
          />
        </div>
      </div>
    </div>
  );
};
