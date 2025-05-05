import { api } from "@shared/api/api";
import { LoyalActionFilterResponse, LoyalBonusFilterResponse } from "./types";

export class FiltersLoyalityService {
  static async getLoyalAction(dto: any): Promise<LoyalActionFilterResponse[]> {
    const response = await api.post<any>("filters/loyal-action", {
      ...dto,
      filters: {
        ...dto.filters,
        loyal: {
          ...dto.filters.loyal,
          guidDiscount: [],
        },
      },
    });
    return response.data;
  }
  static async getLoyalBonus(dto: any): Promise<LoyalBonusFilterResponse[]> {
    const response = await api.post<any>("filters/loyal-bonus", {
      ...dto,
      filters: {
        ...dto.filters,
        loyal: {
          ...dto.filters.loyal,
          guidBonus: [],
        },
      },
    });
    return response.data;
  }
}
