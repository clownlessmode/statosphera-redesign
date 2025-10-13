import { useDashboard } from "../../dashboard/api/controller";
import React, { lazy, Suspense, useMemo, useCallback } from "react";
import WeeklyRevenueSkeleton from "@widgets/dashboard/weekly-revenue/ui/weekly-revenue-skeleton";
import MarginSkeleton from "@widgets/dashboard/margin/ui/margin-skeleton";
import MarkupSkeleton from "@widgets/dashboard/markup/ui/markup-skeleton";
import WriteOffIndicatorSkeleton from "@widgets/dashboard/write-offs-indicator/ui/write-offs-indicator-skeleton";
import ChannelRevenueSkeleton from "@widgets/dashboard/channel-revenue/ui/channel-revenue-skeleton";
import CurrentRevenueSkeleton from "@widgets/dashboard/current-revenue/current-revenue-skeleton";
import CurrentCheckSkeleton from "@widgets/dashboard/current-check/current-check-skeleton";
import AverageCheckSkeleton from "@widgets/dashboard/avarage-check/avarage-check-skeleton";
import TopWriteOffSkeleton from "@widgets/dashboard/top-writeoffs/top-writeoffs-skeleton";
import TodayCheckSkeleton from "@widgets/dashboard/today-check/today-check-skeleton";
import TodayRevenueSkeleton from "@widgets/dashboard/today-revenue/today-revenue-skeleton";
import AntiLoyalTopSkeleton from "@widgets/dashboard/anti-loyal-top/anti-loyal-top-skeleton";
import PlanPercentSkeleton from "@widgets/dashboard/plan-percent/plan-precent-skeleton";
import HoursRevenueSkeleton from "@widgets/dashboard/hours-revenue/hours-revenue-skeleton";
import LoyaltySkeleton from "@widgets/dashboard/loaylty/loyalty-skeleton";
import ImRevenueSkeleton from "@widgets/dashboard/im-revenue/im-revenue-skeleton";
import LeaderImSalesSkeleton from "@widgets/dashboard/leader-im-sales/leader-im-sales-skeleton";
import { Nps } from "@widgets/dashboard/nps";
import { ROLES } from "@shared/constants/roles";
import { useSession } from "@entities/session";
import { Slider } from "@widgets/dashboard/nps/ui/slider";
import {
  Cities,
  Regions,
  Stores,
  Summary,
} from "@widgets/dashboard/nps/ui/modal/tabs";
import { useNightShops } from "../api/controller";
import { List } from "@shared/ui/list";
import RevenuePerMonthNightSkeleton from "@widgets/tv/revenue-per-month-ns/revenue-per-month-night-skeleton";
import CountNSRegionSkeleton from "@widgets/tv/count-ns-region/count-ns-region-skeleton";
import MonthRevenueNSSkeleton from "@widgets/tv/month-revenue-ns/month-revenue-ns-skeleton";
import LastMonthRevenuNSSkeleton from "@widgets/tv/last-month-revenu/last-month-revenu-skeleton";
import { useTheme } from "@app/providers/theme-provider";
import { FULL_THEME_PRESETS } from "@shared/constants/theme-presets";

const CountNSRegion = lazy(
  () => import("@widgets/tv/count-ns-region/count-ns-region"),
);
const YearsRevenuNS = lazy(
  () => import("@widgets/tv/years-revenu-ns/years-revenu-ns"),
);
const LastMonthRevenuNS = lazy(
  () => import("@widgets/tv/last-month-revenu/last-month-revenu"),
);
const MonthRevenueNS = lazy(
  () => import("@widgets/tv/month-revenue-ns/month-revenue-ns"),
);
const RevenuePerMonthNight = lazy(
  () => import("@widgets/tv/revenue-per-month-ns/month-revenue-night"),
);
const WeeklyRevenue = lazy(
  () => import("@widgets/dashboard/weekly-revenue/ui/weekly-revenue"),
);
const WriteOffIndicator = lazy(
  () =>
    import("@widgets/dashboard/write-offs-indicator/ui/write-offs-indicator"),
);
const WriteOffHouseholds = lazy(
  () =>
    import("@widgets/dashboard/write-offs-households/ui/write-off-households"),
);

const ChannelRevenue = lazy(
  () => import("@widgets/dashboard/channel-revenue/ui/channel-revenue"),
);
//const SalesStructure = lazy(
//  () => import("@widgets/dashboard/sales-structure/sales-structure")
//);
const CurrentRevenue = lazy(
  () => import("@widgets/dashboard/current-revenue/current-revenue"),
);
const CurrentCheck = lazy(
  () => import("@widgets/dashboard/current-check/current-check"),
);
const AverageCheck = lazy(
  () => import("@widgets/dashboard/avarage-check/avarage-check"),
);
const WriteoffsLeaders = lazy(
  () => import("@widgets/dashboard/writeoffs-leaders/writeoffs-leaders"),
);
const Loyalty = lazy(() => import("@widgets/dashboard/loaylty/loyalty"));
const ImRevenue = lazy(
  () => import("@widgets/dashboard/im-revenue/im-revenue"),
);
const LeaderImSales = lazy(
  () => import("@widgets/dashboard/leader-im-sales/leader-im-sales"),
);
const HoursRevenue = lazy(
  () => import("@widgets/dashboard/hours-revenue/hours-revenue"),
);
const PlanPercent = lazy(
  () => import("@widgets/dashboard/plan-percent/plan-percent"),
);
//const TopWriteoffs = lazy(
//  () => import("@widgets/dashboard/top-writeoffs/top-writeoffs")
//);
const AntiLoyalTop = lazy(
  () => import("@widgets/dashboard/anti-loyal-top/anti-loyal-top"),
);
const TodayRevenue = lazy(
  () => import("@widgets/dashboard/today-revenue/today-revenue"),
);
const TodayCheck = lazy(
  () => import("@widgets/dashboard/today-check/today-check"),
);
const Margin = lazy(() => import("@widgets/dashboard/margin/ui/margin"));
const Markup = lazy(() => import("@widgets/dashboard/markup/ui/markup"));

export const TV = () => {
  const { dashboard, isDashboardLoading } = useDashboard();
  const { nightShops, isNightShopsLoading } = useNightShops();
  const { session } = useSession();
  const { applyFullPreset, setCustomThemeMode, setTheme } = useTheme();

  // Принудительно применяем мягкую светлую тему используя тот же механизм что и в настройках
  // Оптимизация: используем useCallback и проверяем, нужно ли применять тему
  const applySoftTheme = useCallback(async () => {
    const softPreset = FULL_THEME_PRESETS.find((p) => p.id === "soft");
    if (softPreset) {
      // Устанавливаем светлый режим для кастомной темы
      setCustomThemeMode("dark");
      // Переключаем на кастомную тему
      setTheme("custom");
      // Применяем пресет
      await applyFullPreset(softPreset);
    }
  }, [applyFullPreset, setCustomThemeMode, setTheme]);

  React.useEffect(() => {
    // Применяем тему только один раз при монтировании
    applySoftTheme();
  }, [applySoftTheme]);

  // Группа статистики за текущий месяц - мемоизирована
  const currentMonthStats = useMemo(
    () => (
      <div className="grid grid-rows-3 gap-2 h-full">
        <Suspense fallback={<CurrentRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.curentMonth?.data?.[0] ? (
            <CurrentRevenue
              isLoading={isDashboardLoading}
              proceeds={dashboard.curentMonth.data[0].proceeds}
              proceedsYoY={dashboard.curentMonth.data[0].proceedsYoY}
              proceedsYoYPercent={
                dashboard.curentMonth.data[0].proceedsYoYPercent
              }
              tv={true}
            />
          ) : (
            <CurrentRevenueSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<CurrentCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.curentCheck?.data?.[0] ? (
            <CurrentCheck
              negative={dashboard.curentCheck.data[0].negative}
              isLoading={isDashboardLoading}
              check={dashboard.curentCheck.data[0].check}
              checkYoY={dashboard.curentCheck.data[0].checkYoY}
              checkYoYPercent={dashboard.curentCheck.data[0].checkYoYPercent}
              tv={true}
            />
          ) : (
            <CurrentCheckSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<AverageCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.curentAvgCheck?.data?.[0] ? (
            <AverageCheck
              negative={dashboard.curentAvgCheck.data[0].negative}
              isLoading={isDashboardLoading}
              avgCheck={dashboard.curentAvgCheck.data[0].avgCheck}
              avgCheckYoY={dashboard.curentAvgCheck.data[0].avgCheckYoY}
              avgCheckYoYPercent={
                dashboard.curentAvgCheck.data[0].avgCheckYoYPercent
              }
              tv={true}
            />
          ) : (
            <AverageCheckSkeleton />
          )}
        </Suspense>
      </div>
    ),
    [
      isDashboardLoading,
      dashboard?.curentMonth?.data,
      dashboard?.curentCheck?.data,
      dashboard?.curentAvgCheck?.data,
    ],
  );

  // Группа статистики за сегодня - мемоизирована
  const todayStats = useMemo(
    () => (
      <div className="grid grid-rows-2 gap-2 h-full">
        <Suspense fallback={<TodayRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.salesHours?.data?.card1 ? (
            <TodayRevenue
              isLoading={isDashboardLoading}
              negative={dashboard.salesHours.data.card1.negative}
              proceedsTotal={dashboard.salesHours.data.card1.proceedsTotal}
              proceedsWoYPercent={
                dashboard.salesHours.data.card1.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard.salesHours.data.card1.weekAgoProceedsTotal
              }
              tv={true}
            />
          ) : (
            <TodayRevenueSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<TodayCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.salesHours?.data?.card2 ? (
            <TodayCheck
              isLoading={isDashboardLoading}
              negative={dashboard.salesHours.data.card2.negative}
              proceedsTotal={dashboard.salesHours.data.card2.proceedsTotal}
              proceedsWoYPercent={
                dashboard.salesHours.data.card2.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard.salesHours.data.card2.weekAgoProceedsTotal
              }
              tv={true}
            />
          ) : (
            <TodayCheckSkeleton />
          )}
        </Suspense>
      </div>
    ),
    [
      isDashboardLoading,
      dashboard?.salesHours?.data?.card1,
      dashboard?.salesHours?.data?.card2,
    ],
  );

  // Группа основных показателей - мемоизирована
  const mainStats = useMemo(
    () => (
      <div className="grid grid-rows-3 gap-2 h-full">
        <div className="flex flex-row gap-2">
          <Suspense fallback={<MarginSkeleton />}>
            {!isDashboardLoading && dashboard?.curentMarzha?.data?.[0] ? (
              <Margin
                isLoading={isDashboardLoading}
                data={dashboard.curentMarzha.data[0].marginPercent}
                tv={true}
              />
            ) : (
              <MarginSkeleton />
            )}
          </Suspense>
          <Suspense fallback={<MarkupSkeleton />}>
            {!isDashboardLoading && dashboard?.curentMarkup?.data?.[0] ? (
              <Markup
                isLoading={isDashboardLoading}
                percent={dashboard.curentMarkup.data[0].markupPercent}
                proceeds={dashboard.curentMarkup.data[0].profit}
                tv={true}
              />
            ) : (
              <MarkupSkeleton />
            )}
          </Suspense>
        </div>
        <Suspense fallback={<WriteOffIndicatorSkeleton />}>
          {!isDashboardLoading && dashboard?.curentWriteOff?.data?.[0] ? (
            <WriteOffIndicator
              negative={dashboard.curentWriteOff.data[0].negative}
              isLoading={isDashboardLoading}
              writeOff={dashboard.curentWriteOff.data[0].writeOff}
              writeOffPercent={dashboard.curentWriteOff.data[0].writeOffPercent}
              writeOffYoY={dashboard.curentWriteOff.data[0].writeOffYoY}
              writeOffYoYPercent={
                dashboard.curentWriteOff.data[0].writeOffYoYPercent
              }
              tv={true}
            />
          ) : (
            <WriteOffIndicatorSkeleton />
          )}
        </Suspense>
        {session?.role !== ROLES.OFFICE_MM && (
          <Suspense fallback={<WriteOffIndicatorSkeleton />}>
            {!isDashboardLoading && dashboard?.curentHouseHold?.data?.[0] ? (
              <WriteOffHouseholds
                negative={dashboard.curentHouseHold.data[0].negative}
                isLoading={isDashboardLoading}
                householdGoods={
                  dashboard.curentHouseHold.data[0].householdGoods
                }
                householdGoodsPercent={
                  dashboard.curentHouseHold.data[0].householdGoodsPercent
                }
                householdGoodsYoY={
                  dashboard.curentHouseHold.data[0].householdGoodsYoY
                }
                householdGoodsYoYPercent={
                  dashboard.curentHouseHold.data[0].householdGoodsYoYPercent
                }
                tv={true}
              />
            ) : (
              <WriteOffIndicatorSkeleton />
            )}
          </Suspense>
        )}
      </div>
    ),
    [
      isDashboardLoading,
      dashboard?.curentMarzha?.data,
      dashboard?.curentMarkup?.data,
      dashboard?.curentWriteOff?.data,
      dashboard?.curentHouseHold?.data,
      session?.role,
    ],
  );

  // Группа статистики ночных магазинов - мемоизирована
  const nightShopsStats = useMemo(
    () => (
      <div className="grid grid-rows-3 gap-2 h-full">
        <Suspense fallback={<MonthRevenueNSSkeleton />}>
          {!isNightShopsLoading && nightShops?.monthProceed ? (
            <MonthRevenueNS
              dataCurrent={nightShops.monthProceed.dataCurrent}
              dataPast={nightShops.monthProceed.dataPast}
              dynamic={nightShops.monthProceed.dynamic}
              isLoading={isNightShopsLoading}
              tv={true}
            />
          ) : (
            <MonthRevenueNSSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<LastMonthRevenuNSSkeleton />}>
          {!isNightShopsLoading && nightShops?.monthProceed ? (
            <LastMonthRevenuNS
              dataCurrent={nightShops.monthProceed.dataCurrent}
              dataPast={nightShops.monthProceed.dataPast}
              dynamic={nightShops.monthProceed.dynamic}
              isLoading={isNightShopsLoading}
              tv={true}
            />
          ) : (
            <LastMonthRevenuNSSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<MonthRevenueNSSkeleton />}>
          {!isNightShopsLoading && nightShops?.yearsProceed ? (
            <YearsRevenuNS
              dataCurrent={nightShops.yearsProceed.dataCurrent}
              dataPast={nightShops.yearsProceed.dataPast}
              dynamic={nightShops.yearsProceed.dynamic}
              isLoading={isNightShopsLoading}
              tv={true}
            />
          ) : (
            <MonthRevenueNSSkeleton />
          )}
        </Suspense>
      </div>
    ),
    [isNightShopsLoading, nightShops?.monthProceed, nightShops?.yearsProceed],
  );

  // Группа лояльности и ИМ - мемоизирована
  const loyaltyAndImStats = useMemo(
    () => (
      <div className="grid grid-rows-3 gap-2 h-full">
        <Suspense fallback={<LoyaltySkeleton />}>
          {!isDashboardLoading && dashboard?.curentAppLoyal?.data?.[0] ? (
            <Loyalty
              isLoading={isDashboardLoading}
              appLoyalPercent={dashboard.curentAppLoyal.data[0].appLoyalPercent}
              checkLoyal={dashboard.curentAppLoyal.data[0].checkLoyal}
              tv={true}
            />
          ) : (
            <LoyaltySkeleton />
          )}
        </Suspense>
        <Suspense fallback={<ImRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.currentCardIm?.data?.[0] ? (
            <ImRevenue
              negative={dashboard.currentCardIm.data[0].negative}
              isLoading={isDashboardLoading}
              proceedsIm={dashboard.currentCardIm.data[0].proceedsIm}
              proceedsImYoY={dashboard.currentCardIm.data[0].proceedsImYoY}
              proceedsImYoYPercent={
                dashboard.currentCardIm.data[0].proceedsImYoYPercent
              }
              tv={true}
            />
          ) : (
            <ImRevenueSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<LeaderImSalesSkeleton />}>
          {!isDashboardLoading && dashboard?.bestCardIm?.data?.[0] ? (
            <LeaderImSales
              isLoading={isDashboardLoading}
              idStore={dashboard.bestCardIm.data[0].idStore}
              proceedsIm={dashboard.bestCardIm.data[0].proceedsIm}
              storeName={dashboard.bestCardIm.data[0].storeName}
              tv={true}
            />
          ) : (
            <LeaderImSalesSkeleton />
          )}
        </Suspense>
      </div>
    ),
    [
      isDashboardLoading,
      dashboard?.curentAppLoyal?.data,
      dashboard?.currentCardIm?.data,
      dashboard?.bestCardIm?.data,
    ],
  );

  // Мемоизируем массивы компонентов для Slider - исправляем проблему с переключением
  const chartsComponents = useMemo(
    () => [
      <Suspense key="weekly-revenue" fallback={<WeeklyRevenueSkeleton />}>
        {!isDashboardLoading && dashboard?.salesSevenDays ? (
          <WeeklyRevenue
            data={dashboard.salesSevenDays}
            isLoading={isDashboardLoading}
            tv={true}
          />
        ) : (
          <WeeklyRevenueSkeleton />
        )}
      </Suspense>,
      <Suspense key="hours-revenue" fallback={<HoursRevenueSkeleton />}>
        {!isDashboardLoading && dashboard?.salesHours?.data?.graph ? (
          <HoursRevenue
            isLoading={isDashboardLoading}
            data={dashboard.salesHours.data.graph}
            tv={true}
          />
        ) : (
          <HoursRevenueSkeleton />
        )}
      </Suspense>,
    ],
    [
      isDashboardLoading,
      dashboard?.salesSevenDays,
      dashboard?.salesHours?.data?.graph,
    ],
  );

  const npsComponents = useMemo(
    () => [<Summary key="summary" tv={true} />, <Nps key="nps" tv={true} />],
    [],
  );

  const storesComponents = useMemo(
    () => [
      <Stores key="stores-best" best={true} tv={true} />,
      <Stores key="stores-worst" worst={true} tv={true} />,
    ],
    [],
  );

  const citiesComponents = useMemo(
    () => [
      <Cities key="cities-worst" worst={true} tv={true} />,
      <Cities key="cities-best" best={true} tv={true} />,
      <Regions key="regions" tv={true} />,
    ],
    [],
  );

  return (
    <div className="bg-muted min-h-screen w-full flex flex-col">
      <div
        className="rounded-3xl h-screen bg-background grid-rows-3 p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        //style={{ gridTemplateRows: "repeat(3, 32%)" }}
      >
        <Slider components={chartsComponents} />
        <Slider components={npsComponents} />
        <Slider components={storesComponents} />
        <Slider components={citiesComponents} />
        <div className="row-start-2 flex flex-col gap-2 h-full">
          <Slider
            className="border-0 bg-inherit py-0 *:px-0"
            components={useMemo(
              () => [
                <div key="current-month-stats">{currentMonthStats}</div>,
                <div key="today-stats">{todayStats}</div>,
              ],
              [currentMonthStats, todayStats],
            )}
          />
        </div>
        <div>
          <Suspense fallback={<ChannelRevenueSkeleton />}>
            {!isDashboardLoading && dashboard?.salesChannel ? (
              <ChannelRevenue
                isLoading={isDashboardLoading}
                data={dashboard.salesChannel}
                tv={true}
              />
            ) : (
              <ChannelRevenueSkeleton />
            )}
          </Suspense>
        </div>

        {mainStats}
        <Slider
          indexClass={{ class: "border-0 bg-inherit py-0 *:px-0", index: 3 }}
          components={useMemo(
            () => [
              <Suspense
                key="revenue-per-month"
                fallback={<RevenuePerMonthNightSkeleton />}
              >
                {!isNightShopsLoading && nightShops?.proceedPerMonth ? (
                  <RevenuePerMonthNight
                    isLoading={isNightShopsLoading}
                    data={nightShops.proceedPerMonth}
                    tv={true}
                  />
                ) : (
                  <RevenuePerMonthNightSkeleton />
                )}
              </Suspense>,
              <List
                key="anti-top-stores"
                title="Анти топ ночных магазинов (по выручке)"
                className="border-0 p-0"
                isLoading={isNightShopsLoading}
                options={
                  nightShops?.antiTopstoreProceed?.map((group) => ({
                    name: group.storeName,
                    price: `${Math.round(group?.proceeds).toLocaleString().replace(/,/g, " ")}₽`,
                  })) || []
                }
                tv={true}
              />,
              <List
                key="top-stores"
                title="Топ ночных магазинов (по выручке)"
                className="border-0 p-0"
                isLoading={isNightShopsLoading}
                options={
                  nightShops?.topStoreProceed?.map((group) => ({
                    name: group.storeName,
                    price: `${Math.round(group?.proceeds).toLocaleString().replace(/,/g, " ")}₽`,
                  })) || []
                }
                tv={true}
              />,
              <div key="night-shops-stats">{nightShopsStats}</div>,
              <Suspense
                key="count-ns-region"
                fallback={<CountNSRegionSkeleton />}
              >
                {!isNightShopsLoading && nightShops?.countStoreRegion ? (
                  <CountNSRegion
                    data={nightShops.countStoreRegion}
                    isLoading={isNightShopsLoading}
                    tv={true}
                  />
                ) : (
                  <CountNSRegionSkeleton />
                )}
              </Suspense>,
            ],
            [
              isNightShopsLoading,
              nightShops?.proceedPerMonth,
              nightShops?.antiTopstoreProceed,
              nightShops?.topStoreProceed,
              nightShopsStats,
              nightShops?.countStoreRegion,
            ],
          )}
        />

        <Suspense fallback={<TopWriteOffSkeleton />}>
          {!isDashboardLoading && dashboard?.leaderWriteOffs ? (
            <WriteoffsLeaders
              data={dashboard.leaderWriteOffs}
              isLoading={isDashboardLoading}
              tv={true}
            />
          ) : (
            <TopWriteOffSkeleton />
          )}
        </Suspense>
        {session?.role !== ROLES.OFFICE_MM && loyaltyAndImStats}

        {session?.role !== ROLES.OFFICE_MM && (
          <Suspense fallback={<PlanPercentSkeleton />}>
            {!isDashboardLoading && dashboard?.cardOneExe?.data?.[0] ? (
              <PlanPercent
                isLoading={isDashboardLoading}
                planAvgCheckForecastPercent={
                  dashboard.cardOneExe.data[0].planAvgCheckForecastPercent
                }
                planCheckForecastPercent={
                  dashboard.cardOneExe.data[0].planCheckForecastPercent
                }
                planProceedsForecastPercent={
                  dashboard.cardOneExe.data[0].planProceedsForecastPercent
                }
                planProceedsQcForecastPercent={
                  dashboard.cardOneExe.data[0].planProceedsQcForecastPercent ||
                  null
                }
                planShareOfPaymentsQcForecastPercent={
                  dashboard.cardOneExe.data[0]
                    .planShareOfPaymentsQcForecastPercent || null
                }
                tv={true}
              />
            ) : (
              <PlanPercentSkeleton />
            )}
          </Suspense>
        )}
        {/*<Suspense fallback={<TopWriteOffSkeleton />}>
          <TopWriteoffs
            isLoading={isDashboardLoading}
            data={dashboard?.topWriteOff}
          />
        </Suspense>*/}

        <Suspense fallback={<AntiLoyalTopSkeleton />}>
          {!isDashboardLoading && dashboard?.antitopLoyalApp?.data ? (
            <AntiLoyalTop
              isLoading={isDashboardLoading}
              data={dashboard.antitopLoyalApp.data as any}
              tv={true}
            />
          ) : (
            <AntiLoyalTopSkeleton />
          )}
        </Suspense>
      </div>
    </div>
  );
};
