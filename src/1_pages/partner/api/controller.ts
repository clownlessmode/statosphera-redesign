import { useMutation } from "@tanstack/react-query";
import type {
  GraphPartnerRequest,
  TablePartnerRequest,
  TableTotalPartnerRequest,
} from "./types";
import { PartnerService } from "./service";

export const usePartnerController = () => {
  const table = useMutation({
    mutationFn: (request: TablePartnerRequest) =>
      PartnerService.getTable(request),
  });

  const tableTotal = useMutation({
    mutationFn: (request: TableTotalPartnerRequest) =>
      PartnerService.getTableTotal(request),
  });

  const graph = useMutation({
    mutationFn: (request: GraphPartnerRequest) =>
      PartnerService.getGraph(request),
  });

  return {
    getTable: table.mutateAsync,
    isTableLoading: table.isPending,
    getTableTotal: tableTotal.mutateAsync,
    isTableTotalLoading: tableTotal.isPending,
    getGraph: graph.mutateAsync,
    isGraphLoading: graph.isPending,
  };
};
