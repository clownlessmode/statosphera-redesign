import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { LoyalActionFilterResponse, LoyalBonusFilterResponse } from "./types";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { FiltersLoyalityService } from "./service";
export const useFilters = () => {
  const queryClient = useQueryClient();

  const loyalAction = useMutation<
    LoyalActionFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersLoyalityService.getLoyalAction(dto);
      queryClient.invalidateQueries({ queryKey: ["loyalAction"] });
      return response;
    },
  });

  const loyalBonus = useMutation<
    LoyalBonusFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersLoyalityService.getLoyalBonus(dto);
      queryClient.invalidateQueries({ queryKey: ["loyalBonus"] });
      return response;
    },
  });
  return {
    getLoyalAction: loyalAction.mutateAsync,
    isLoyalActionLoading: loyalAction.isPending,
    //
    getLoyalBonus: loyalBonus.mutateAsync,
    isLoyalBonusLoading: loyalBonus.isPending,
  };
};
