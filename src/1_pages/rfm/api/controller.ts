import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { RfmService } from "./service";
import {
  AllGistogramResponse,
  ComparisonTwoRfmResponse,
  DrilldownRfmDayWeekTimeResponse,
  DrilldownRfmRegionCityStoreResponse,
  HeatmapMigrationPerSegmentResponse,
  MainAllDataSegmentResponse,
  MainDataSegmentResponse,
  NameSegmentResponse,
  RadarCountUniqGroupAndProductResponse,
  RequestDto,
  RequestDtoComparison,
  SankeyMigrationClientPerSegmentsResponse,
  TreemapRfmOrderDeliveryResponse,
  TreemapTopBonusesResponse,
  TreemapTopGroupProductResponse,
} from "../config";

export const useRfm = () => {
  const queryClient = useQueryClient();

  const nameSegment = useQuery<NameSegmentResponse[], ApiError>({
    queryKey: ["nameSegment"],
    queryFn: async () => {
      const response = await RfmService.getNameSegment();
      return response;
    },
  });

  const agePeriods = useQuery<string[], ApiError>({
    queryKey: ["agePeriod"],
    queryFn: async () => {
      const response = await RfmService.getAgePeriod();
      return response;
    },
  });

  const allGistogram = useMutation<AllGistogramResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getAllGistogram(dto);
      queryClient.invalidateQueries({ queryKey: ["allGistogram"] });
      return response;
    },
  });

  const drilldownRfmDayWeekTime = useMutation<
    DrilldownRfmDayWeekTimeResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getDrilldownRfmDayWeekTime(dto);
      queryClient.invalidateQueries({ queryKey: ["drilldownRfmDayWeekTime"] });
      return response;
    },
  });

  const drilldownTimeDayWeekRfm = useMutation<
    DrilldownRfmDayWeekTimeResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getDrilldownTimeDayWeekRfm(dto);
      queryClient.invalidateQueries({ queryKey: ["drilldownTimeDayWeekRfm"] });
      return response;
    },
  });

  const treemapTopGroupProduct = useMutation<
    TreemapTopGroupProductResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTreemapTopGroupProduct(dto);
      queryClient.invalidateQueries({ queryKey: ["treemapTopGroupProduct"] });
      return response;
    },
  });

  const treemapTopBonuses = useMutation<
    TreemapTopBonusesResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTreemapTopBonuses(dto);
      queryClient.invalidateQueries({ queryKey: ["treemapTopBonuses"] });
      return response;
    },
  });

  const radarCountUniqGroupAndProduct = useMutation<
    RadarCountUniqGroupAndProductResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getRadarCountUniqGroupAndProduct(dto);
      queryClient.invalidateQueries({
        queryKey: ["radarCountUniqGroupAndProduct"],
      });
      return response;
    },
  });

  const treemapRfmOrderDelivery = useMutation<
    TreemapRfmOrderDeliveryResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getTreemapRfmOrderDelivery(dto);
      queryClient.invalidateQueries({ queryKey: ["treemapRfmOrderDelivery"] });
      return response;
    },
  });

  const drilldownRfmRegionCityStore = useMutation<
    DrilldownRfmRegionCityStoreResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getDrilldownRfmRegionCityStore(dto);
      queryClient.invalidateQueries({
        queryKey: ["drilldownRfmRegionCityStore"],
      });
      return response;
    },
  });

  const sankeyMigrationClientPerSegments = useMutation<
    SankeyMigrationClientPerSegmentsResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response =
        await RfmService.getSankeyMigrationClientPerSegments(dto);
      queryClient.invalidateQueries({
        queryKey: ["sankeyMigrationClientPerSegments"],
      });
      return response;
    },
  });

  const heatmapMigrationPerSegment = useMutation<
    HeatmapMigrationPerSegmentResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getHeatmapMigrationPerSegment(dto);
      queryClient.invalidateQueries({
        queryKey: ["heatmapMigrationPerSegment"],
      });
      return response;
    },
  });

  const mainDataSegment = useMutation<
    MainDataSegmentResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getMainDataSegment(dto);
      queryClient.invalidateQueries({
        queryKey: ["mainDataSegment"],
      });
      return response;
    },
  });

  const mainAllDataSegment = useMutation<
    MainAllDataSegmentResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await RfmService.getMainAllDataSegment(dto);
      queryClient.invalidateQueries({
        queryKey: ["mainAllDataSegment"],
      });
      return response;
    },
  });

  const comparisonTwoRfm = useMutation<
    ComparisonTwoRfmResponse,
    ApiError,
    RequestDtoComparison
  >({
    mutationFn: async (dto: RequestDtoComparison) => {
      const response = await RfmService.getComparisonTwoRfm(dto);
      queryClient.invalidateQueries({ queryKey: ["comparisonTwoRfm"] });
      return response;
    },
  });

  return {
    getNameSegment: nameSegment.refetch,
    isNameSegmentLoading: nameSegment.isPending,
    nameSegment: nameSegment.data,
    getAgePeriods: agePeriods.refetch,
    isAgePeriodsLoading: agePeriods.isPending,
    agePeriods: agePeriods.data,
    getAllGistogram: allGistogram.mutateAsync,
    isAllGistogramLoading: allGistogram.isPending,
    getDrilldownRfmDayWeekTime: drilldownRfmDayWeekTime.mutateAsync,
    isDrilldownRfmDayWeekTimeLoading: drilldownRfmDayWeekTime.isPending,
    getDrilldownTimeDayWeekRfm: drilldownTimeDayWeekRfm.mutateAsync,
    isDrilldownTimeDayWeekRfmLoading: drilldownTimeDayWeekRfm.isPending,
    getTreemapTopGroupProduct: treemapTopGroupProduct.mutateAsync,
    isTreemapTopGroupProductLoading: treemapTopGroupProduct.isPending,
    getTreemapTopBonuses: treemapTopBonuses.mutateAsync,
    isTreemapTopBonusesLoading: treemapTopBonuses.isPending,
    getRadarCountUniqGroupAndProduct: radarCountUniqGroupAndProduct.mutateAsync,
    isRadarCountUniqGroupAndProductLoading:
      radarCountUniqGroupAndProduct.isPending,
    getTreemapRfmOrderDelivery: treemapRfmOrderDelivery.mutateAsync,
    isTreemapRfmOrderDeliveryLoading: treemapRfmOrderDelivery.isPending,
    getDrilldownRfmRegionCityStore: drilldownRfmRegionCityStore.mutateAsync,
    isDrilldownRfmRegionCityStoreLoading: drilldownRfmRegionCityStore.isPending,
    getSankeyMigrationClientPerSegments:
      sankeyMigrationClientPerSegments.mutateAsync,
    isSankeyMigrationClientPerSegmentsLoading:
      sankeyMigrationClientPerSegments.isPending,
    getHeatmapMigrationPerSegment: heatmapMigrationPerSegment.mutateAsync,
    isHeatmapMigrationPerSegmentLoading: heatmapMigrationPerSegment.isPending,
    getMainDataSegment: mainDataSegment.mutateAsync,
    isMainDataSegmentLoading: mainDataSegment.isPending,
    getMainAllDataSegment: mainAllDataSegment.mutateAsync,
    isMainAllDataSegmentLoading: mainAllDataSegment.isPending,
    getComparisonTwoRfm: comparisonTwoRfm.mutateAsync,
    isComparisonTwoRfmLoading: comparisonTwoRfm.isPending,
  };
};
