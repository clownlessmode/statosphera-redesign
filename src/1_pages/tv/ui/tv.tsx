import { useDashboard } from "../../dashboard/api/controller";
import { lazy, Suspense } from "react";
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
  return (
    <div className="bg-muted min-h-screen w-full flex flex-col">
      <div
        className="rounded-3xl h-screen bg-background grid-rows-3 p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
        //style={{ gridTemplateRows: "repeat(3, 32%)" }}
      >
        <Slider
          components={[
            <Suspense fallback={<WeeklyRevenueSkeleton />}>
              <WeeklyRevenue
                data={dashboard?.salesSevenDays}
                isLoading={isDashboardLoading}
                tv={true}
              />
            </Suspense>,
            <Suspense fallback={<HoursRevenueSkeleton />}>
              <HoursRevenue
                isLoading={isDashboardLoading}
                data={dashboard?.salesHours.data?.graph}
                tv={true}
              />
            </Suspense>,
          ]}
        />
        <Slider components={[<Summary tv={true} />, <Nps tv={true} />]} />
        <Slider
          components={[
            <Stores best={true} tv={true} />,
            <Stores worst={true} tv={true} />,
          ]}
        />
        <Slider components={[<Cities tv={true} />, <Regions tv={true} />]} />
        <div className="row-start-2 flex flex-col gap-2 h-full">
          <Slider
            className="border-0 bg-inherit py-0 *:px-0"
            components={[
              <div className="grid grid-rows-3 gap-2 h-full">
                <Suspense fallback={<CurrentRevenueSkeleton />}>
                  <CurrentRevenue
                    isLoading={isDashboardLoading}
                    proceeds={dashboard?.curentMonth.data?.[0]?.proceeds}
                    proceedsYoY={dashboard?.curentMonth.data?.[0]?.proceedsYoY}
                    proceedsYoYPercent={
                      dashboard?.curentMonth.data?.[0]?.proceedsYoYPercent
                    }
                    tv={true}
                  />
                </Suspense>
                <Suspense fallback={<CurrentCheckSkeleton />}>
                  <CurrentCheck
                    negative={dashboard?.curentCheck.data?.[0]?.negative}
                    isLoading={isDashboardLoading}
                    check={dashboard?.curentCheck.data?.[0]?.check}
                    checkYoY={dashboard?.curentCheck.data?.[0]?.checkYoY}
                    checkYoYPercent={
                      dashboard?.curentCheck.data?.[0]?.checkYoYPercent
                    }
                    tv={true}
                  />
                </Suspense>
                <Suspense fallback={<AverageCheckSkeleton />}>
                  <AverageCheck
                    negative={dashboard?.curentAvgCheck.data?.[0]?.negative}
                    isLoading={isDashboardLoading}
                    avgCheck={dashboard?.curentAvgCheck.data?.[0]?.avgCheck}
                    avgCheckYoY={
                      dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoY
                    }
                    avgCheckYoYPercent={
                      dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoYPercent
                    }
                    tv={true}
                  />
                </Suspense>
              </div>,
              <div className="grid grid-rows-2 gap-2 h-full">
                <Suspense fallback={<TodayRevenueSkeleton />}>
                  <TodayRevenue
                    isLoading={isDashboardLoading}
                    negative={dashboard?.salesHours.data?.card1.negative}
                    proceedsTotal={
                      dashboard?.salesHours.data?.card1.proceedsTotal
                    }
                    proceedsWoYPercent={
                      dashboard?.salesHours.data?.card1.proceedsWoWPercent
                    }
                    weekAgoProceedsTotal={
                      dashboard?.salesHours.data?.card1.weekAgoProceedsTotal
                    }
                    tv={true}
                  />
                </Suspense>
                <Suspense fallback={<TodayCheckSkeleton />}>
                  <TodayCheck
                    isLoading={isDashboardLoading}
                    negative={dashboard?.salesHours.data?.card2.negative}
                    proceedsTotal={
                      dashboard?.salesHours.data?.card2.proceedsTotal
                    }
                    proceedsWoYPercent={
                      dashboard?.salesHours.data?.card2.proceedsWoWPercent
                    }
                    weekAgoProceedsTotal={
                      dashboard?.salesHours.data?.card2.weekAgoProceedsTotal
                    }
                    tv={true}
                  />
                </Suspense>
              </div>,
            ]}
          />
        </div>
        <div>
          <Suspense fallback={<ChannelRevenueSkeleton />}>
            <ChannelRevenue
              isLoading={isDashboardLoading}
              data={dashboard?.salesChannel}
              tv={true}
            />
          </Suspense>
        </div>

        <div className="grid grid-rows-3 gap-2 h-full">
          <div className="flex flex-row gap-2">
            <Suspense fallback={<MarginSkeleton />}>
              <Margin
                isLoading={isDashboardLoading}
                data={dashboard?.curentMarzha.data?.[0]?.marginPercent}
                tv={true}
              />
            </Suspense>
            <Suspense fallback={<MarkupSkeleton />}>
              <Markup
                isLoading={isDashboardLoading}
                percent={dashboard?.curentMarkup.data?.[0]?.markupPercent}
                proceeds={dashboard?.curentMarkup.data?.[0]?.profit}
                tv={true}
              />
            </Suspense>
          </div>
          <Suspense fallback={<WriteOffIndicatorSkeleton />}>
            <WriteOffIndicator
              negative={dashboard?.curentWriteOff.data?.[0]?.negative}
              isLoading={isDashboardLoading}
              writeOff={dashboard?.curentWriteOff.data?.[0]?.writeOff}
              writeOffPercent={
                dashboard?.curentWriteOff.data?.[0]?.writeOffPercent
              }
              writeOffYoY={dashboard?.curentWriteOff.data?.[0]?.writeOffYoY}
              writeOffYoYPercent={
                dashboard?.curentWriteOff.data?.[0]?.writeOffYoYPercent
              }
              tv={true}
            />
          </Suspense>
          {/*session?.role == ROLES.OFFICE_MM && (
            <Suspense fallback={<LoyaltySkeleton />}>
              <Loyalty
                isLoading={isDashboardLoading}
                appLoyalPercent={
                  dashboard?.curentAppLoyal.data?.[0]?.appLoyalPercent
                }
                checkLoyal={dashboard?.curentAppLoyal.data?.[0]?.checkLoyal}
              />
            </Suspense>
          )*/}
          {session?.role !== ROLES.OFFICE_MM && (
            <Suspense fallback={<WriteOffIndicatorSkeleton />}>
              <WriteOffHouseholds
                negative={dashboard?.curentHouseHold.data?.[0]?.negative}
                isLoading={isDashboardLoading}
                householdGoods={
                  dashboard?.curentHouseHold.data?.[0]?.householdGoods
                }
                householdGoodsPercent={
                  dashboard?.curentHouseHold.data?.[0]?.householdGoodsPercent
                }
                householdGoodsYoY={
                  dashboard?.curentHouseHold.data?.[0]?.householdGoodsYoY
                }
                householdGoodsYoYPercent={
                  dashboard?.curentHouseHold.data?.[0]?.householdGoodsYoYPercent
                }
                tv={true}
              />
            </Suspense>
          )}
        </div>
        <Slider
          indexClass={{ class: "border-0 bg-inherit py-0 *:px-0", index: 3 }}
          components={[
            <Suspense fallback={<RevenuePerMonthNightSkeleton />}>
              <RevenuePerMonthNight
                isLoading={isNightShopsLoading}
                data={nightShops?.proceedPerMonth}
                tv={true}
              />
            </Suspense>,
            <List
              title="Анти топ ночных магазинов (по выручке)"
              className="border-0 p-0"
              isLoading={isNightShopsLoading}
              options={nightShops?.antiTopstoreProceed.map((group) => ({
                name: group.storeName,
                price: `${Math.round(group?.proceeds).toLocaleString().replace(/,/g, " ")}₽`,
              }))}
              tv={true}
            />,
            <List
              title="Топ ночных магазинов (по выручке)"
              className="border-0 p-0"
              isLoading={isNightShopsLoading}
              options={nightShops?.topStoreProceed.map((group) => ({
                name: group.storeName,
                price: `${Math.round(group?.proceeds).toLocaleString().replace(/,/g, " ")}₽`,
              }))}
              tv={true}
            />,
            <div className="grid grid-rows-3 gap-2 h-full">
              <Suspense fallback={<MonthRevenueNSSkeleton />}>
                <MonthRevenueNS
                  dataCurrent={nightShops?.monthProceed.dataCurrent}
                  dataPast={nightShops?.monthProceed.dataPast}
                  dynamic={nightShops?.monthProceed.dynamic}
                  isLoading={isNightShopsLoading}
                  tv={true}
                />
              </Suspense>
              <Suspense fallback={<LastMonthRevenuNSSkeleton />}>
                <LastMonthRevenuNS
                  dataCurrent={nightShops?.monthProceed.dataCurrent}
                  dataPast={nightShops?.monthProceed.dataPast}
                  dynamic={nightShops?.monthProceed.dynamic}
                  isLoading={isNightShopsLoading}
                  tv={true}
                />
              </Suspense>
              <Suspense fallback={<MonthRevenueNSSkeleton />}>
                <YearsRevenuNS
                  dataCurrent={nightShops?.yearsProceed.dataCurrent}
                  dataPast={nightShops?.yearsProceed.dataPast}
                  dynamic={nightShops?.yearsProceed.dynamic}
                  isLoading={isNightShopsLoading}
                  tv={true}
                />
              </Suspense>
            </div>,
            <Suspense fallback={<CountNSRegionSkeleton />}>
              <CountNSRegion
                data={nightShops?.countStoreRegion}
                isLoading={isNightShopsLoading}
                tv={true}
              />
            </Suspense>,
          ]}
        />

        <Suspense fallback={<TopWriteOffSkeleton />}>
          <WriteoffsLeaders
            data={dashboard?.leaderWriteOffs}
            isLoading={isDashboardLoading}
            tv={true}
          />
        </Suspense>
        {session?.role !== ROLES.OFFICE_MM && (
          <div className={"grid grid-rows-3 gap-2 h-full"}>
            <Suspense fallback={<LoyaltySkeleton />}>
              <Loyalty
                isLoading={isDashboardLoading}
                appLoyalPercent={
                  dashboard?.curentAppLoyal.data?.[0]?.appLoyalPercent
                }
                checkLoyal={dashboard?.curentAppLoyal.data?.[0]?.checkLoyal}
                tv={true}
              />
            </Suspense>
            <Suspense fallback={<ImRevenueSkeleton />}>
              <ImRevenue
                negative={dashboard?.currentCardIm.data?.[0]?.negative}
                isLoading={isDashboardLoading}
                proceedsIm={dashboard?.currentCardIm.data?.[0]?.proceedsIm}
                proceedsImYoY={
                  dashboard?.currentCardIm.data?.[0]?.proceedsImYoY
                }
                proceedsImYoYPercent={
                  dashboard?.currentCardIm.data?.[0]?.proceedsImYoYPercent
                }
                tv={true}
              />
            </Suspense>
            <Suspense fallback={<LeaderImSalesSkeleton />}>
              <LeaderImSales
                isLoading={isDashboardLoading}
                idStore={dashboard?.bestCardIm.data?.[0]?.idStore}
                proceedsIm={dashboard?.bestCardIm.data?.[0]?.proceedsIm}
                storeName={dashboard?.bestCardIm.data?.[0]?.storeName}
                tv={true}
              />
            </Suspense>
          </div>
        )}

        {session?.role !== ROLES.OFFICE_MM && (
          <Suspense fallback={<PlanPercentSkeleton />}>
            <PlanPercent
              isLoading={isDashboardLoading}
              planAvgCheckForecastPercent={
                dashboard?.cardOneExe.data?.[0]?.planAvgCheckForecastPercent
              }
              planCheckForecastPercent={
                dashboard?.cardOneExe.data?.[0]?.planCheckForecastPercent
              }
              planProceedsForecastPercent={
                dashboard?.cardOneExe.data?.[0]?.planProceedsForecastPercent
              }
              planProceedsQcForecastPercent={
                dashboard?.cardOneExe.data?.[0]
                  ?.planProceedsQcForecastPercent || null
              }
              planShareOfPaymentsQcForecastPercent={
                dashboard?.cardOneExe.data?.[0]
                  ?.planShareOfPaymentsQcForecastPercent || null
              }
              tv={true}
            />
          </Suspense>
        )}
        {/*<Suspense fallback={<TopWriteOffSkeleton />}>
          <TopWriteoffs
            isLoading={isDashboardLoading}
            data={dashboard?.topWriteOff}
          />
        </Suspense>*/}

        <Suspense fallback={<AntiLoyalTopSkeleton />}>
          <AntiLoyalTop
            isLoading={isDashboardLoading}
            data={dashboard?.antitopLoyalApp.data as any}
            tv={true}
          />
        </Suspense>
      </div>
    </div>
  );
};
