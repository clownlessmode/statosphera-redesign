import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadFarmerService } from "./service";
import { toast } from "sonner";
import { DownloadFarmerRequest, DownloadFarmerResponse } from "./types";

export const useDownloadFarmerController = () => {
  const queryClient = useQueryClient();

  const downloadFarmer = useMutation<
    DownloadFarmerResponse,
    ApiError,
    DownloadFarmerRequest
  >({
    mutationFn: (dto: DownloadFarmerRequest) =>
      toast
        .promise(DownloadFarmerService.downloadFarmer(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["farmer-table"] });
            return `Файл отправлен на генерацию, скоро вам придет уведомление о готовности`;
          },
          error: (error) => {
            if (error.response?.data) {
              return `Произошла ошибка: ${error.response.data.message}`;
            }
            return "Произошла ошибка при генерации файла";
          },
        })
        .unwrap(),
  });

  return {
    downloadFarmer: downloadFarmer.mutateAsync,
    isDownloadFarmerLoading: downloadFarmer.isPending,
  };
};
