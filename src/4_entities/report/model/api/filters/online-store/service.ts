import { api } from "@shared/api/api";
import {
  StatusOrderFilterResponse,
  IntervalFilterResponse,
  PromoFilterResponse,
} from "./types";

export class FiltersLoyalityService {
  static async getStatusOrder(dto: any): Promise<StatusOrderFilterResponse[]> {
    const response = await api.post<any>("filters/im-status-source", dto);
    return response.data;
  }
  static async getInterval(dto: any): Promise<IntervalFilterResponse[]> {
    const response = await api.post<any>("filters/im-interval-source", dto);
    return response.data;
  }
  static async getPromo(dto: any): Promise<PromoFilterResponse[]> {
    const response = await api.post<any>("filters/im-promo-source", dto);
    return response.data;
  }
}
