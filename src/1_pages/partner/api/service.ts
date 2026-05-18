import { api } from "@shared/api/api";
import type {
  GraphPartnerRequest,
  GraphPartnerResponse,
  TablePartnerRequest,
  TablePartnerResponse,
  TableTotalPartnerRequest,
  TableTotalPartnerResponse,
} from "./types";

export class PartnerService {
  static async getTable(
    request: TablePartnerRequest,
  ): Promise<TablePartnerResponse> {
    const response = await api.post<TablePartnerResponse>(
      "/partner/table",
      request,
    );
    return response.data;
  }

  static async getTableTotal(
    request: TableTotalPartnerRequest,
  ): Promise<TableTotalPartnerResponse> {
    const response = await api.post<TableTotalPartnerResponse>(
      "/partner/table-total",
      request,
    );
    return response.data;
  }

  static async getGraph(
    request: GraphPartnerRequest,
  ): Promise<GraphPartnerResponse> {
    const response = await api.post<GraphPartnerResponse>(
      "/partner/graph",
      request,
    );
    return response.data;
  }
}
