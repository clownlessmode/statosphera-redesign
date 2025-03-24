import { Earnings } from "@widgets/dashboard/earnings";
import { Header } from "@widgets/header";
import { PlanPercent } from "@widgets/dashboard/plan-percent";
import { Margin } from "@widgets/dashboard/margin";
import { Markup } from "@widgets/dashboard/markup";
import { WriteOffIndicator } from "@widgets/dashboard/write-offs-indicator";
import { WriteOffHouseholds } from "@widgets/dashboard/write-offs-households";
import { DistributionSalesChannels } from "@widgets/dashboard/distribution-sales-channels";
const Dashboard = () => {
  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Главная" />
      <div className="rounded-3xl bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        <div className="grid gap-4">
          <Earnings />
          <DistributionSalesChannels />
        </div>
        <div className="flex flex-col gap-2 h-fit ">
          <div className="flex flex-row gap-2">
            <Margin />
            <Markup />
          </div>
          <WriteOffIndicator />
          <WriteOffHouseholds />
        </div>
        <PlanPercent />
      </div>
    </div>
  );
};

export default Dashboard;
