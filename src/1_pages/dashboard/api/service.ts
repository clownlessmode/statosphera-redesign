import { api } from "@shared/api/api";
import { GetWeeklyRevenueResponse, SalesDayResponse } from "./types";
// import { mockWeeklyRevenue } from "./mock";

export class DashboardService {
  static async getAllData(): Promise<GetWeeklyRevenueResponse> {
    // Возврат мока с задержкой 1 секунда
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mockWeeklyRevenue);
    //   }, 1000);
    // });

    // Если хочешь включать реальные данные — закомментируй return выше и раскомментируй ниже
    const response = await api.get<GetWeeklyRevenueResponse>("home-page/all");
    return response.data;
  }

  static async getSalesDayData(): Promise<SalesDayResponse> {
    const response = await api.get<SalesDayResponse>("home-page/sales-day");
    return response.data;
  }
}
