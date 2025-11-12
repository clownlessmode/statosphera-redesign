import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadAudienceService } from "./service";
import { toast } from "sonner";
import { DownloadAudienceRequest } from "./types";

export const useDownloadAudienceController = () => {
  const queryClient = useQueryClient();

  const downloadAudience = useMutation<void, ApiError, DownloadAudienceRequest>(
    {
      mutationFn: (dto: DownloadAudienceRequest) =>
        toast
          .promise(DownloadAudienceService.downloadAudience(dto), {
            loading: "Генерация файла",
            success: () => {
              queryClient.invalidateQueries({ queryKey: ["audience-table"] });
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
    },
  );

  return {
    downloadAudience: downloadAudience.mutate,
    isDownloadAudienceLoading: downloadAudience.isPending,
  };
};
