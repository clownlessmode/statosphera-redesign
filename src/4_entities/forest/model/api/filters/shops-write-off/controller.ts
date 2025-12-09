import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  RegionsFilterResponse,
  CitiesFilterResponse,
  ShopsFilterResponse,
} from "./types";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { FiltersShopsWriteOffService } from "./service";

export const useFiltersWriteOff = () => {
  const queryClient = useQueryClient();

  const regions = useMutation<
    RegionsFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsWriteOffService.getRegions(dto);
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      return response;
    },
  });
  const cities = useMutation<
    CitiesFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsWriteOffService.getCities(dto);
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      return response;
    },
  });
  const shops = useMutation<ShopsFilterResponse[], ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsWriteOffService.getShops(dto);
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      return response;
    },
  });

  return {
    getRegions: regions.mutateAsync,
    isRegionsLoading: regions.isPending,
    //
    getCities: cities.mutateAsync,
    isCitiesLoading: cities.isPending,
    //
    getShops: shops.mutateAsync,
    isShopsLoading: shops.isPending,
    //
  };
};
