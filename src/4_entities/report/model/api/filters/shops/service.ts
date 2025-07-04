import { api } from "@shared/api/api";
export interface PartnersFilterResponse {
  nameManager: string;
  idManager: number[];
}
export interface RegionsFilterResponse {
  storeRegion: string;
  regionId: number;
}
export interface CitiesFilterResponse {
  storeCity: string;
  cityId: number;
}
export interface ShopsFilterResponse {
  storeName: string;
  idStore: number[];
}
export class FiltersShopsService {
  static async getPartners(dto: any): Promise<PartnersFilterResponse[]> {
    const response = await api.post<any>("store/manager", {
      ...dto,
      filters: {
        ...dto.filters,
        store: {
          ...dto.filters.store,
          idManager: [],
        },
      },
    });
    return response.data;
  }
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("filters/region", {
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
    const response = await api.post<any>("filters/city", {
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
    const response = await api.post<any>("store/shop", {
      ...dto.filters.store,
      idStore: [],
    });
    return response.data;
  }
}
