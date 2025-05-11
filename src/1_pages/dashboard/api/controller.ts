import { useQuery } from "@tanstack/react-query";

import { GetWeeklyRevenueResponse } from "./types";
import { DashboardService } from "./service";

export const useDashboard = () => {
  const dashboard = useQuery<GetWeeklyRevenueResponse>({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getWeeklyRevenue(),
  });

  return {
    
    dashboard: dashboard.data,
    isDashboardLoading: dashboard.isLoading,
  };
};
