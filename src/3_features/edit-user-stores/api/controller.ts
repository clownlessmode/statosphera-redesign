import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { ApiError } from "@shared/api/types";

import { EditUserStoresService } from "./service";
import { EditUserStoresDto } from "./types";

export const useEditUserStores = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    { id_user: number; data: EditUserStoresDto }
  >({
    mutationFn: ({ id_user, data }) =>
      EditUserStoresService.updateUserStores(id_user, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error) => {
      const message = error.response?.data?.message;
      toast.error(
        message
          ? `Произошла ошибка: ${message}`
          : "Не удалось обновить магазины пользователя",
      );
    },
  });
};
