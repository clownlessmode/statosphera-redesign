import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadForestService } from "./service";
import { toast } from "sonner";
import { DownloadForestResponse, DownloadForestRequest } from "./types";

export const useDownloadForestController = () => {
  const queryClient = useQueryClient();

  const downloadForest = useMutation<
    DownloadForestResponse,
    ApiError,
    DownloadForestRequest
  >({
    mutationFn: (dto: DownloadForestRequest) =>
      toast
        .promise(DownloadForestService.downloadForest(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["forest-table"] });
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

  const downloadForestWriteOff = useMutation<
    DownloadForestResponse,
    ApiError,
    DownloadForestRequest
  >({
    mutationFn: (dto: DownloadForestRequest) =>
      toast
        .promise(DownloadForestService.downloadForestWriteOff(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: ["forest-write-off-table"],
            });
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
    downloadForest: downloadForest.mutateAsync,
    downloadForestWriteOff: downloadForestWriteOff.mutateAsync,
    isDownloadForestLoading: downloadForest.isPending,
    isDownloadForestWriteOffLoading: downloadForestWriteOff.isPending,
  };
};
