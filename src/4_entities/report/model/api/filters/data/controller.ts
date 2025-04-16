import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ReportService,
  ReportGraphResponse,
  ReportTableResponse,
  ReportTotalResponse,
} from "./service";
import { ApiError } from "@shared/api/types";
import { FilterApiPayload } from "@widgets/report/sheet/ui/commerce/model/store";

export const useReport = () => {
  const queryClient = useQueryClient();
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
  return {
    getTable: table.mutateAsync,
    isTableLoading: table.isPending,
    getTotal: total.mutateAsync,
    isTotalLoading: total.isPending,
    getGraph: graph.mutateAsync,
    isGraphLoading: graph.isPending,
  };
};
