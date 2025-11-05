import { api } from "@shared/api/api";
import { DownloadReportRequest, ShopProductsResponse } from "../config/types";

export class MonitoringService {
  static async getProducts(search: string): Promise<ShopProductsResponse[]> {
    const response = await api.get(`/price-monitoring/${search}`);
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
