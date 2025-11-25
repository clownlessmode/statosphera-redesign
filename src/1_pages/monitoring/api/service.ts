import { api } from "@shared/api/api";
import { DownloadReportRequest, ShopProductsResponse } from "../config/types";

export class MonitoringService {
  static async getProducts(
    search: string,
    limit?: number,
  ): Promise<ShopProductsResponse[]> {
    const params = new URLSearchParams();
    if (limit) {
      params.append("limit", limit.toString());
    }
    const queryString = params.toString();
    const url = `/price-monitoring/${search}${queryString ? `?${queryString}` : ""}`;
    const response = await api.get(url);
    console.log(response.data);
    return response.data;
  }

  static async downloadReport(dto: DownloadReportRequest): Promise<any> {
    const response = await api.post<any>("/price-monitoring/export", dto, {
      responseType: "blob",
    });
    return response.data;
  }
}
