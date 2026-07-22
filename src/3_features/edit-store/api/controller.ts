import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@shared/api/types";
import { UpdateStoreDto } from "./types";
import { EditStoreService } from "./service";
import { AxiosError } from "axios";

export const useEditStoreController = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError<ApiError>, UpdateStoreDto>({
    mutationFn: (data) => EditStoreService.updateStore(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      queryClient.invalidateQueries({ queryKey: ["store"] });
    },
    onError: (error) => {
      if (error.response?.data) {
        return `Произошла ошибка: ${error.response.data.message}`;
      }
      return "Произошла ошибка при обновлении магазина";
    },
  });
};
