import { api } from "@shared/api/api";
import { ShopProductsResponse } from "../config/types";

export class MonitoringService {
  static async getProducts(search: string): Promise<ShopProductsResponse[]> {
    const response = await api.get(`/price-monitoring/${search}`);
    console.log(response.data);
    return response.data;
  }
}
