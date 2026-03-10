import { api } from "@shared/api/api";
import {
  SummaryTableRequest,
  SummaryTableResponse,
  SummaryTotalRequest,
  SummaryTotalResponse,
  SummaryNomenklaturaResponse,
} from "./types";
import {
  SummaryComparisonCardsResponse,
  SummaryGraphResponse,
} from "./types/responses";
import { SummaryGraphRequest } from "./types/requests";

export class SummaryService {
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
      "/products/current-period",
      {
        ...data,
        is_products: false,
      },
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

  static async getGraph(
    data: SummaryGraphRequest,
  ): Promise<SummaryGraphResponse> {
    const response = await api.post<SummaryGraphResponse>(
      "/comparison/graph",
      data,
    );
    return response.data;
  }
}
