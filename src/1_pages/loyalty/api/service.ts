import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class LoyaltyService {
  static async getAvarageCheck(dto: RequestDto) {
    const response = await api.post("loyal/average-check", dto);
    return response.data;
  }

  static async getNoSales30DaysUser(dto: RequestDto) {
    const response = await api.post("loyal/no-sales-30-days-user", dto);
    return response.data;
  }

  static async getUniques() {
    const response = await api.get("loyal/client-total");
    return response.data;
  }

  static async getBonuses(dto: RequestDto) {
    const response = await api.post("loyal/bonus", dto);
    return response.data;
  }

  static async getTopGroup(dto: RequestDto) {
    const response = await api.post("loyal/top-groups-rub", dto);
    return response.data;
  }

  static async getTopProductRub(dto: RequestDto) {
    const response = await api.post("loyal/top-product-rub", dto);
    return response.data;
  }

  static async getTopProductCount(dto: RequestDto) {
    const response = await api.post("loyal/top-product-count", dto);
    return response.data;
  }

  static async getTopStoreLoyal(dto: RequestDto) {
    const response = await api.post("loyal/top-store-loyal", dto);
    return response.data;
  }
  static async getBonusGraph(dto: RequestDto) {
    const response = await api.post("loyal/bonus-graph", dto);
    return response.data;
  }

  static async getUniqueGraph(dto: RequestDto) {
    const response = await api.post("loyal/unique-user-graph", dto);
    return response.data;
  }
  static async getAppLoyalGraph(dto: RequestDto) {
    const response = await api.post("loyal/app-loyal-graph", dto);
    return response.data;
  }
}
