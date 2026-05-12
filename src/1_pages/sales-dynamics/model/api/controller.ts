import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CitiesFilterResponse,
  GraphSeries,
  PartnersFilterResponse,
  RegionsFilterResponse,
  SalesDynamicsApiPayloadGraph,
  SalesDynamicsService,
  SalesTableResponse,
  SalesTotalResponse,
  SectorsFilterResponse,
  ShopsFilterResponse,
} from "./service";
import { ApiError } from "@shared/api/types";
import { SalesDynamicsApiPayload } from "../filters-store";

export const useSalesDynamicsController = () => {
  const queryClient = useQueryClient();
  const table = useMutation<
    SalesTableResponse,
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getSalesDynamicsTable(dto);
      queryClient.invalidateQueries({
        queryKey: ["table-sales-dynamics"],
      });
      return response;
    },
  });
  const total = useMutation<
    SalesTotalResponse,
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getSalesDynamicsTotal(dto);
      queryClient.invalidateQueries({
        queryKey: ["total-sales-dynamics"],
      });
      return response;
    },
  });
  const graph = useMutation<
    GraphSeries[],
    ApiError,
    SalesDynamicsApiPayloadGraph
  >({
    mutationFn: async (dto: SalesDynamicsApiPayloadGraph) => {
      const response = await SalesDynamicsService.getSalesDynamicsGraph(dto);
      queryClient.invalidateQueries({
        queryKey: [`graph-sales-dynamics`],
      });
      return response;
    },
  });

  const secondGraph = useMutation<
    GraphSeries[],
    ApiError,
    SalesDynamicsApiPayloadGraph
  >({
    mutationFn: async (dto: SalesDynamicsApiPayloadGraph) => {
      const response = await SalesDynamicsService.getSalesDynamicsGraph(dto);
      queryClient.invalidateQueries({
        queryKey: [`graph-sales-dynamics`],
      });
      return response;
    },
  });

  const partners = useMutation<
    PartnersFilterResponse[],
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getPartners(dto);
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      return response;
    },
  });

  const regions = useMutation<
    RegionsFilterResponse[],
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getRegions(dto);
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      return response;
    },
  });
  const cities = useMutation<
    CitiesFilterResponse[],
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getCities(dto);
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      return response;
    },
  });
  const sectors = useQuery<SectorsFilterResponse[], ApiError>({
    queryKey: ["sectors"],
    queryFn: () => SalesDynamicsService.getSectors(),
  });
  const shops = useMutation<
    ShopsFilterResponse[],
    ApiError,
    SalesDynamicsApiPayload
  >({
    mutationFn: async (dto: SalesDynamicsApiPayload) => {
      const response = await SalesDynamicsService.getShops(dto);
      queryClient.invalidateQueries({ queryKey: ["shops"] });
      return response;
    },
  });
  return {
    getSecondGraph: secondGraph.mutateAsync,
    isSecondGraphLoading: secondGraph.isPending,
    getTable: table.mutateAsync,
    isTableLoading: table.isPending,
    getTotal: total.mutateAsync,
    isTotalLoading: total.isPending,
    getGraph: graph.mutateAsync,
    isGraphLoading: graph.isPending,

    getPartners: partners.mutateAsync,
    isPartnersLoading: partners.isPending,
    //
    getRegions: regions.mutateAsync,
    isRegionsLoading: regions.isPending,
    //
    getCities: cities.mutateAsync,
    isCitiesLoading: cities.isPending,
    //
    sectors: sectors.data || [],
    isSectorsLoading: sectors.isPending,
    //
    getShops: shops.mutateAsync,
    isShopsLoading: shops.isPending,
    //
  };
};
