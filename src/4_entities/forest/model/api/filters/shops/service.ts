import { api } from "@shared/api/api";
import {
  CitiesFilterResponse,
  RegionsFilterResponse,
  ShopsFilterResponse,
} from "./types";

export class FiltersShopsService {
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_region", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idRegion: [],
        },
      },
    });
    return response.data;
  }
  static async getCities(dto: any): Promise<CitiesFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_city", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idCity: [],
        },
      },
    });
    return response.data;
  }
  static async getShops(dto: any): Promise<ShopsFilterResponse[]> {
    const response = await api.post<any>("iiko/filters_store", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idStore: [],
        },
      },
    });
    return response.data;
  }
}
