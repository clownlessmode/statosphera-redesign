import { api } from "@shared/api/api";
import {
  AntiTopstoreProceed,
  CountStoreRegion,
  GetNightShopsResponse,
  LastMonthProceed,
  MonthProceed,
  ProceedPerMonth,
  TopProductProfit,
  TopStoreProceed,
  YearsProceed,
} from "./types";
// import { mockWeeklyRevenue } from "./mock";

export class NightShopsService {
  static async getNightShopsData(): Promise<GetNightShopsResponse> {
    // Возврат мока с задержкой 1 секунда
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(mockWeeklyRevenue);
    //   }, 1000);
    // });

    // Если хочешь включать реальные данные — закомментируй return выше и раскомментируй ниже
    const proceedPerMonth = await api.get<ProceedPerMonth>(
      "/tv/data-proceed-per-month",
    );
    const countStoreRegion = await api.get<CountStoreRegion>(
      "/tv/data-count-store-in-region",
    );
    const topstoreProceed = await api.get<TopStoreProceed>(
      "/tv/data-top-5-store-by-proceed",
    );
    const antiTopstoreProceed = await api.get<AntiTopstoreProceed>(
      "/tv/data-antitop-5-store-by-proceed",
    );
    const monthProceed = await api.get<MonthProceed>("/tv/data-month-proceed");
    const lastMonthProceed = await api.get<LastMonthProceed>(
      "/tv/data-last-month-proceed",
    );
    const yearsProceed = await api.get<YearsProceed>("/tv/data-years-proceed");
    const topProductProfit = await api.get<TopProductProfit>(
      "/tv/data-top-5-product-by-profit",
    );

    return {
      proceedPerMonth: proceedPerMonth.data,
      countStoreRegion: countStoreRegion.data,
      topStoreProceed: topstoreProceed.data,
      antiTopstoreProceed: antiTopstoreProceed.data,
      monthProceed: monthProceed.data,
      lastMonthProceed: lastMonthProceed.data,
      yearsProceed: yearsProceed.data,
      topProductProfit: topProductProfit.data,
    };
  }
}
