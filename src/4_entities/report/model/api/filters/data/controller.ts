import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ReportService,
  ReportGraphResponse,
  ReportTableResponse,
  ReportTotalResponse,
} from "./service";
import { ApiError } from "@shared/api/types";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";
import { useReportStore } from "@widgets/report/sheet/model/report-store";

export const useReport = () => {
  const queryClient = useQueryClient();
  const {
    isGraphLoading,
    isTableLoading,
    isTotalLoading,
    setGraphLoading,
    setTableLoading,
    setTotalLoading,
  } = useReportStore();

  const table = useMutation<ReportTableResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ReportService.getReportTable(dto);
      queryClient.invalidateQueries({ queryKey: ["report-table"] });
      return response;
    },
  });
  const total = useMutation<ReportTotalResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ReportService.getReportTotal(dto);
      queryClient.invalidateQueries({ queryKey: ["report-total"] });
      return response;
    },
  });
  const graph = useMutation<ReportGraphResponse, ApiError, FilterApiPayload>({
    mutationFn: async (dto: FilterApiPayload) => {
      const response = await ReportService.getReportGraph(dto);
      queryClient.invalidateQueries({ queryKey: ["report-graph"] });
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
