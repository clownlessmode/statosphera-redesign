import { api } from "@shared/api/api";
import { DiscountTypeFilterResponse, TypePaymentFilterResponse } from "./types";

export class CheckFilterService {
  static async getDiscountType(
    dto: any,
  ): Promise<DiscountTypeFilterResponse[]> {
    const response = await api.post<any>("/iiko/filters_discount_type", dto);
    return response.data;
  }

  static async getTypePayment(dto: any): Promise<TypePaymentFilterResponse[]> {
    const response = await api.post<any>("/iiko/filters_type_payment", dto);
    return response.data;
  }
}
