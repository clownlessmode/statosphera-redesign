import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadMigrationsService, DownloadSegmentService } from "./service";
import { toast } from "sonner";
import { DownloadMigrationsRequest, DownloadSegmentRequest } from "./types";

export const useDownloadMigrationsController = () => {
  const queryClient = useQueryClient();

  const downloadMigrations = useMutation<
    void,
    ApiError,
    DownloadMigrationsRequest
  >({
    mutationFn: (dto: DownloadMigrationsRequest) =>
      toast
        .promise(DownloadMigrationsService.downloadMigrations(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["migrations-table"] });
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
    downloadMigrations: downloadMigrations.mutate,
    isDownloadMigrationsLoading: downloadMigrations.isPending,
  };
};

export const useDownloadSegmentController = () => {
  const queryClient = useQueryClient();

  const downloadSegment = useMutation<void, ApiError, DownloadSegmentRequest>({
    mutationFn: (dto: DownloadSegmentRequest) =>
      toast
        .promise(DownloadSegmentService.downloadSegment(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["segment-table"] });
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
    downloadSegment: downloadSegment.mutate,
    isDownloadSegmentLoading: downloadSegment.isPending,
  };
};
