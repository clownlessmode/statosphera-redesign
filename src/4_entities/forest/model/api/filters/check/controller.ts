import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DiscountTypeFilterResponse, TypePaymentFilterResponse } from "./types";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { CheckFilterService } from "./service";
export const useFilters = () => {
  const queryClient = useQueryClient();

  const discountType = useMutation<
    DiscountTypeFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await CheckFilterService.getDiscountType(dto);
      queryClient.invalidateQueries({ queryKey: ["discountType"] });
      return response;
    },
  });

  const typePayment = useMutation<
    TypePaymentFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await CheckFilterService.getTypePayment(dto);
      queryClient.invalidateQueries({ queryKey: ["typePayment"] });
      return response;
    },
  });

  return {
    getDiscountType: discountType.mutateAsync,
    isDiscountTypeLoading: discountType.isPending,
    //
    getTypePayment: typePayment.mutateAsync,
    isTypePaymentLoading: typePayment.isPending,
  };
};
