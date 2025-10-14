import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { GetNightShopsResponse } from "./types";
import { NightShopsService } from "./service";

export const useNightShops = () => {
  const nightShops = useQuery<GetNightShopsResponse>({
    queryKey: ["nightShops"],
    queryFn: () => NightShopsService.getNightShopsData(),
    refetchInterval: 30000, // Увеличиваем интервал до 30 секунд для TV режима
    refetchIntervalInBackground: false, // Не обновляем когда вкладка неактивна
    staleTime: 20000, // Данные считаются свежими 20 секунд
    placeholderData: keepPreviousData, // Показывать старые данные во время обновления
  });

  return {
    nightShops: nightShops.data,
    isNightShopsLoading: nightShops.isLoading,
    isNightShopsFetching: nightShops.isFetching,
  };
};
