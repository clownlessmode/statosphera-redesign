import { useQuery, keepPreviousData } from "@tanstack/react-query";

import { GetNightShopsResponse } from "./types";
import { NightShopsService } from "./service";

export const useNightShops = () => {
  const nightShops = useQuery<GetNightShopsResponse>({
    queryKey: ["nightShops"],
    queryFn: () => NightShopsService.getNightShopsData(),
    refetchInterval: 10000, // Ревалидация каждую минуту (60 секунд)
    placeholderData: keepPreviousData, // Показывать старые данные во время обновления
  });

  return {
    nightShops: nightShops.data,
    isNightShopsLoading: nightShops.isLoading,
    isNightShopsFetching: nightShops.isFetching,
  };
};
