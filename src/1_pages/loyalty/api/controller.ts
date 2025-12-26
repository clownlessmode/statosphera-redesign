import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@shared/api/types";
import { LoyaltyService } from "./service";
import {
  AvarageCheckResponse,
  BonusesResponse,
  GraphResponse,
  NoSales30DaysUserResponse,
  RequestDto,
  TopGroupResponse,
  TopProductRubResponse,
  TopStoreLoyalResponse,
  UniqueGraphResponse,
  AppLoyalGraphResponse,
  TopActionsResponse,
  LoyalCard2Response,
  AgeGroupsGraphResponse,
  AgeCircleGraphResponse,
  AgeSalesGraphResponse,
  AvarageCheckAgeGroupGraphResponse,
  RevenueGroupsGraphResponse,
  CountLoyalCardLineResponse,
} from "../config";

export const useLoyal = () => {
  const queryClient = useQueryClient();

  const avarageCheck = useMutation<
    AvarageCheckResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getAvarageCheck(dto);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      return response;
    },
  });

  const noSales30DaysUser = useMutation<
    NoSales30DaysUserResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getNoSales30DaysUser(dto);
      queryClient.invalidateQueries({ queryKey: ["noSales30DaysUser"] });
      return response;
    },
  });

  const uniques = useQuery<number, ApiError>({
    queryKey: ["uniques"],
    queryFn: async () => {
      const response = await LoyaltyService.getUniques();
      return response;
    },
  });

  const bonuses = useMutation<BonusesResponse[], ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getBonuses(dto);
      queryClient.invalidateQueries({ queryKey: ["bonuses"] });
      return response;
    },
  });
  const topGroups = useMutation<TopGroupResponse[], ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getTopGroup(dto);
      queryClient.invalidateQueries({ queryKey: ["topGroups"] });
      return response;
    },
  });
  const topProducts = useMutation<
    TopProductRubResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getTopProductRub(dto);
      queryClient.invalidateQueries({ queryKey: ["topProducts"] });
      return response;
    },
  });
  const topProductsCount = useMutation<
    TopProductRubResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getTopProductCount(dto);
      queryClient.invalidateQueries({ queryKey: ["topProductsCount"] });
      return response;
    },
  });

  const topStoreLoyal = useMutation<
    TopStoreLoyalResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getTopStoreLoyal(dto);
      queryClient.invalidateQueries({ queryKey: ["topStoreLoyal"] });
      return response;
    },
  });

  const bonusGraph = useMutation<
    { graph: GraphResponse[] },
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getBonusGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["bonusGraph"] });
      return response;
    },
  });

  const uniqueGraph = useMutation<UniqueGraphResponse, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getUniqueGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["uniqueGraph"] });
      return response;
    },
  });
  const appLoyalGraph = useMutation<
    AppLoyalGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getAppLoyalGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["appLoyalGraph"] });
      return response;
    },
  });
  const topActions = useMutation<TopActionsResponse[], ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getTopActions(dto);
      queryClient.invalidateQueries({ queryKey: ["topActions"] });
      return response;
    },
  });
  const loyalCard2 = useMutation<LoyalCard2Response[], ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getLoyalCard2(dto);
      return response;
    },
  });
  const countLoyalCardLine = useMutation<
    CountLoyalCardLineResponse[],
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getCountLoyalCardLine(dto);
      return response;
    },
  });
  const getLoyalCardData = async (dto: RequestDto) => {
    const [loyalCard2Data, countLoyalCardLineData] = await Promise.all([
      loyalCard2.mutateAsync(dto),
      countLoyalCardLine.mutateAsync(dto),
    ]);
    return [
      {
        ...loyalCard2Data[0],
        ...countLoyalCardLineData[0],
      },
    ];
  };
  const ageGroupsGraph = useMutation<
    AgeGroupsGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getAgeGroupsGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["ageGroupsGraph"] });
      return response;
    },
  });
  const ageCircleGraph = useMutation<
    AgeCircleGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.getAgeCircleGraph(dto);
      return response;
    },
  });

  const ageSalesGraph = useMutation<
    AgeSalesGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.ageSalesGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["ageSalesGraph"] });
      return response;
    },
  });

  const averageCheckAgeGroupGraph = useMutation<
    AvarageCheckAgeGroupGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.averageCheckAgeGroupGraph(dto);
      queryClient.invalidateQueries({
        queryKey: ["averageCheckAgeGroupGraph"],
      });
      return response;
    },
  });

  const revenueGroupsGraph = useMutation<
    RevenueGroupsGraphResponse,
    ApiError,
    RequestDto
  >({
    mutationFn: async (dto: RequestDto) => {
      const response = await LoyaltyService.revenueGroupsGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["revenueGroupsGraph"] });
      return response;
    },
  });

  return {
    getAgeCircleGraph: ageCircleGraph.mutateAsync,
    isAgeCircleGraphLoading: ageCircleGraph.isPending,
    getUniqueGraph: uniqueGraph.mutateAsync,
    isUniqueGraphLoading: uniqueGraph.isPending,
    getBonusGraph: bonusGraph.mutateAsync,
    isBonusGraphLoading: bonusGraph.isPending,
    getTopGroups: topGroups.mutateAsync,
    isTopGroupsLoading: topGroups.isPending,
    getAvarageCheck: avarageCheck.mutateAsync,
    isAvarageCheckLoading: avarageCheck.isPending,
    getNoSales30DaysUser: noSales30DaysUser.mutateAsync,
    isNoSales30DaysUserLoading: noSales30DaysUser.isPending,
    getUniques: uniques.refetch,
    isUniquesLoading: uniques.isPending,
    uniques: uniques.data,
    getBonuses: bonuses.mutateAsync,
    isBonusesLoading: bonuses.isPending,
    getTopProducts: topProducts.mutateAsync,
    isTopProductsLoading: topProducts.isPending,
    getTopProductsCount: topProductsCount.mutateAsync,
    isTopProductsCountLoading: topProductsCount.isPending,
    getTopStoreLoyal: topStoreLoyal.mutateAsync,
    isTopStoreLoyalLoading: topStoreLoyal.isPending,
    getAppLoyalGraph: appLoyalGraph.mutateAsync,
    isAppLoyalGraphLoading: appLoyalGraph.isPending,
    getTopActions: topActions.mutateAsync,
    isTopActionsLoading: topActions.isPending,
    getLoyalCardData,
    isLoyalCardDataLoading:
      loyalCard2.isPending || countLoyalCardLine.isPending,
    getAgeGroupsGraph: ageGroupsGraph.mutateAsync,
    isAgeGroupsGraphLoading: ageGroupsGraph.isPending,
    getAgeSalesGraph: ageSalesGraph.mutateAsync,
    isAgeSalesGraphLoading: ageSalesGraph.isPending,
    getAverageCheckAgeGroupGraph: averageCheckAgeGroupGraph.mutateAsync,
    isAverageCheckAgeGroupGraphLoading: averageCheckAgeGroupGraph.isPending,
    getRevenueGroupsGraph: revenueGroupsGraph.mutateAsync,
    isRevenueGroupsGraphLoading: revenueGroupsGraph.isPending,
  };
};
