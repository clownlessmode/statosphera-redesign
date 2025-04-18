import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  IntervalFilterResponse,
  PromoFilterResponse,
  StatusOrderFilterResponse,
} from "./types";

import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { FiltersLoyalityService } from "./service";
export const useFilters = () => {
  const queryClient = useQueryClient();

  const statusOrder = useMutation<
    StatusOrderFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersLoyalityService.getStatusOrder(dto);
      queryClient.invalidateQueries({ queryKey: ["statusOrder"] });
      return response;
    },
  });

  const interval = useMutation<
    IntervalFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersLoyalityService.getInterval(dto);
      queryClient.invalidateQueries({ queryKey: ["interval"] });
      return response;
    },
  });
  const promo = useMutation<PromoFilterResponse[], ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await FiltersLoyalityService.getPromo(dto);
      queryClient.invalidateQueries({ queryKey: ["promo"] });
      return response;
    },
  });
  return {
    getStatusOrder: statusOrder.mutateAsync,
    isStatusOrderLoading: statusOrder.isPending,
    //
    getInterval: interval.mutateAsync,
    isIntervalLoading: interval.isPending,
    //
    getPromo: promo.mutateAsync,
    isPromoLoading: promo.isPending,
  };
};
