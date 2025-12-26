import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { NightStoresService } from "./service";
import {
  AllCardResponse,
  BarGraphResponse,
  CitiesFilterResponse,
  LineGraphResponse,
  NightSalesWeekdayNomenclatureResponse,
  NightSalesWeekdayResponse,
  PartnersFilterResponse,
  RegionsFilterResponse,
  RequestDto,
  ShopsFilterResponse,
  TopNightStoreResponse,
  TopNomenclatureResponse,
  TopSubgroupsResponse,
} from "../config/types";

export const useNightStores = () => {
  const queryClient = useQueryClient();

  const topNightStore = useMutation<
    TopNightStoreResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getTopNightStore(dto);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return response;
    },
  });

  const topNomenclature = useMutation<
    TopNomenclatureResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getTopNomenclature(dto);
      queryClient.invalidateQueries({ queryKey: ["topNomenclature"] });
      return response;
    },
  });

  const topSubgroups = useMutation<TopSubgroupsResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getTopSubgroups(dto);
      queryClient.invalidateQueries({ queryKey: ["topSubgroups"] });
      return response;
    },
  });

  const nightSalesWeekday = useMutation<
    NightSalesWeekdayResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getNightSalesWeekday(dto);
      queryClient.invalidateQueries({ queryKey: ["nightSalesWeekday"] });
      return response;
    },
  });
  const nightSalesWeekdayNomenclature = useMutation<
    NightSalesWeekdayNomenclatureResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response =
        await NightStoresService.getNightSalesWeekdayNomenclature(dto);
      queryClient.invalidateQueries({
        queryKey: ["nightSalesWeekdayNomenclature"],
      });
      return response;
    },
  });

  const ageProceedsGraph = useMutation<LineGraphResponse, ApiError, RequestDto>(
    {
      mutationFn: async (dto: RequestDto) => {
        const response = await NightStoresService.getAgeProceedsGraph(dto);
        queryClient.invalidateQueries({ queryKey: ["ageProceedsGraph"] });
        return response;
      },
    },
  );

  const ageCountCheckGraph = useMutation<
    LineGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getAgeCountCheckGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["ageCountCheckGraph"] });
      return response;
    },
  });

  const ageAvgCheckGraph = useMutation<LineGraphResponse, ApiError, RequestDto>(
    {
      mutationFn: async (dto: RequestDto) => {
        const response = await NightStoresService.getAgeAvgCheckGraph(dto);
        queryClient.invalidateQueries({ queryKey: ["ageAvgCheckGraph"] });
        return response;
      },
    },
  );

  const hourProceedsGraph = useMutation<BarGraphResponse, ApiError, RequestDto>(
    {
      mutationFn: async (dto: RequestDto) => {
        const response = await NightStoresService.getHourProceedsGraph(dto);
        queryClient.invalidateQueries({ queryKey: ["hourProceedsGraph"] });
        return response;
      },
    },
  );

  const uniqueCheckGraph = useMutation<BarGraphResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getUniqueCheckGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["uniqueCheckGraph"] });
      return response;
    },
  });

  const proceedsGraph = useMutation<LineGraphResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getProceedsGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["proceedsGraph"] });
      return response;
    },
  });

  const allCard = useMutation<AllCardResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await NightStoresService.getAllCard(dto);
      queryClient.invalidateQueries({ queryKey: ["allCard"] });
      return response;
    },
  });

  const partners = useMutation<
    PartnersFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await NightStoresService.getPartners(dto);
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      return response;
    },
  });

  const regions = useMutation<
    RegionsFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await NightStoresService.getRegions(dto);
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      return response;
    },
  });
  const cities = useMutation<
    CitiesFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await NightStoresService.getCities(dto);
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      return response;
    },
  });
  const shops = useMutation<
    ShopsFilterResponse[],
    ApiError,
    Pick<RequestDto, "filters">
  >({
    mutationFn: async (dto: Pick<RequestDto, "filters">) => {
      const response = await NightStoresService.getShops(dto);
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      return response;
    },
  });

  return {
    getTopNightStore: topNightStore.mutateAsync,
    isTopNightStoreLoading: topNightStore.isPending,
    getTopNomenclature: topNomenclature.mutateAsync,
    isTopNomenclatureLoading: topNomenclature.isPending,
    getTopSubgroups: topSubgroups.mutateAsync,
    isTopSubgroupsLoading: topSubgroups.isPending,
    getNightSalesWeekday: nightSalesWeekday.mutateAsync,
    isNightSalesWeekdayLoading: nightSalesWeekday.isPending,
    getNightSalesWeekdayNomenclature: nightSalesWeekdayNomenclature.mutateAsync,
    isNightSalesWeekdayNomenclatureLoading:
      nightSalesWeekdayNomenclature.isPending,
    getAgeProceedsGraph: ageProceedsGraph.mutateAsync,
    isAgeProceedsGraphLoading: ageProceedsGraph.isPending,
    getAgeCountCheckGraph: ageCountCheckGraph.mutateAsync,
    isAgeCountCheckGraphLoading: ageCountCheckGraph.isPending,
    getAgeAvgCheckGraph: ageAvgCheckGraph.mutateAsync,
    isAgeAvgCheckGraphLoading: ageAvgCheckGraph.isPending,
    getHourProceedsGraph: hourProceedsGraph.mutateAsync,
    isHourProceedsGraphLoading: hourProceedsGraph.isPending,
    getUniqueCheckGraph: uniqueCheckGraph.mutateAsync,
    isUniqueCheckGraphLoading: uniqueCheckGraph.isPending,
    getProceedsGraph: proceedsGraph.mutateAsync,
    isProceedsGraphLoading: proceedsGraph.isPending,
    getAllCard: allCard.mutateAsync,
    isAllCardLoading: allCard.isPending,
    getPartners: partners.mutateAsync,
    isPartnersLoading: partners.isPending,
    getRegions: regions.mutateAsync,
    isRegionsLoading: regions.isPending,
    getCities: cities.mutateAsync,
    isCitiesLoading: cities.isPending,
    getShops: shops.mutateAsync,
    isShopsLoading: shops.isPending,
  };
};
