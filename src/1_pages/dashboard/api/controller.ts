import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { GetWeeklyRevenueResponse } from "./types";
import { DashboardService } from "./service";

export const useDashboard = () => {
  const dashboard = useQuery<GetWeeklyRevenueResponse>({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getAllData(),
    refetchInterval: 10000, // Ревалидация каждую минуту (60 секунд)
    placeholderData: keepPreviousData, // Показывать старые данные во время обновления
  });

  return {
    dashboard: dashboard.data,
    isDashboardLoading: dashboard.isLoading,
    isDashboardFetching: dashboard.isFetching,
  };
};
