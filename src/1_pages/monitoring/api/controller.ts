import { useMutation, useQuery } from "@tanstack/react-query";
import { MonitoringService } from "./service";
import { DownloadReportRequest, ShopProductsResponse } from "../config/types";
import { ApiError } from "@shared/api/types";
import { toast } from "sonner";

export const useMonitoringController = (search: string) => {
  const getProducts = useQuery<ShopProductsResponse[], ApiError>({
    queryKey: ["monitoring-products", search],
    queryFn: () => MonitoringService.getProducts(search),
    enabled: !!search,
  });

  const downloadReport = useMutation<any, ApiError, DownloadReportRequest>({
    mutationFn: (dto: DownloadReportRequest) =>
      toast
        .promise(MonitoringService.downloadReport(dto), {
          loading: "Генерация файла",
          success: () => {
            return `Файл сейчас будет скачан на ваш компьютер`;
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
    products: getProducts.data,
    isProductsLoading: getProducts.isLoading,
    downloadReport: downloadReport.mutateAsync,
    isDownloadReportLoading: downloadReport.isPending,
  };
};
