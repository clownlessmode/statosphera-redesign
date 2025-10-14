import { useDashboard } from "../../dashboard/api/controller";
import { lazy, Suspense, useCallback, useEffect } from "react";
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

  useEffect(() => {
    // Применяем тему только один раз при монтировании
    applySoftTheme();
  }, []);

  // Группа статистики за текущий месяц - мемоизирована

  return (
    <div className="bg-muted min-h-screen w-full flex flex-col">
      <div className="rounded-3xl h-screen bg-background grid-rows-3 p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Slider
          components={[
            <Suspense fallback={<WeeklyRevenueSkeleton tv={true} />}>
              {!isDashboardLoading && dashboard?.salesSevenDays ? (
                <WeeklyRevenue
                  data={dashboard.salesSevenDays}
                  isLoading={isDashboardLoading}
                  tv={true}
                />
              ) : (
                <WeeklyRevenueSkeleton tv={true} />
              )}
            </Suspense>,
            <Suspense fallback={<HoursRevenueSkeleton tv={true} />}>
              {!isDashboardLoading && dashboard?.salesHours?.data?.graph ? (
                <HoursRevenue
                  isLoading={isDashboardLoading}
                  data={dashboard.salesHours.data.graph}
                  tv={true}
                />
              ) : (
                <HoursRevenueSkeleton tv={true} />
              )}
            </Suspense>,
          ]}
        />
        <Slider
          components={[
            <Summary key="summary" tv={true} />,
            <Nps key="nps" tv={true} />,
          ]}
        />
        <Slider
          components={[
            <Stores key="stores-best" best={true} tv={true} />,
            <Stores key="stores-worst" worst={true} tv={true} />,
          ]}
        />
        <Slider
          components={[
            <Cities key="cities-worst" worst={true} tv={true} />,
            <Cities key="cities-best" best={true} tv={true} />,
            <Regions key="regions" tv={true} />,
          ]}
        />
        <div className="row-start-2 flex flex-col gap-2 h-full">
          <Slider
            className="border-0 bg-inherit py-0 *:px-0"
            components={[
              <div className="grid grid-rows-3 gap-1 h-full">
                <Suspense fallback={<CurrentRevenueSkeleton tv={true} />}>
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
                    <CurrentRevenueSkeleton tv={true} />
                  )}
                </Suspense>
                <Suspense fallback={<CurrentCheckSkeleton tv={true} />}>
                  {!isDashboardLoading && dashboard?.curentCheck?.data?.[0] ? (
                    <CurrentCheck
                      negative={dashboard.curentCheck.data[0].negative}
                      isLoading={isDashboardLoading}
                      check={dashboard.curentCheck.data[0].check}
                      checkYoY={dashboard.curentCheck.data[0].checkYoY}
                      checkYoYPercent={
                        dashboard.curentCheck.data[0].checkYoYPercent
                      }
                      tv={true}
                    />
                  ) : (
                    <CurrentCheckSkeleton tv={true} />
                  )}
                </Suspense>
                <Suspense fallback={<AverageCheckSkeleton tv={true} />}>
                  {!isDashboardLoading &&
                  dashboard?.curentAvgCheck?.data?.[0] ? (
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
                    <AverageCheckSkeleton tv={true} />
                  )}
                </Suspense>
              </div>,
              <div className="grid grid-rows-2 gap-1 h-full">
                <Suspense fallback={<TodayRevenueSkeleton tv={true} />}>
                  {!isDashboardLoading && dashboard?.salesHours?.data?.card1 ? (
                    <TodayRevenue
                      isLoading={isDashboardLoading}
                      negative={dashboard.salesHours.data.card1.negative}
                      proceedsTotal={
                        dashboard.salesHours.data.card1.proceedsTotal
                      }
                      proceedsWoYPercent={
                        dashboard.salesHours.data.card1.proceedsWoWPercent
                      }
                      weekAgoProceedsTotal={
                        dashboard.salesHours.data.card1.weekAgoProceedsTotal
                      }
                      tv={true}
                    />
                  ) : (
                    <TodayRevenueSkeleton tv={true} />
                  )}
                </Suspense>
                <Suspense fallback={<TodayCheckSkeleton tv={true} />}>
                  {!isDashboardLoading && dashboard?.salesHours?.data?.card2 ? (
                    <TodayCheck
                      isLoading={isDashboardLoading}
                      negative={dashboard.salesHours.data.card2.negative}
                      proceedsTotal={
                        dashboard.salesHours.data.card2.proceedsTotal
                      }
                      proceedsWoYPercent={
                        dashboard.salesHours.data.card2.proceedsWoWPercent
                      }
                      weekAgoProceedsTotal={
                        dashboard.salesHours.data.card2.weekAgoProceedsTotal
                      }
                      tv={true}
                    />
                  ) : (
                    <TodayCheckSkeleton tv={true} />
                  )}
                </Suspense>
              </div>,
            ]}
          />
        </div>
        <div>
          <Suspense fallback={<ChannelRevenueSkeleton tv={true} />}>
            {!isDashboardLoading && dashboard?.salesChannel ? (
              <ChannelRevenue
                isLoading={isDashboardLoading}
                data={dashboard.salesChannel}
                tv={true}
              />
            ) : (
              <ChannelRevenueSkeleton tv={true} />
            )}
          </Suspense>
        </div>
        <div className="grid grid-rows-3 gap-1 h-full">
          <div className="flex flex-row gap-1">
            <Suspense fallback={<MarginSkeleton tv={true} />}>
              {!isDashboardLoading && dashboard?.curentMarzha?.data?.[0] ? (
                <Margin
                  isLoading={isDashboardLoading}
                  data={dashboard.curentMarzha.data[0].marginPercent}
                  tv={true}
                />
              ) : (
                <MarginSkeleton tv={true} />
              )}
            </Suspense>
            <Suspense fallback={<MarkupSkeleton tv={true} />}>
              {!isDashboardLoading && dashboard?.curentMarkup?.data?.[0] ? (
                <Markup
                  isLoading={isDashboardLoading}
                  percent={dashboard.curentMarkup.data[0].markupPercent}
                  proceeds={dashboard.curentMarkup.data[0].profit}
                  tv={true}
                />
              ) : (
                <MarkupSkeleton tv={true} />
              )}
            </Suspense>
          </div>
          <Suspense fallback={<WriteOffIndicatorSkeleton tv={true} />}>
            {!isDashboardLoading && dashboard?.curentWriteOff?.data?.[0] ? (
              <WriteOffIndicator
                negative={dashboard.curentWriteOff.data[0].negative}
                isLoading={isDashboardLoading}
                writeOff={dashboard.curentWriteOff.data[0].writeOff}
                writeOffPercent={
                  dashboard.curentWriteOff.data[0].writeOffPercent
                }
                writeOffYoY={dashboard.curentWriteOff.data[0].writeOffYoY}
                writeOffYoYPercent={
                  dashboard.curentWriteOff.data[0].writeOffYoYPercent
                }
                tv={true}
              />
            ) : (
              <WriteOffIndicatorSkeleton tv={true} />
            )}
          </Suspense>
          <Suspense fallback={<WriteOffIndicatorSkeleton tv={true} />}>
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
              <WriteOffIndicatorSkeleton tv={true} />
            )}
          </Suspense>
        </div>
        <Slider
          indexClass={{ class: "border-0 bg-inherit py-0 *:px-0", index: 3 }}
          components={[
            <Suspense
              key="revenue-per-month"
              fallback={<RevenuePerMonthNightSkeleton tv={true} />}
            >
              {!isNightShopsLoading && nightShops?.proceedPerMonth ? (
                <RevenuePerMonthNight
                  isLoading={isNightShopsLoading}
                  data={nightShops.proceedPerMonth}
                  tv={true}
                />
              ) : (
                <RevenuePerMonthNightSkeleton tv={true} />
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
            <div className="grid grid-rows-3 gap-1 h-full">
              <Suspense fallback={<MonthRevenueNSSkeleton tv={true} />}>
                {!isNightShopsLoading && nightShops?.monthProceed ? (
                  <MonthRevenueNS
                    dataCurrent={nightShops.monthProceed.dataCurrent}
                    dataPast={nightShops.monthProceed.dataPast}
                    dynamic={nightShops.monthProceed.dynamic}
                    isLoading={isNightShopsLoading}
                    tv={true}
                  />
                ) : (
                  <MonthRevenueNSSkeleton tv={true} />
                )}
              </Suspense>
              <Suspense fallback={<LastMonthRevenuNSSkeleton tv={true} />}>
                {!isNightShopsLoading && nightShops?.monthProceed ? (
                  <LastMonthRevenuNS
                    dataCurrent={nightShops.monthProceed.dataCurrent}
                    dataPast={nightShops.monthProceed.dataPast}
                    dynamic={nightShops.monthProceed.dynamic}
                    isLoading={isNightShopsLoading}
                    tv={true}
                  />
                ) : (
                  <LastMonthRevenuNSSkeleton tv={true} />
                )}
              </Suspense>
              <Suspense fallback={<MonthRevenueNSSkeleton tv={true} />}>
                {!isNightShopsLoading && nightShops?.yearsProceed ? (
                  <YearsRevenuNS
                    dataCurrent={nightShops.yearsProceed.dataCurrent}
                    dataPast={nightShops.yearsProceed.dataPast}
                    dynamic={nightShops.yearsProceed.dynamic}
                    isLoading={isNightShopsLoading}
                    tv={true}
                  />
                ) : (
                  <MonthRevenueNSSkeleton tv={true} />
                )}
              </Suspense>
            </div>,
            <Suspense
              key="count-ns-region"
              fallback={<CountNSRegionSkeleton tv={true} />}
            >
              {!isNightShopsLoading && nightShops?.countStoreRegion ? (
                <CountNSRegion
                  data={nightShops.countStoreRegion}
                  isLoading={isNightShopsLoading}
                  tv={true}
                />
              ) : (
                <CountNSRegionSkeleton tv={true} />
              )}
            </Suspense>,
          ]}
        />
        <Suspense fallback={<TopWriteOffSkeleton tv={true} />}>
          {!isDashboardLoading && dashboard?.leaderWriteOffs ? (
            <WriteoffsLeaders
              data={dashboard.leaderWriteOffs}
              isLoading={isDashboardLoading}
              tv={true}
            />
          ) : (
            <TopWriteOffSkeleton tv={true} />
          )}
        </Suspense>
        <div className="grid grid-rows-3 gap-1 h-full">
          <Suspense fallback={<LoyaltySkeleton tv={true} />}>
            {!isDashboardLoading && dashboard?.curentAppLoyal?.data?.[0] ? (
              <Loyalty
                isLoading={isDashboardLoading}
                appLoyalPercent={
                  dashboard.curentAppLoyal.data[0].appLoyalPercent
                }
                checkLoyal={dashboard.curentAppLoyal.data[0].checkLoyal}
                tv={true}
              />
            ) : (
              <LoyaltySkeleton tv={true} />
            )}
          </Suspense>
          <Suspense fallback={<ImRevenueSkeleton tv={true} />}>
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
              <ImRevenueSkeleton tv={true} />
            )}
          </Suspense>
          <Suspense fallback={<LeaderImSalesSkeleton tv={true} />}>
            {!isDashboardLoading && dashboard?.bestCardIm?.data?.[0] ? (
              <LeaderImSales
                isLoading={isDashboardLoading}
                idStore={dashboard.bestCardIm.data[0].idStore}
                proceedsIm={dashboard.bestCardIm.data[0].proceedsIm}
                storeName={dashboard.bestCardIm.data[0].storeName}
                tv={true}
              />
            ) : (
              <LeaderImSalesSkeleton tv={true} />
            )}
          </Suspense>
        </div>
        <Suspense fallback={<PlanPercentSkeleton tv={true} />}>
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
            <PlanPercentSkeleton tv={true} />
          )}
        </Suspense>
        <Suspense fallback={<AntiLoyalTopSkeleton tv={true} />}>
          {!isDashboardLoading && dashboard?.antitopLoyalApp?.data ? (
            <AntiLoyalTop
              isLoading={isDashboardLoading}
              data={dashboard.antitopLoyalApp.data as any}
              tv={true}
            />
          ) : (
            <AntiLoyalTopSkeleton tv={true} />
          )}
        </Suspense>
      </div>
    </div>
  );
};
