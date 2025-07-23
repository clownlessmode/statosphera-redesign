import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SummaryTableRequest,
  SummaryTableResponse,
  SummaryNomenklaturaResponse,
} from "./types";
import { ApiError } from "@shared/api/types";
import { SummaryService } from "./service";
import { FilterApiPayload } from "@widgets/summary/sheet/model/filters-store";
import {
  transformToSummaryDto,
  transformToNomenklaturaDto,
} from "../utils/transform-summary-dto";
import {
  SummaryComparisonCardsResponse,
  SummaryGraphResponse,
} from "./types/responses";

export const useSummaryController = () => {
  const queryClient = useQueryClient();

  const getTable = useMutation<
    SummaryTableResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToSummaryDto(payload) as SummaryTableRequest;
      queryClient.invalidateQueries({ queryKey: ["table"] });
      return SummaryService.getTable(dto);
    },
  });

  const getGraph = useMutation<
    SummaryGraphResponse,
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToSummaryDto(payload) as SummaryTableRequest;
      queryClient.invalidateQueries({ queryKey: ["graph"] });
      return SummaryService.getGraph(dto);
    },
  });

  const getNomenklatura = useMutation<
    SummaryNomenklaturaResponse[],
    ApiError,
    FilterApiPayload
  >({
    mutationFn: (payload: FilterApiPayload) => {
      const dto = transformToNomenklaturaDto(payload);
      queryClient.invalidateQueries({ queryKey: ["nomenklatura"] });
      return SummaryService.getNomenklatura(dto);
    },
  });

  const getComparisonCards = useMutation<
    SummaryComparisonCardsResponse,
    ApiError,
    any
  >({
    mutationFn: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comparison-cards"] });
      return SummaryService.getComparisonCards(data);
    },
  });

  return {
    getTable: getTable.mutateAsync,
    getGraph: getGraph.mutateAsync,
    getNomenklatura: getNomenklatura.mutateAsync,
    getComparisonCards: getComparisonCards.mutateAsync,
    isTableLoading: getTable.isPending,
    isGraphLoading: getGraph.isPending,
    isNomenklaturaLoading: getNomenklatura.isPending,
    isComparisonCardsLoading: getComparisonCards.isPending,
  };
};
