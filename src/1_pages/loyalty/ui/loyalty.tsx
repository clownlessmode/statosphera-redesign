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
  AgeSalesGraphResponse,
  AvarageCheckAgeGroupGraphResponse,
  RevenueGroupsGraphResponse,
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
import { AgeGroupsGraph } from "./graphs/age-groups-graph";
import { AgeCircleGraph } from "./graphs/age-circle-graph";
import { AgeSalesGraph } from "./graphs/age-sales-graph";
import { RevenueGroupsGraph } from "./graphs/revenueGroups";
import { AvarageCheckAgeGroupGraph } from "./graphs/avarage-check-age-group-graph";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@shared/ui/tooltip";

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
  const [ageSalesGraph, setAgeSalesGraph] = useState<AgeSalesGraphResponse>({
    xAxis: [],
    legend: [],
    series: [],
  });
  const [averageCheckAgeGroupGraph, setAverageCheckAgeGroupGraph] =
    useState<AvarageCheckAgeGroupGraphResponse>({
      graph: [],
    });
  const [revenueGroupsGraph, setRevenueGroupsGraph] =
    useState<RevenueGroupsGraphResponse>({
      yAxis: [],
      legend: [],
      series: [],
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
    getAgeSalesGraph,
    isAgeSalesGraphLoading,
    getAverageCheckAgeGroupGraph,
    isAverageCheckAgeGroupGraphLoading,
    getRevenueGroupsGraph,
    isRevenueGroupsGraphLoading,
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

    getAgeSalesGraph(mock).then((data) => {
      setAgeSalesGraph(data);
    });
    getAverageCheckAgeGroupGraph(mock).then((data) => {
      setAverageCheckAgeGroupGraph(data);
    });
    getRevenueGroupsGraph(mock).then((data) => {
      setRevenueGroupsGraph(data);
    });
  }, [mock]);

  const isMobile = useIsMobile();

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Лояльность"
        actions={{
          left: !isMobile && (
            <div className="ml-6 -mb-4 flex flex-row gap-1">
              <Button variant="outline" className="border-b-0 rounded-b-none">
                Лояльность
              </Button>
              <Link to={ROUTES_PATH.RFM}>
                <Button
                  variant="outline"
                  className="border-b-0 rounded-b-none opacity-50"
                >
                  RFM
                </Button>
              </Link>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0 rounded-b-none opacity-50"
                    >
                      ABC
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0 rounded-b-none opacity-50"
                    >
                      Retention
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <Button
                      disabled
                      variant="outline"
                      className="border-b-0 rounded-b-none opacity-50"
                    >
                      Выгрузки
                    </Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={0}
                  className="w-max h-fit p-2 text-center"
                  side="bottom"
                >
                  В разработке.
                </TooltipContent>
              </Tooltip>
            </div>
          ),
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-2 md:gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)] max-md:px-0 max-md:pt-0 max-md:*:px-4 max-md:*:first:px-0">
        <div className="hidden max-md:flex flex-row gap-1">
          <Button
            variant="outline"
            className="border-0 rounded-none rounded-tl-3xl h-10 w-1/2 px-1"
          >
            Лояльность
          </Button>
          <Link to={ROUTES_PATH.RFM} className="w-1/2">
            <Button
              variant="outline"
              className="opacity-50 border-0 border-b-1 border-l-1 rounded-none rounded-tr-3xl w-full h-10 px-1"
            >
              RFM
            </Button>
          </Link>
        </div>
        <div className="flex flex-row gap-2 justify-between md:justify-end">
          <DaysFilter />
          <GraphDate />
          <ShopsFilter />
        </div>
        <AllUsers
          isNoSales30DaysUserLoading={isNoSales30DaysUserLoading}
          noSales30DaysUser={noSales30DaysUser as any}
        />
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <AvarageCheck
            isAvarageCheckLoading={isAvarageCheckLoading}
            avarageCheck={avarageCheck[0]}
          />
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row max-md:grid max-md:grid-cols-2 gap-2 w-full h-full">
              <ValueCard
                title="Уникальных"
                value={loyalCard2?.uniqueCardNumber ?? 0}
                isLoading={isLoyalCard2Loading}
                formatter={(value) => value.toLocaleString()}
              />
              <ValueCard
                title="Проникновение"
                value={loyalCard2?.appLoyalPercent ?? 0}
                unit="%"
                formatter={(value) => (value ? value.toFixed(1) : "0")}
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Начислено бонусов"
                unit="M"
                value={loyalCard2?.bonusAccrual ?? 0}
                formatter={(value) =>
                  Math.round(value / 1000).toLocaleString("ru-RU")
                }
                isLoading={isLoyalCard2Loading}
              />
              <ValueCard
                title="Списано бонусов"
                unit="M"
                value={loyalCard2?.bonusWriteOff ?? 0 / 1000000}
                formatter={(value) =>
                  Math.round(value / 1000).toLocaleString("ru-RU")
                }
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
              {isMobile && (
                <>
                  <ValueCard
                    title="Частота покупок"
                    value={loyalCard2?.frequencySalesLoyal ?? 0}
                    isLoading={isLoyalCard2Loading}
                    formatter={(value) => (value ? value.toFixed(1) : "0")}
                  />
                  <ValueCard
                    title="Доп. выручка"
                    isLoading={isLoyalCard2Loading}
                    value={(loyalCard2?.proceedsAdditionalLoyal ?? 0) / 1000000}
                    unit="M"
                    formatter={(value) =>
                      Math.round(value * 1000).toLocaleString("ru-RU")
                    }
                  />
                  <ValueCard
                    title="Доля доп. выручки"
                    formatter={(value) => (value ? value.toFixed(1) : "0")}
                    isLoading={isLoyalCard2Loading}
                    value={loyalCard2?.proceedsAdditionalLoyalPercent ?? 0}
                    unit="%"
                  />
                  <ValueCard
                    isLoading={isBonusesLoading}
                    title="% списания бонусов"
                    formatter={(value) => (value ? value.toFixed(1) : "0")}
                    value={bonuses[0]?.bonusWriteOffFromAccrualPercent ?? 0}
                    unit="%"
                  />
                </>
              )}
            </div>
            {!isMobile && (
              <div className="flex flex-row gap-2 w-full">
                <ValueCard
                  title="Частота покупок"
                  value={loyalCard2?.frequencySalesLoyal ?? 0}
                  isLoading={isLoyalCard2Loading}
                  formatter={(value) => (value ? value.toFixed(1) : "0")}
                />
                <ValueCard
                  title="Доп. выручка"
                  isLoading={isLoyalCard2Loading}
                  value={(loyalCard2?.proceedsAdditionalLoyal ?? 0) / 1000000}
                  unit="M"
                  formatter={(value) =>
                    Math.round(value * 1000).toLocaleString("ru-RU")
                  }
                />
                <ValueCard
                  title="Доля доп. выручки"
                  formatter={(value) => (value ? value.toFixed(1) : "0")}
                  isLoading={isLoyalCard2Loading}
                  value={loyalCard2?.proceedsAdditionalLoyalPercent ?? 0}
                  unit="%"
                />
                <ValueCard
                  isLoading={isBonusesLoading}
                  title="% списания бонусов"
                  formatter={(value) => (value ? value.toFixed(1) : "0")}
                  value={bonuses[0]?.bonusWriteOffFromAccrualPercent ?? 0}
                  unit="%"
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <List
            title="Топ 5 групп по выручке"
            isLoading={isTopGroupsLoading}
            options={topGroups.map((group) => ({
              name: group.subSubGroups,
              price: `${group.countSales.toLocaleString()}`,
            }))}
          />
          <List
            title="Топ 5 товаров по выручке"
            isLoading={isTopProductsLoading}
            options={topProducts.map((group) => ({
              name: group.product,
              price: `${group.proceeds.toLocaleString()} ₽`,
            }))}
          />
          <List
            title="Топ 5 товаров по количеству продаж"
            isLoading={isTopProductsCountLoading}
            options={topProductsCount.map((group: any) => ({
              name: group.product,
              price: `${group.countSales.toLocaleString()} шт`,
            }))}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
        <div className="flex flex-col md:grid md:grid-cols-3 gap-2">
          <TopLoyalStoreCards
            topStoreLoyal={topStoreLoyal}
            isLoading={isTopStoreLoyalLoading}
          />
          <AgeCircleGraph
            graph={ageCircleGraph}
            isLoading={isAgeCircleGraphLoading}
          />

          <AgeSalesGraph
            graph={ageSalesGraph}
            isLoading={isAgeSalesGraphLoading}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-3 gap-2">
            <AgeGroupsGraph
              graph={ageGroupsGraph}
              isLoading={isAgeGroupsGraphLoading}
            />
            <RevenueGroupsGraph
              isLoading={isRevenueGroupsGraphLoading}
              graph={revenueGroupsGraph}
            />
          </div>
          <AvarageCheckAgeGroupGraph
            graph={averageCheckAgeGroupGraph}
            isLoading={isAverageCheckAgeGroupGraphLoading}
          />
        </div>
      </div>
    </div>
  );
};
