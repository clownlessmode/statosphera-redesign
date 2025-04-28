import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { IndicatorsService } from "./service";

import { GetIndicatorsResponse, UpdateIndicatorsRequest } from "./types";
import { toast } from "sonner";

export const useSalesDynamicsIndicatorsController = () => {
  const queryClient = useQueryClient();
  const indicatorsQuery = useQuery<GetIndicatorsResponse>({
    queryKey: ["indicators-sales-dynamics"],
    queryFn: () => IndicatorsService.getIndicators(),
  });

  const updateIndicatorsController = useMutation<
    "Ok",
    Error,
    UpdateIndicatorsRequest
  >({
    mutationFn: (request: UpdateIndicatorsRequest) =>
      toast
        .promise(IndicatorsService.updateIndicators(request), {
          loading: "Обновление показателей",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: [
                "graph-sales-dynamics",
                "table-sales-dynamics",
                "total-sales-dynamics",
                "indicators-sales-dynamics",
              ],
            });
            return `Показатели обновлены`;
          },
          error: (error) => {
            if (error.response?.data) {
              return `Произошла ошибка: ${error.response.data.message}`;
            }
            return "Ошибка при обновлении показателей";
          },
        })
        .unwrap(),
  });

  return {
    indicators: indicatorsQuery.data,
    isIndicatorsLoading: indicatorsQuery.isLoading,
    updateIndicators: updateIndicatorsController.mutateAsync,
    isUpdateIndicatorsLoading: updateIndicatorsController.isPending,
  };
};
