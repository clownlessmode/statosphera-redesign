import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadReportService } from "./service";
import { toast } from "sonner";
import { DownloadReportResponse } from "./types";
import { DownloadReportRequest } from "./types";

export const useDownloadSalesDynamics = () => {
  const queryClient = useQueryClient();

  const downloadReport = useMutation<
    DownloadReportResponse,
    ApiError,
    DownloadReportRequest
  >({
    mutationFn: (dto: DownloadReportRequest) =>
      toast
        .promise(DownloadReportService.downloadReport(dto), {
          loading: "Генерация файла",
          success: () => {
            queryClient.invalidateQueries({ queryKey: ["report-table"] });
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
    downloadReport: downloadReport.mutateAsync,
    isDownloadReportLoading: downloadReport.isPending,
  };
};
