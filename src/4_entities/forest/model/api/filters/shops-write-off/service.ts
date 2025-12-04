import { api } from "@shared/api/api";
import {
  CitiesFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
} from "./types";

export class FiltersShopsWriteOffService {
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("/iiko-write-off/filters_region", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idRegion: [],
        },
      },
      values: [
        "costPrice",
        "costPriceLY",
        "costPriceYoY",
        "costPriceYoYPercent",
        "costPriceLM",
        "costPriceMoM",
        "costPriceMoMPercent",
        "amountWriteOff",
        "amountWriteOffLY",
        "amountWriteOffYoY",
        "amountWriteOffYoYPercent",
        "amountWriteOffLM",
        "amountWriteOffMoM",
        "amountWriteOffMoMPercent",
      ],
    });
    return response.data;
  }
  static async getCities(dto: any): Promise<CitiesFilterResponse[]> {
    const response = await api.post<any>("/iiko-write-off/filters_city", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idCity: [],
        },
      },
      values: [
        "costPrice",
        "costPriceLY",
        "costPriceYoY",
        "costPriceYoYPercent",
        "costPriceLM",
        "costPriceMoM",
        "costPriceMoMPercent",
      ],
    });
    return response.data;
  }
  static async getShops(dto: any): Promise<ShopsFilterResponse[]> {
    const response = await api.post<any>("/iiko-write-off/filters_store", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idStore: [],
        },
      },
      values: [
        "costPrice",
        "costPriceLY",
        "costPriceYoY",
        "costPriceYoYPercent",
        "costPriceLM",
        "costPriceMoM",
        "costPriceMoMPercent",
      ],
    });
    return response.data;
  }
}
