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
  static async getTopActions(dto: RequestDto) {
    const response = await api.post("loyal/action-app-loyal", dto);
    return response.data;
  }

  static async getLoyalCard2(dto: RequestDto) {
    const response = await api.post("loyal/loyal-card-line2", dto);
    return response.data;
  }

  static async getAgeGroupsGraph(dto: RequestDto) {
    const response = await api.post("loyal/frequency-sales-loyal", dto);
    return response.data;
  }

  static async getAgeCircleGraph(dto: RequestDto) {
    const response = await api.post("loyal/check-gender", dto);
    return response.data;
  }

  static async ageSalesGraph(dto: RequestDto) {
    const response = await api.post("loyal/check-age-gender", dto);
    return response.data;
  }

  static async revenueGroupsGraph(dto: RequestDto) {
    const response = await api.post("loyal/check-age-proceeds", dto);
    return response.data;
  }
}
