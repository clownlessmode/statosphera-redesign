import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  CitiesFilterResponse,
  FiltersShopsService,
  PartnersFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
} from "./service";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { RequestDto } from "@pages/night-stores/config";

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

  const partnersNightStores = useMutation<
    PartnersFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await FiltersShopsService.getPartnersNightStores(dto);
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      return response;
    },
  });

  const regionsNightStores = useMutation<
    RegionsFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await FiltersShopsService.getRegionsNightStores(dto);
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      return response;
    },
  });

  const citiesNightStores = useMutation<
    CitiesFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await FiltersShopsService.getCitiesNightStores(dto);
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      return response;
    },
  });
  const shopsNightStores = useMutation<
    ShopsFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await FiltersShopsService.getShopsNightStores(dto);
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
    getPartnersNightStores: partnersNightStores.mutateAsync,
    isPartnersNightStoresLoading: partnersNightStores.isPending,
    //
    getRegionsNightStores: regionsNightStores.mutateAsync,
    isRegionsNightStoresLoading: regionsNightStores.isPending,
    //
    getCitiesNightStores: citiesNightStores.mutateAsync,
    isCitiesNightStoresLoading: citiesNightStores.isPending,
    //
    getShopsNightStores: shopsNightStores.mutateAsync,
    isShopsNightStoresLoading: shopsNightStores.isPending,
  };
};
