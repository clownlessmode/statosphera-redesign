import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  GroupMainFilterResponse,
  SubgroupFilterResponse,
  SubSubGroupFilterResponse,
  SubSubSubGroupFilterResponse,
  NomenklaturaFilterResponse,
} from "./types";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { FiltersProductsService } from "./service";

export const useFiltersWriteOff = () => {
  const queryClient = useQueryClient();

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

  const subsubsubgroups = useMutation<
    SubSubSubGroupFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getSubSubSubGroup(dto);
      queryClient.invalidateQueries({ queryKey: ["subsubsubgroups"] });
      return response;
    },
  });

  const nomenklatura = useMutation<
    NomenklaturaFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersProductsService.getNomenklatura(dto);
      queryClient.invalidateQueries({ queryKey: ["nomenklatura"] });
      return response;
    },
  });

  return {
    getGroups: group.mutateAsync,
    isGroupsLoading: group.isPending,
    //
    getSubGroups: subgroups.mutateAsync,
    isSubGroupsLoading: subgroups.isPending,
    //
    getSubSubGroups: subsubgroups.mutateAsync,
    isSubsubgroupsLoading: subsubgroups.isPending,
    //
    getSubSubSubGroups: subsubsubgroups.mutateAsync,
    isSubSubSubGroupsLoading: subsubsubgroups.isPending,
    //
    getNomenklatura: nomenklatura.mutateAsync,
    isNomenklaturaLoading: nomenklatura.isPending,
  };
};
