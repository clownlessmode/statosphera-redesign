import { GetWeeklyRevenueResponse } from "./types";
// import { mockWeeklyRevenue } from "./mock";
import { api } from "@shared/api/api";

export class DashboardService {
  static async getWeeklyRevenue(): Promise<GetWeeklyRevenueResponse> {
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
}
