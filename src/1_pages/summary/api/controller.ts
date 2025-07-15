import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  SummaryTableRequest,
  SummaryTableResponse,
  SummaryNomenklaturaResponse,
  // SummaryComparisonCardsRequest,
} from "./types";
import { ApiError } from "@shared/api/types";
import { SummaryService } from "./service";
import { FilterApiPayload } from "@widgets/summary/sheet/model/filters-store";
import {
  transformToSummaryDto,
  transformToNomenklaturaDto,
} from "../utils/transform-summary-dto";
import { SummaryComparisonCardsResponse } from "./types/responses";

export const useSummaryController = () => {
  const queryClient = useQueryClient();

  // const getCards = useMutation<
  //   SummaryCardResponse[],
  //   ApiError,
  //   FilterApiPayload
  // >({
  //   mutationFn: (payload: FilterApiPayload) => {
  //     const dto = transformToSummaryDto(payload) as SummaryCardRequest;
  //     queryClient.invalidateQueries({ queryKey: ["cards"] });
  //     return SummaryService.getCards(dto);
  //   },
  // });

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
    // SummaryComparisonCardsRequest
  >({
    mutationFn: (data) => {
      queryClient.invalidateQueries({ queryKey: ["comparison-cards"] });
      return SummaryService.getComparisonCards(data);
    },
  });

  //   const getTotal = useMutation<
  //     SummaryTotalResponse,
  //     ApiError,
  //     FilterApiPayload
  //   >({
  //     mutationFn: (payload: FilterApiPayload) => {
  //       const dto = transformToSummaryDto(payload);
  //       queryClient.invalidateQueries({ queryKey: ["summary-total"] });
  //       return SummaryService.getTotal(dto);
  //     },
  //   });

  return {
    getTable: getTable.mutateAsync,
    getNomenklatura: getNomenklatura.mutateAsync,
    getComparisonCards: getComparisonCards.mutateAsync,
    // getTotal: getTotal.mutateAsync,
    isTableLoading: getTable.isPending,
    isNomenklaturaLoading: getNomenklatura.isPending,
    isComparisonCardsLoading: getComparisonCards.isPending,
    // isTotalLoading: getTotal.isPending,
  };
};
