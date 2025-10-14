import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { GetWeeklyRevenueResponse, SalesDayResponse } from "./types";
import { DashboardService } from "./service";

export const useDashboard = () => {
  const dashboard = useQuery<GetWeeklyRevenueResponse>({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getAllData(),
    refetchInterval: 30000, // Увеличиваем интервал до 30 секунд для TV режима
    refetchIntervalInBackground: false, // Не обновляем когда вкладка неактивна
    staleTime: 20000, // Данные считаются свежими 20 секунд
    placeholderData: keepPreviousData, // Показывать старые данные во время обновления
  });

  return {
    dashboard: dashboard.data,
    isDashboardLoading: dashboard.isLoading,
    isDashboardFetching: dashboard.isFetching,
  };
};

export const useSalesDay = () => {
  const salesDay = useQuery<SalesDayResponse>({
    queryKey: ["salesDay"],
    queryFn: () => DashboardService.getSalesDayData(),
    refetchInterval: 10000, // Ревалидация каждую минуту (60 секунд)
    placeholderData: keepPreviousData, // Показывать старые данные во время обновления
  });

  return {
    salesDay: salesDay.data,
    isSalesDayLoading: salesDay.isLoading,
    isSalesDayFetching: salesDay.isFetching,
  };
};

export const useDashboardData = () => {
  const dashboardQuery = useQuery<GetWeeklyRevenueResponse>({
    queryKey: ["dashboard"],
    queryFn: () => DashboardService.getAllData(),
    refetchInterval: 10000,
    placeholderData: keepPreviousData,
  });

  const salesDayQuery = useQuery<SalesDayResponse>({
    queryKey: ["salesDay"],
    queryFn: () => DashboardService.getSalesDayData(),
    refetchInterval: 10000,
    placeholderData: keepPreviousData,
  });

  // Объединяем данные, приоритет отдаем salesDay для salesHours
  const combinedData =
    dashboardQuery.data && salesDayQuery.data
      ? {
          ...dashboardQuery.data,
          salesHours: salesDayQuery.data.salesHours, // Используем данные из sales-day API
        }
      : dashboardQuery.data;

  return {
    dashboard: combinedData,
    isDashboardLoading: dashboardQuery.isLoading || salesDayQuery.isLoading,
    isDashboardFetching: dashboardQuery.isFetching || salesDayQuery.isFetching,
  };
};
