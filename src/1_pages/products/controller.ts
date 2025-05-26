import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { AutoManagerFilterResponse, DirectionFilterResponse, FranchiseFilterResponse, GroupEconomistFilterResponse, GroupMainFilterResponse, NomenklaturaFilterResponse, SeasonFilterResponse, SubdivisionFilterResponse, SubgroupFilterResponse, SubSubGroupFilterResponse, TeamFilterResponse, TypeSenderFilterResponse } from "./types";
import { FilterApiPayload } from "./dto/get-product.dto";
import { GetProductsService } from "./service";


export const useFilters = () => {
  const queryClient = useQueryClient();

  const franchise = useMutation<
    FranchiseFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getFranchise();
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
      return response;
    },
  });

  const team = useMutation<TeamFilterResponse[], ApiError, FilterApiPayload>({
    mutationFn: async () => {
      const response = await GetProductsService.getGroup();
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      return response;
    },
  });
  const direction = useMutation<
    DirectionFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getDirection();
      queryClient.invalidateQueries({ queryKey: ["directions"] });
      return response;
    },
  });
  const economist = useMutation<
    GroupEconomistFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getEconomist();
      queryClient.invalidateQueries({ queryKey: ["subdivisions"] });
      return response;
    },
  });
  const seasonality = useMutation<
    SeasonFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getSeasons();
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      return response;
    },
  });
  const group = useMutation<
    GroupMainFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getGroupMain();
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      return response;
    },
  });
  const subgroups = useMutation<
    SubgroupFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getSubGroup();
      queryClient.invalidateQueries({ queryKey: ["subgroups"] });
      return response;
    },
  });
  const subsubgroups = useMutation<
    SubSubGroupFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getSubSubGroup();
      queryClient.invalidateQueries({ queryKey: ["subsubgroups"] });
      return response;
    },
  });
  const subdivision = useMutation<
    SubdivisionFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getSubdivision();
      queryClient.invalidateQueries({ queryKey: ["subdivision"] });
      return response;
    },
  });

  const autoManager = useMutation<
    AutoManagerFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getAutoManager();
      queryClient.invalidateQueries({ queryKey: ["autoManager"] });
      return response;
    },
  });
  const getTypeSender = useMutation<
    TypeSenderFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getTypeSender();
      queryClient.invalidateQueries({ queryKey: ["typeSender"] });
      return response;
    },
  });
  const nomenklatura = useMutation<
    NomenklaturaFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getNomenklatura();
      queryClient.invalidateQueries({ queryKey: ["nomenklatura"] });
      return response;
    },
  });

  return {
    getFranchise: franchise.mutateAsync,
    isFranchiseLoading: franchise.isPending,
    
    getSubdivisions: subdivision.mutateAsync,
    isSubdivisionsLoading: subdivision.isPending,
    //
    getTeam: team.mutateAsync,
    isTeamLoading: team.isPending,
    //
    getDirection: direction.mutateAsync,
    isDirectionLoading: direction.isPending,
    //
    getEconomist: economist.mutateAsync,
    isEconomistLoading: economist.isPending,
    //
    getAutoManager: autoManager.mutateAsync,
    isAutoManagerLoading: autoManager.isPending,
    //
    getSeasons: seasonality.mutateAsync,
    isSeasonsLoading: seasonality.isPending,
    //
    getGroups: group.mutateAsync,
    isGroupsLoading: group.isPending,
    //
    getSubGroups: subgroups.mutateAsync,
    isSubGroupsLoading: subgroups.isPending,
    //
    getSubSubGroups: subsubgroups.mutateAsync,
    isSubsubgroupsLoading: subsubgroups.isPending,
    //
    getTypeSender: getTypeSender.mutateAsync,
    isTypeSenderLoading: getTypeSender.isPending,
    //
    getNomenklatura: nomenklatura.mutateAsync,
    isNomenklaturaLoading: nomenklatura.isPending,
  };
};
