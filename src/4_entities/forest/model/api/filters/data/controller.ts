import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ForestService,
  ForestGraphResponse,
  ForestTableResponse,
  ForestTotalResponse,
} from "./service";
import { ApiError } from "@shared/api/types";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";
import { useForestStore } from "@widgets/forest/sheet/model/forest-store";

export const useForest = () => {
  const queryClient = useQueryClient();
  const {
    isGraphLoading,
    isTableLoading,
    isTotalLoading,
    setGraphLoading,
    setTableLoading,
    setTotalLoading,
  } = useForestStore();

  const table = useMutation<ForestTableResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestService.getForestTable(dto);
      queryClient.invalidateQueries({ queryKey: ["forest-table"] });
      return response;
    },
  });
  const total = useMutation<ForestTotalResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestService.getForestTotal(dto);
      queryClient.invalidateQueries({ queryKey: ["forest-total"] });
      return response;
    },
  });
  const graph = useMutation<ForestGraphResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ForestService.getForestGraph(dto);
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
