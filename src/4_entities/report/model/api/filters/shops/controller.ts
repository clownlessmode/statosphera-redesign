import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  CitiesFilterResponse,
  FiltersShopsService,
  PartnersFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
} from "./service";
import { FilterApiPayload } from "@widgets/report/sheet/ui/commerce/model/store";

export const useFilters = () => {
  const queryClient = useQueryClient();

  const partners = useMutation<
    PartnersFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsService.getPartners(dto);
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      return response;
    },
  });

  const regions = useMutation<
    RegionsFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsService.getRegions(dto);
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
      const response = await FiltersShopsService.getCities(dto);
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      return response;
    },
  });
  const shops = useMutation<ShopsFilterResponse[], ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersShopsService.getShops(dto);
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      return response;
    },
  });

  return {
    getPartners: partners.mutateAsync,
    isPartnersLoading: partners.isPending,
    //
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
