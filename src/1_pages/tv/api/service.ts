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

    // Оптимизация: выполняем все запросы параллельно вместо последовательно
    const [
      proceedPerMonth,
      countStoreRegion,
      topstoreProceed,
      antiTopstoreProceed,
      monthProceed,
      lastMonthProceed,
      yearsProceed,
      topProductProfit,
    ] = await Promise.all([
      api.get<ProceedPerMonth>("/tv/data-proceed-per-month"),
      api.get<CountStoreRegion>("/tv/data-count-store-in-region"),
      api.get<TopStoreProceed>("/tv/data-top-5-store-by-proceed"),
      api.get<AntiTopstoreProceed>("/tv/data-antitop-5-store-by-proceed"),
      api.get<MonthProceed>("/tv/data-month-proceed"),
      api.get<LastMonthProceed>("/tv/data-last-month-proceed"),
      api.get<YearsProceed>("/tv/data-years-proceed"),
      api.get<TopProductProfit>("/tv/data-top-5-product-by-profit"),
    ]);

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
