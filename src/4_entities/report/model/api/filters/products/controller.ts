import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  DirectionFilterResponse,
  FiltersProductsService,
  FranchiseFilterResponse,
  GroupEconomistFilterResponse,
  GroupMainFilterResponse,
  SeasonFilterResponse,
  SubdivisionFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  TeamFilterResponse,
} from "./service";
import { FilterApiPayload } from "@widgets/report/sheet/ui/commerce/model/store";

export const useFilters = () => {
  const queryClient = useQueryClient();

  const franchise = useMutation<
    FranchiseFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getFranchise(dto);
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
      return response;
    },
  });

  const team = useMutation<TeamFilterResponse[], ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getTeam(dto);
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      return response;
    },
  });
  const direction = useMutation<
    DirectionFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getDirection(dto);
      queryClient.invalidateQueries({ queryKey: ["directions"] });
      return response;
    },
  });
  const economist = useMutation<
    GroupEconomistFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getEconomist(dto);
      queryClient.invalidateQueries({ queryKey: ["subdivisions"] });
      return response;
    },
  });
  const seasonality = useMutation<
    SeasonFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getSeasons(dto);
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      return response;
    },
  });
  const group = useMutation<
    GroupMainFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getGroup(dto);
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      return response;
    },
  });
  const subgroups = useMutation<
    SubgroupFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getSubGroup(dto);
      queryClient.invalidateQueries({ queryKey: ["subgroups"] });
      return response;
    },
  });
  const subsubgroups = useMutation<
    SubSubGroupFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getSubSubGroup(dto);
      queryClient.invalidateQueries({ queryKey: ["subsubgroups"] });
      return response;
    },
  });
  const subdivision = useMutation<
    SubdivisionFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getSubdivision(dto);
      queryClient.invalidateQueries({ queryKey: ["subdivision"] });
      return response;
    },
  });
  return {
    getFranchise: franchise.mutateAsync,
    isFranchiseLoading: franchise.isPending,
    //
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
    // getAutoManager: auto.mutateAsync,
    // isSubdivisionsLoading: subdivision.isPending,
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
  };
};
