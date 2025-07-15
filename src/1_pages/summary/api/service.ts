import { api } from "@shared/api/api";
import {
  SummaryTableRequest,
  SummaryTableResponse,
  SummaryTotalRequest,
  SummaryTotalResponse,
  SummaryNomenklaturaResponse,
  // SummaryComparisonCardsRequest,
} from "./types";
import { SummaryComparisonCardsResponse } from "./types/responses";

export class SummaryService {
  // static async getCards(
  //   data: SummaryCardRequest,
  // ): Promise<SummaryCardResponse[]> {
  //   const response = await api.post<SummaryCardResponse[]>(
  //     "/comparison/cards",
  //     data,
  //   );
  //   return response.data;
  // }

  // static async getTable(
  //   data: SummaryTableRequest,
  // ): Promise<SummaryTableResponse> {
  //   const response = await api.post<SummaryTableData[]>(
  //     "/comparison/table",
  //     data,
  //   );

  //   // API возвращает массив напрямую, преобразуем в нужный формат
  //   // return {
  //   //   data: response.data,
  //   //   // totalRows: response.data.length,
  //   // };
  // }

  static async getTotal(
    data: SummaryTotalRequest,
  ): Promise<SummaryTotalResponse> {
    const response = await api.post<SummaryTotalResponse[]>(
      "/comparison/total",
      data,
    );
    // API возвращает массив с одним элементом, берем первый
    return response.data[0];
  }

  static async getNomenklatura(
    data: any,
  ): Promise<SummaryNomenklaturaResponse[]> {
    const response = await api.post<SummaryNomenklaturaResponse[]>(
      "/products/filter",
      data,
    );
    return response.data;
  }

  static async getComparisonCards(
    data: any,
  ): Promise<SummaryComparisonCardsResponse> {
    const response = await api.post<SummaryComparisonCardsResponse>(
      "/comparison/cards",
      data,
    );
    return response.data;
  }

  static async getTable(
    data: SummaryTableRequest,
  ): Promise<SummaryTableResponse> {
    const response = await api.post<SummaryTableResponse>(
      "/comparison/table",
      data,
    );
    return response.data;
  }
}
