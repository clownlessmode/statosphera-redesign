import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import {
  ForestWriteOffService,
  ForestWriteOffTableResponse,
  ForestWriteOffTotalResponse,
  ForestWriteOffGraphResponse,
} from "./service";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { useForestStore } from "@widgets/forest/sheet/model/forest-store";

export const useWriteOffController = () => {
  const queryClient = useQueryClient();
  const {
    isGraphLoading,
    isTableLoading,
    isTotalLoading,
    setGraphLoading,
    setTableLoading,
    setTotalLoading,
  } = useForestStore();

  const table = useMutation<
    ForestWriteOffTableResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestWriteOffService.getTable(dto);
      queryClient.invalidateQueries({ queryKey: ["forest-table"] });
      return response;
    },
  });
  const total = useMutation<
    ForestWriteOffTotalResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestWriteOffService.getTotal(dto);
      queryClient.invalidateQueries({ queryKey: ["forest-total"] });
      return response;
    },
  });
  const graph = useMutation<
    ForestWriteOffGraphResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestWriteOffService.getGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["forest-graph"] });
      return response;
    },
  });

  const getTable = async (dto: FilterApiPayload) => {
    setTableLoading(true);
    try {
      const result = await table.mutateAsync(dto);
      return result;
    } finally {
      setTableLoading(false);
    }
  };

  const getTotal = async (dto: FilterApiPayload) => {
    setTotalLoading(true);
    try {
      const result = await total.mutateAsync(dto);
      return result;
    } finally {
      setTotalLoading(false);
    }
  };

  const getGraph = async (dto: FilterApiPayload) => {
    setGraphLoading(true);
    try {
      const result = await graph.mutateAsync(dto);
      return result;
    } finally {
      setGraphLoading(false);
    }
  };

  return {
    getTable,
    isTableLoading,
    getTotal,
    isTotalLoading,
    getGraph,
    isGraphLoading,
  };
};
