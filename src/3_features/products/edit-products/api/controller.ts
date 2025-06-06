import { DirectionFilterResponse, FranchiseFilterResponse, GroupEconomistFilterResponse, SeasonFilterResponse, TeamFilterResponse, SubgroupFilterResponse, SubSubGroupFilterResponse, SubdivisionFilterResponse, AutoManagerFilterResponse, TypeSenderFilterResponse, NomenklaturaFilterResponse, GroupMainFilterResponse } from "@entities/report/model/api/filters/products/types";
import { ApiError } from "@shared/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { GetProductsService } from "./service";
import { UpdateProductPayload } from "../config";
import { toast } from "sonner";


export const useFilters = () => {
  const queryClient = useQueryClient();

  const franchise = useMutation<
    FranchiseFilterResponse[],
    ApiError,
    void
  >({
    mutationFn: async () => {
      const response = await GetProductsService.getFranchise();
      queryClient.invalidateQueries({ queryKey: ["franchises"] });
      return response;
    },
  });

  const team = useMutation<TeamFilterResponse[], ApiError, void>({
    mutationFn: async () => {
      const response = await GetProductsService.getGroup();
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      return response;
    },
  });
  const direction = useMutation<
    DirectionFilterResponse[],
    ApiError,
    void
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
    void
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
    void
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
    void
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
    void
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
    void
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
    void
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
    void
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
    void
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
    void
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


export const useUpdateProduct = () => {
  const update = useMutation<any, ApiError, UpdateProductPayload>({
    mutationFn: (dto) =>
      toast
        .promise(GetProductsService.updateProduct(dto), {
          loading: "Обновление продукта",
          success: () => {
            return `Данные о номенклатуре успешно обновлены`;
          },
          error: (error) => {
            if (error.response?.data) {
              return `Произошла ошибка: ${error.response.data.message}`;
            }
            return "Не удалось обновить номенклатуру";
          },
        })
        .unwrap(),
  });

  return {
    update: update.mutateAsync,
    isUpdateLoading: update.isPending,
  };
};