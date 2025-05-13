// import { Header } from "@widgets/header";
// // import { PlanPercent } from "@widgets/dashboard/plan-percent";
// import { Margin } from "@widgets/dashboard/margin";
// import { Markup } from "@widgets/dashboard/markup";
// import { WriteOffIndicator } from "@widgets/dashboard/write-offs-indicator";
// import { WriteOffHouseholds } from "@widgets/dashboard/write-offs-households";
// // import { DistributionSalesChannels } from "@widgets/dashboard/distribution-sales-channels";
// import { WeeklyRevenue } from "@widgets/dashboard/weekly-revenue";
// import { useDashboard } from "../api/controller";
// import { ChannelRevenue } from "@widgets/dashboard/channel-revenue";
// import SalesStructure from "@widgets/dashboard/sales-structure/sales-structure";
// import CurrentRevenue from "@widgets/dashboard/current-revenue/current-revenue";
// import CurrentCheck from "@widgets/dashboard/current-check/current-check";
// import AverageCheck from "@widgets/dashboard/avarage-check/avarage-check";
// import WriteoffsLeaders from "@widgets/dashboard/writeoffs-leaders/writeoffs-leaders";
// import Loyalty from "@widgets/dashboard/loaylty/loyalty";
// import ImRevenue from "@widgets/dashboard/im-revenue/im-revenue";
// import LeaderImSales from "@widgets/dashboard/leader-im-sales/leader-im-sales";
// import HoursRevenue from "@widgets/dashboard/hours-revenue/hours-revenue";
// import PlanPercent from "@widgets/dashboard/plan-percent/plan-percent";
// import TopWriteoffs from "@widgets/dashboard/top-writeoffs/top-writeoffs";
// import AntiLoyalTop from "@widgets/dashboard/anti-loyal-top/anti-loyal-top";
// import TodayRevenue from "@widgets/dashboard/today-revenue/today-revenue";
// import TodayCheck from "@widgets/dashboard/today-check/today-check";

import { Header } from "@widgets/header";

// const Dashboard = () => {
//   const { dashboard, isDashboardLoading } = useDashboard();
//   console.log(dashboard);
//   return (
//     <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
//       <Header title="Главная" />
//       <div className="rounded-3xl h-fit bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
//         <WeeklyRevenue
//           data={dashboard?.salesSevenDays}
//           isLoading={isDashboardLoading}
//         />
//         <div className="flex flex-col gap-2 h-fit ">
//           <div className="flex flex-row gap-2">
//             <Margin
//               isLoading={isDashboardLoading}
//               data={dashboard?.curentMarzha.data?.[0]?.marginPercent}
//             />
//             <Markup
//               isLoading={isDashboardLoading}
//               percent={dashboard?.curentMarkup.data?.[0]?.markupPercent}
//               proceeds={dashboard?.curentMarkup.data?.[0]?.profit}
//             />
//           </div>
//           <WriteOffIndicator
//             isLoading={isDashboardLoading}
//             writeOff={dashboard?.curentWriteOff.data?.[0]?.writeOff}
//             writeOffPercent={
//               dashboard?.curentWriteOff.data?.[0]?.writeOffPercent
//             }
//             writeOffYoY={dashboard?.curentWriteOff.data?.[0]?.writeOffYoY}
//             writeOffYoYPercent={
//               dashboard?.curentWriteOff.data?.[0]?.writeOffYoYPercent
//             }
//           />
//           <WriteOffHouseholds
//             isLoading={isDashboardLoading}
//             householdGoods={
//               dashboard?.curentHouseHold.data?.[0]?.householdGoods
//             }
//             householdGoodsPercent={
//               dashboard?.curentHouseHold.data?.[0]?.householdGoodsPercent
//             }
//             householdGoodsYoY={
//               dashboard?.curentHouseHold.data?.[0]?.householdGoodsYoY
//             }
//             householdGoodsYoYPercent={
//               dashboard?.curentHouseHold.data?.[0]?.householdGoodsYoYPercent
//             }
//           />
//         </div>
//         <ChannelRevenue
//           isLoading={isDashboardLoading}
//           data={dashboard?.salesChannel}
//         />
//         <SalesStructure
//           isLoading={isDashboardLoading}
//           data={dashboard?.salesStructure}
//         />
//         <div className="flex flex-col gap-2 max-h-[400px]">
//           <CurrentRevenue
//             isLoading={isDashboardLoading}
//             proceeds={dashboard?.curentMonth.data?.[0]?.proceeds}
//             proceedsYoY={dashboard?.curentMonth.data?.[0]?.proceedsYoY}
//             proceedsYoYPercent={
//               dashboard?.curentMonth.data?.[0]?.proceedsYoYPercent
//             }
//           />
//           <CurrentCheck
//             isLoading={isDashboardLoading}
//             check={dashboard?.curentCheck.data?.[0]?.check}
//             checkYoY={dashboard?.curentCheck.data?.[0]?.checkYoY}
//             checkYoYPercent={dashboard?.curentCheck.data?.[0]?.checkYoYPercent}
//           />
//           <AverageCheck
//             isLoading={isDashboardLoading}
//             avgCheck={dashboard?.curentAvgCheck.data?.[0]?.avgCheck}
//             avgCheckYoY={dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoY}
//             avgCheckYoYPercent={
//               dashboard?.curentAvgCheck.data?.[0]?.avgCheckYoYPercent
//             }
//           />
//         </div>
//         <WriteoffsLeaders
//           data={dashboard?.leaderWriteOffs}
//           isLoading={isDashboardLoading}
//         />
//         <div className="flex flex-col gap-2 max-h-[400px]">
//           <Loyalty
//             isLoading={isDashboardLoading}
//             proceeds={dashboard?.curentAppLoyal.data?.[0]?.proceeds}
//             proceedsYoY={dashboard?.curentAppLoyal.data?.[0]?.proceedsYoY}
//             proceedsYoYPercent={
//               dashboard?.curentAppLoyal.data?.[0]?.proceedsYoYPercent
//             }
//           />
//           <ImRevenue
//             isLoading={isDashboardLoading}
//             proceedsIm={dashboard?.currentCardIm.data?.[0]?.proceedsIm}
//             proceedsImYoY={dashboard?.currentCardIm.data?.[0]?.proceedsImYoY}
//             proceedsImYoYPercent={
//               dashboard?.currentCardIm.data?.[0]?.proceedsImYoYPercent
//             }
//           />
//           <LeaderImSales
//             isLoading={isDashboardLoading}
//             idStore={dashboard?.bestCardIm.data?.[0]?.idStore}
//             proceedsIm={dashboard?.bestCardIm.data?.[0]?.proceedsIm}
//             storeName={dashboard?.bestCardIm.data?.[0]?.storeName}
//           />
//         </div>
//         <HoursRevenue
//           isLoading={isDashboardLoading}
//           data={dashboard?.salesHours.data.graph}
//         />
//         <PlanPercent
//           isLoading={isDashboardLoading}
//           planAvgCheckForecastPercent={
//             dashboard?.cardOneExe.data?.[0]?.planAvgCheckForecastPercent
//           }
//           planCheckForecastPercent={
//             dashboard?.cardOneExe.data?.[0]?.planCheckForecastPercent
//           }
//           planProceedsForecastPercent={
//             dashboard?.cardOneExe.data?.[0]?.planProceedsForecastPercent
//           }
//           planProceedsQcForecastPercent={
//             dashboard?.cardOneExe.data?.[0]?.planProceedsQcForecastPercent ||
//             null
//           }
//           planShareOfPaymentsQcForecastPercent={
//             dashboard?.cardOneExe.data?.[0]
//               ?.planShareOfPaymentsQcForecastPercent || null
//           }
//         />
//         <TopWriteoffs
//           isLoading={isDashboardLoading}
//           data={dashboard?.topWriteOff}
//         />
//         <AntiLoyalTop isLoading={isDashboardLoading} data={undefined} />
//         <div className="flex flex-col gap-2 max-h-[400px]">
//           <TodayRevenue
//             isLoading={isDashboardLoading}
//             negative={dashboard?.salesHours.data?.card1.negative}
//             proceedsTotal={dashboard?.salesHours.data?.card1.proceedsTotal}
//             proceedsWoYPercent={
//               dashboard?.salesHours.data?.card1.proceedsWoWPercent
//             }
//             weekAgoProceedsTotal={
//               dashboard?.salesHours.data?.card1.weekAgoProceedsTotal
//             }
//           />
//           <TodayCheck
//             isLoading={isDashboardLoading}
//             negative={dashboard?.salesHours.data?.card2.negative}
//             proceedsTotal={dashboard?.salesHours.data?.card2.proceedsTotal}
//             proceedsWoYPercent={
//               dashboard?.salesHours.data?.card2.proceedsWoWPercent
//             }
//             weekAgoProceedsTotal={
//               dashboard?.salesHours.data?.card2.weekAgoProceedsTotal
//             }
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

const dashboard = () => {
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Главная" />
      <div className="rounded-3xl h-fit bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        dashboard
      </div>
    </div>
  );
};

export default dashboard;
