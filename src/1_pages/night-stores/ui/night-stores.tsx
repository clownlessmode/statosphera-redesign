import { Header } from "@widgets/header";
import DaysFilter from "@widgets/night-shops/ui/days-filter/ui/days-filter";
import ShopsFilter from "@widgets/night-shops/ui/shops-filter/ui/shops-filter";
import { useNightStoresFiltersStore } from "@widgets/night-shops/model/filters-store";
import { ValueCard } from "./cards/value-card";
import { useNightStores } from "../api/controller";
import { useEffect, useState } from "react";
import {
  AllCardResponse,
  BarGraphResponse,
  LineGraphResponse,
  NightSalesWeekdayNomenclatureResponse,
  NightSalesWeekdayResponse,
  TopNightStoreResponse,
  TopNomenclatureResponse,
  TopSubgroupsResponse,
} from "../config/types";
import { List } from "@shared/ui/list";
import { TopNightStoreCards } from "./cards/top-night-store-cards";
import IndicatorDropdown, {
  useIndicatorFilterStore,
} from "@widgets/night-shops/ui/indicator-dropdown";
import HourProceedsGraph from "./graphs/hour-proceeds-graph";
import AgeProceedsGraph from "./graphs/age-proceeds-graph";
import AgeCountCheckGraph from "./graphs/age-count-check-graph";
import AgeAvgCheckGraph from "./graphs/age-avg-check-graph";
import UniqueCheckGraph from "./graphs/unique-check-graph";
import GraphProceeds from "./graphs/graph-proceeds";
import WeekdayNomenclatureCard from "./cards/weekday-nomenclature-card";

export const NightStores = () => {
  const {
    getAllCard,
    isAllCardLoading,
    getTopNightStore,
    isTopNightStoreLoading,
    getTopNomenclature,
    isTopNomenclatureLoading,
    getTopSubgroups,
    isTopSubgroupsLoading,
    getNightSalesWeekday,
    isNightSalesWeekdayLoading,
    getNightSalesWeekdayNomenclature,
    isNightSalesWeekdayNomenclatureLoading,
    getAgeProceedsGraph,
    isAgeProceedsGraphLoading,
    getProceedsGraph,
    isProceedsGraphLoading,
    getHourProceedsGraph,
    isHourProceedsGraphLoading,
    getAgeCountCheckGraph,
    isAgeCountCheckGraphLoading,
    getAgeAvgCheckGraph,
    isAgeAvgCheckGraphLoading,
    getUniqueCheckGraph,
    isUniqueCheckGraphLoading,
  } = useNightStores();

  const [allCard, setAllCard] = useState<AllCardResponse | null>(null);
  const [topNightStore, setTopNightStore] =
    useState<TopNightStoreResponse | null>(null);
  const [topNomenclature, setTopNomenclature] =
    useState<TopNomenclatureResponse | null>(null);
  const [topSubgroups, setTopSubgroups] = useState<TopSubgroupsResponse | null>(
    null,
  );
  const [nightSalesWeekday, setNightSalesWeekday] =
    useState<NightSalesWeekdayResponse | null>(null);
  const [nightSalesWeekdayNomenclature, setNightSalesWeekdayNomenclature] =
    useState<NightSalesWeekdayNomenclatureResponse | null>(null);
  const [ageProceedsGraph, setAgeProceedsGraph] = useState<
    LineGraphResponse["graph"] | null
  >(null);
  const [ageCountCheckGraph, setAgeCountCheckGraph] = useState<
    LineGraphResponse["graph"] | null
  >(null);
  const [ageAvgCheckGraph, setAgeAvgCheckGraph] = useState<
    LineGraphResponse["graph"] | null
  >(null);
  const [proceedsGraph, setProceedsGraph] = useState<
    LineGraphResponse["graph"] | null
  >(null);
  const [uniqueCheckGraph, setUniqueCheckGraph] = useState<
    BarGraphResponse["data"] | null
  >(null);
  const [hourProceedsGraph, setHourProceedsGraph] = useState<
    BarGraphResponse["data"] | null
  >(null);

  const filters = useNightStoresFiltersStore((state) => state.filters);
  const filterDate = useNightStoresFiltersStore((state) => state.filterDate);
  const indicator = useIndicatorFilterStore((state) => state.indicator);

  useEffect(() => {
    getAllCard({ filters, filterDate }).then((response) => {
      setAllCard(response);
    });
    getTopNightStore({ filters, filterDate }).then((response) => {
      setTopNightStore(response);
    });
    getTopNomenclature({ filters, filterDate }).then((response) => {
      setTopNomenclature(response);
    });
    getTopSubgroups({ filters, filterDate }).then((response) => {
      setTopSubgroups(response);
    });
    getNightSalesWeekday({ filters, filterDate }).then((response) => {
      setNightSalesWeekday(response);
    });
    getNightSalesWeekdayNomenclature({ filters, filterDate }).then(
      (response) => {
        setNightSalesWeekdayNomenclature(response);
      },
    );
    getAgeProceedsGraph({ filters, filterDate }).then((response) => {
      setAgeProceedsGraph(response.graph);
    });
    getAgeCountCheckGraph({ filters, filterDate }).then((response) => {
      setAgeCountCheckGraph(response.graph);
    });
    getAgeAvgCheckGraph({ filters, filterDate }).then((response) => {
      setAgeAvgCheckGraph(response.graph);
    });
    getHourProceedsGraph({ filters, filterDate }).then((response) => {
      setHourProceedsGraph(response.data);
    });
    getUniqueCheckGraph({ filters, filterDate }).then((response) => {
      setUniqueCheckGraph(response.data);
    });
    getProceedsGraph({ filters, filterDate }).then((response) => {
      setProceedsGraph(response.graph);
    });
  }, [filters, filterDate]);

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title="Ночные магазины" />
      <div className="rounded-3xl px-4 py-4 gap-2 md:gap-4 h-full flex flex-col w-full bg-background min-h-[calc(100vh-64px)]">
        <div className="flex flex-row gap-2 justify-between md:justify-end">
          <IndicatorDropdown />
          <DaysFilter />
          <ShopsFilter />
        </div>
        <div className="flex flex-col gap-4 max-md:gap-2">
          <div className="grid grid-cols-6 gap-2 max-md:grid-cols-2 max-md:*:text-xs">
            <ValueCard
              title="Прибыль"
              unit={(allCard?.profitNight ?? 0) >= 1000000 ? "М" : "Т"}
              value={allCard?.profitNight ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => {
                if (value >= 1000000) {
                  return (value / 10000 / 100).toFixed(2);
                } else {
                  return (value / 1000).toFixed(2);
                }
              }}
            />
            <ValueCard
              title="Процент от общей прибыли"
              unit="%"
              value={allCard?.percentageProfitNight ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString().replace(",", ".")}
            />
            <ValueCard
              title="Выручка"
              unit={(allCard?.proceedsNight ?? 0) >= 1000000 ? "М" : "Т"}
              value={allCard?.proceedsNight ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => {
                if (value >= 1000000) {
                  return (value / 10000 / 100).toFixed(2);
                } else {
                  return (value / 1000).toFixed(2);
                }
              }}
            />
            <ValueCard
              title="Процент от общей выручки"
              unit="%"
              value={allCard?.percentageProceedsNight ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString().replace(",", ".")}
            />
            <ValueCard
              title="Средний чек"
              unit="₽"
              value={allCard?.avgCheckNight ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Ср. длина чека"
              value={allCard?.avgLengthCheck ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString().replace(",", ".")}
            />
            <ValueCard
              title="Города"
              value={allCard?.uniqueCity ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Магазины"
              value={allCard?.uniqueNightStore ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Карты"
              value={allCard?.uniqueCardNumber ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Чеки"
              value={allCard?.countUniqueCheck ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Подгруппы"
              value={allCard?.countUniqueSubGroups ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
            <ValueCard
              title="Номенклатуры"
              value={allCard?.countUniqueProducts ?? 0}
              isLoading={isAllCardLoading}
              formatter={(value) => value.toLocaleString()}
            />
          </div>
          <TopNightStoreCards
            data={
              topNightStore?.[
                `top${indicator.name}` as keyof typeof topNightStore
              ] ?? []
            }
            indicatorValue={indicator.value}
            isLoading={isTopNightStoreLoading}
          />
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            <AgeProceedsGraph
              isLoading={isAgeProceedsGraphLoading}
              graph={ageProceedsGraph}
            />
            <AgeCountCheckGraph
              isLoading={isAgeCountCheckGraphLoading}
              graph={ageCountCheckGraph}
            />
            <AgeAvgCheckGraph
              isLoading={isAgeAvgCheckGraphLoading}
              graph={ageAvgCheckGraph}
            />
            <GraphProceeds
              isLoading={isProceedsGraphLoading}
              graph={proceedsGraph}
            />
          </div>
          <div className="grid grid-cols-3 gap-2 max-md:grid-cols-1">
            <List
              title="Топ товаров по выручке"
              suffix={
                indicator.value === "percentageProceedsNight" ? " %" : " ₽"
              }
              isLoading={isTopNomenclatureLoading}
              options={topNomenclature?.[
                `top${indicator.name}` as keyof typeof topNomenclature
              ]?.map((product) => ({
                name: product.product,
                count: `${product[indicator.value as keyof typeof product].toLocaleString()}`,
              }))}
            />
            <List
              title="Анти-топ товаров по выручке"
              suffix={
                indicator.value === "percentageProceedsNight" ? " %" : " ₽"
              }
              isLoading={isTopNomenclatureLoading}
              options={topNomenclature?.[
                `antiTop${indicator.name}` as keyof typeof topNomenclature
              ]?.map((product) => ({
                name: product.product,
                count: `${product[indicator.value as keyof typeof product].toLocaleString()}`,
              }))}
            />
            <WeekdayNomenclatureCard
              indicator={indicator}
              isLoading={isNightSalesWeekdayNomenclatureLoading}
              optionsData={nightSalesWeekdayNomenclature}
            />
            <List
              title="Топ подгрупп по выручке"
              suffix={
                indicator.value === "percentageProceedsNight" ? " %" : " ₽"
              }
              isLoading={isTopSubgroupsLoading}
              options={topSubgroups?.[
                `top${indicator.name}` as keyof typeof topSubgroups
              ]?.map((group) => ({
                name: group.subGroups,
                count: `${group[indicator.value as keyof typeof group].toLocaleString()}`,
              }))}
            />
            <List
              title="Анти-топ подгрупп по выручке"
              suffix={
                indicator.value === "percentageProceedsNight" ? " %" : " ₽"
              }
              isLoading={isTopSubgroupsLoading}
              options={topSubgroups?.[
                `antiTop${indicator.name}` as keyof typeof topSubgroups
              ]?.map((group) => ({
                name: group.subGroups,
                count: `${group[indicator.value as keyof typeof group].toLocaleString()}`,
              }))}
            />
            <List
              title="Топ дней по выручке"
              suffix={
                indicator.value === "percentageProceedsNight" ? " %" : " ₽"
              }
              isLoading={isNightSalesWeekdayLoading}
              options={nightSalesWeekday?.[
                `sort${indicator.name}` as keyof typeof nightSalesWeekday
              ]?.map((group) => ({
                name: group.dayName,
                count: `${group[indicator.value as keyof typeof group].toLocaleString()}`,
              }))}
              className="[&_[data-slot=card-content]]:gap-0.5 [&_>_div]:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 max-md:grid-cols-1">
            <HourProceedsGraph
              isLoading={isHourProceedsGraphLoading}
              graph={hourProceedsGraph}
            />
            <UniqueCheckGraph
              isLoading={isUniqueCheckGraphLoading}
              graph={uniqueCheckGraph}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
