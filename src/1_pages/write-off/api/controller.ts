import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  WriteOffGraphSeriesArray,
  WriteOffTableResponse,
  WriteOffTotalResponse,
  WriteOffReasonsRequest,
  WriteOffReasonsResponse,
} from "./types";
import { ApiError } from "@shared/api/types";
import { WriteOffService } from "./service";
import { FilterApiPayload } from "@widgets/write-off/sheet/model/filters-store";
import { transformToGraphDto } from "../utils/transform-graph-dto";
import {
  transformToTableDto,
  transformToTotalDto,
} from "../utils/transform-table-dto";

export const useWriteOffController = () => {
  const queryClient = useQueryClient();

  const getGraph = useMutation<
    WriteOffGraphSeriesArray,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToGraphDto(payload);
      queryClient.invalidateQueries({ queryKey: ["write-off-graph"] });
      return WriteOffService.getGraph(dto);
    },
  });

  const getTable = useMutation<
    WriteOffTableResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToTableDto(payload);
      queryClient.invalidateQueries({ queryKey: ["write-off-table"] });
      return WriteOffService.getTable(dto);
    },
  });

  const getEquipmentTable = useMutation<
    WriteOffTableResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToTableDto(payload);
      queryClient.invalidateQueries({
        queryKey: ["write-off-equipment-table"],
      });
      return WriteOffService.getEquipmentTable(dto);
    },
  });

  const getTotal = useMutation<
    WriteOffTotalResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToTotalDto(payload);
      queryClient.invalidateQueries({ queryKey: ["write-off-total"] });
      return WriteOffService.getTotal(dto);
    },
  });

  const getReasons = useMutation<
    WriteOffReasonsResponse,
    ApiError,
    WriteOffReasonsRequest
  >({
    mutationFn: (data: WriteOffReasonsRequest) =>
      WriteOffService.getReasons(data),
  });

  return {
    getGraph: getGraph.mutateAsync,
    getTable: getTable.mutateAsync,
    getEquipmentTable: getEquipmentTable.mutateAsync,
    getTotal: getTotal.mutateAsync,
    getReasons: getReasons.mutateAsync,
    isGraphLoading: getGraph.isPending,
    isTableLoading: getTable.isPending,
    isEquipmentTableLoading: getEquipmentTable.isPending,
    isTotalLoading: getTotal.isPending,
    isReasonsLoading: getReasons.isPending,
  };
};
