// import WeeklyRevenueSkeleton from "@widgets/dashboard/weekly-revenue/ui/weekly-revenue-skeleton";
// import { Header } from "@widgets/header";
// import { useDashboard } from "../api/controller";

const Dashboard = () => {
  // const { dashboard, isDashboardLoading } = useDashboard();
  // console.log(dashboard, isDashboardLoading);
  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
    </>
    // <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
    //   <Header title="Главная" />
    //   <div className="rounded-3xl h-full min-h-full bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"></div>
    // </div>
  );
};

export default Dashboard;
{
  /* <Suspense fallback={}>
          <WeeklyRevenue
            data={dashboard?.salesSevenDays}
            isLoading={isDashboardLoading}
          />
        </Suspense> */
}
{
  /* <WeeklyRevenueSkeleton />
        <div className="flex flex-col gap-2 h-fit ">
          <div className="flex flex-row gap-2">
            <Suspense fallback={<div>Loading...</div>}>
              <Margin
                isLoading={isDashboardLoading}
                data={dashboard?.curentMarzha.data?.[0]?.marginPercent}
              />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <Markup
                isLoading={isDashboardLoading}
                percent={dashboard?.curentMarkup.data?.[0]?.markupPercent}
                proceeds={dashboard?.curentMarkup.data?.[0]?.profit}
              />
            </Suspense>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <WriteOffIndicator
              isLoading={isDashboardLoading}
              writeOff={dashboard?.curentWriteOff.data?.[0]?.writeOff}
              writeOffPercent={
                dashboard?.curentWriteOff.data?.[0]?.writeOffPercent
              }
              writeOffYoY={dashboard?.curentWriteOff.data?.[0]?.writeOffYoY}
              writeOffYoYPercent={
                dashboard?.curentWriteOff.data?.[0]?.writeOffYoYPercent
              }
            />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <WriteOffHouseholds
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
            />
          </Suspense>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ChannelRevenue
            isLoading={isDashboardLoading}
            data={dashboard?.salesChannel}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <SalesStructure
            isLoading={isDashboardLoading}
            data={dashboard?.salesStructure}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-2 max-h-[400px]">
            <CurrentRevenue
              isLoading={isDashboardLoading}
              proceeds={dashboard?.curentMonth.data?.[0]?.proceeds}
              proceedsYoY={dashboard?.curentMonth.data?.[0]?.proceedsYoY}
              proceedsYoYPercent={
                dashboard?.curentMonth.data?.[0]?.proceedsYoYPercent
              }
            />
            <CurrentCheck
              isLoading={isDashboardLoading}
              check={dashboard?.curentCheck.data?.[0]?.check}
              checkYoY={dashboard?.curentCheck.data?.[0]?.checkYoY}
              checkYoYPercent={
                dashboard?.curentCheck.data?.[0]?.checkYoYPercent
              }
            />
            <AverageCheck
              isLoading={isDashboardLoading}
              avgCheck={dashboard?.curentAvgCheck.data?.[0]?.avgCheck}
              avgCheckYoY={dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoY}
              avgCheckYoYPercent={
                dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoYPercent
              }
            />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <WriteoffsLeaders
            data={dashboard?.leaderWriteOffs}
            isLoading={isDashboardLoading}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-2 max-h-[400px]">
            <Loyalty
              isLoading={isDashboardLoading}
              proceeds={dashboard?.curentAppLoyal.data?.[0]?.proceeds}
              proceedsYoY={dashboard?.curentAppLoyal.data?.[0]?.proceedsYoY}
              proceedsYoYPercent={
                dashboard?.curentAppLoyal.data?.[0]?.proceedsYoYPercent
              }
            />
            <ImRevenue
              isLoading={isDashboardLoading}
              proceedsIm={dashboard?.currentCardIm.data?.[0]?.proceedsIm}
              proceedsImYoY={dashboard?.currentCardIm.data?.[0]?.proceedsImYoY}
              proceedsImYoYPercent={
                dashboard?.currentCardIm.data?.[0]?.proceedsImYoYPercent
              }
            />
            <LeaderImSales
              isLoading={isDashboardLoading}
              idStore={dashboard?.bestCardIm.data?.[0]?.idStore}
              proceedsIm={dashboard?.bestCardIm.data?.[0]?.proceedsIm}
              storeName={dashboard?.bestCardIm.data?.[0]?.storeName}
            />
          </div>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <HoursRevenue
            isLoading={isDashboardLoading}
            data={dashboard?.salesHours.data.graph}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
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
              dashboard?.cardOneExe.data?.[0]?.planProceedsQcForecastPercent ||
              null
            }
            planShareOfPaymentsQcForecastPercent={
              dashboard?.cardOneExe.data?.[0]
                ?.planShareOfPaymentsQcForecastPercent || null
            }
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <TopWriteoffs
            isLoading={isDashboardLoading}
            data={dashboard?.topWriteOff}
          />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AntiLoyalTop isLoading={isDashboardLoading} data={undefined} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-col gap-2 max-h-[400px]">
            <TodayRevenue
              isLoading={isDashboardLoading}
              negative={dashboard?.salesHours.data?.card1.negative}
              proceedsTotal={dashboard?.salesHours.data?.card1.proceedsTotal}
              proceedsWoYPercent={
                dashboard?.salesHours.data?.card1.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard?.salesHours.data?.card1.weekAgoProceedsTotal
              }
            />
            <TodayCheck
              isLoading={isDashboardLoading}
              negative={dashboard?.salesHours.data?.card2.negative}
              proceedsTotal={dashboard?.salesHours.data?.card2.proceedsTotal}
              proceedsWoYPercent={
                dashboard?.salesHours.data?.card2.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard?.salesHours.data?.card2.weekAgoProceedsTotal
              }
            />
          </div>
        </Suspense> */
}

// import WeeklyRevenueSkeleton from "@widgets/dashboard/weekly-revenue/ui/weekly-revenue-skeleton";
// import { lazy } from "react";
// import { Suspense } from "react";

// import { lazy, Suspense } from "react";
// import WeeklyRevenueSkeleton from "@widgets/dashboard/weekly-revenue/ui/weekly-revenue-skeleton";
// const Margin = lazy(() => import("@widgets/dashboard/margin/ui/margin"));
// const Markup = lazy(() => import("@widgets/dashboard/markup/ui/markup"));
// const WriteOffIndicator = lazy(
//   () =>
//     import("@widgets/dashboard/write-offs-indicator/ui/write-offs-indicator")
// );
// const WriteOffHouseholds = lazy(
//   () =>
//     import("@widgets/dashboard/write-offs-households/ui/write-off-households")
// );
// const WeeklyRevenue = lazy(
//   () => import("@widgets/dashboard/weekly-revenue/ui/weekly-revenue")
// );
// const ChannelRevenue = lazy(
//   () => import("@widgets/dashboard/channel-revenue/ui/channel-revenue")
// );
// const SalesStructure = lazy(
//   () => import("@widgets/dashboard/sales-structure/sales-structure")
// );
// const CurrentRevenue = lazy(
//   () => import("@widgets/dashboard/current-revenue/current-revenue")
// );
// const CurrentCheck = lazy(
//   () => import("@widgets/dashboard/current-check/current-check")
// );
// const AverageCheck = lazy(
//   () => import("@widgets/dashboard/avarage-check/avarage-check")
// );
// const WriteoffsLeaders = lazy(
//   () => import("@widgets/dashboard/writeoffs-leaders/writeoffs-leaders")
// );
// const Loyalty = lazy(() => import("@widgets/dashboard/loaylty/loyalty"));
// const ImRevenue = lazy(
//   () => import("@widgets/dashboard/im-revenue/im-revenue")
// );
// const LeaderImSales = lazy(
//   () => import("@widgets/dashboard/leader-im-sales/leader-im-sales")
// );
// const HoursRevenue = lazy(
//   () => import("@widgets/dashboard/hours-revenue/hours-revenue")
// );
// const PlanPercent = lazy(
//   () => import("@widgets/dashboard/plan-percent/plan-percent")
// );
// const TopWriteoffs = lazy(
//   () => import("@widgets/dashboard/top-writeoffs/top-writeoffs")
// );
// const AntiLoyalTop = lazy(
//   () => import("@widgets/dashboard/anti-loyal-top/anti-loyal-top")
// );
// const TodayRevenue = lazy(
//   () => import("@widgets/dashboard/today-revenue/today-revenue")
// );
// const TodayCheck = lazy(
//   () => import("@widgets/dashboard/today-check/today-check")
// );
