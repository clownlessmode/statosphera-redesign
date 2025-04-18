import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { EmployeeNameFilterResponse } from "./types";

import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { CheckFilterService } from "./service";
export const useFilters = () => {
  const queryClient = useQueryClient();

  const employeeName = useMutation<
    EmployeeNameFilterResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await CheckFilterService.getEmployeeName(dto);
      queryClient.invalidateQueries({ queryKey: ["employeeName"] });
      return response;
    },
  });

  return {
    getEmployeeName: employeeName.mutateAsync,
    isEmployeeNameLoading: employeeName.isPending,
  };
};
