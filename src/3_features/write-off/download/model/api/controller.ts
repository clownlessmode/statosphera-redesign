import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { DownloadWriteOffService } from "./service";
import { toast } from "sonner";
import { DownloadWriteOffResponse } from "./types";
import { transformToTableDto } from "@pages/write-off/utils/transform-table-dto";
import { FilterApiPayload } from "@widgets/write-off/sheet/model/filters-store";

export const useDownloadWriteOffController = () => {
  const queryClient = useQueryClient();

  const downloadWriteOff = useMutation<
    DownloadWriteOffResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (dto: FilterApiPayload) =>
      toast
        .promise(
          DownloadWriteOffService.downloadWriteOff(transformToTableDto(dto)),
          {
            loading: "Генерация файла",
            success: () => {
              queryClient.invalidateQueries({ queryKey: ["write-off-table"] });
              return `Файл отправлен на генерацию, скоро вам придет уведомление о готовности`;
            },
            error: (error) => {
              if (error.response?.data) {
                return `Произошла ошибка: ${error.response.data.message}`;
              }
              return "Произошла ошибка при генерации файла";
            },
          },
        )
        .unwrap(),
  });

  const downloadWriteOffEquipment = useMutation<
    DownloadWriteOffResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (dto: FilterApiPayload) =>
      toast
        .promise(
          DownloadWriteOffService.downloadWriteOffEquipment(
            transformToTableDto(dto),
          ),
          {
            loading: "Генерация файла",
            success: () => {
              queryClient.invalidateQueries({
                queryKey: ["write-off-equip-table"],
              });
              return `Файл отправлен на генерацию, скоро вам придет уведомление о готовности`;
            },
            error: (error) => {
              if (error.response?.data) {
                return `Произошла ошибка: ${error.response.data.message}`;
              }
              return "Произошла ошибка при генерации файла";
            },
          },
        )
        .unwrap(),
  });

  return {
    downloadWriteOff: downloadWriteOff.mutateAsync,
    isDownloadWriteOffLoading: downloadWriteOff.isPending,
    downloadWriteOffEquipment: downloadWriteOffEquipment.mutateAsync,
    isWriteOffEquipmentLoading: downloadWriteOffEquipment.isPending,
  };
};
