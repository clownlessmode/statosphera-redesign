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
    const response = await api.post<any>("store-manager/filter-manager", dto);
    return response.data;
  }
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("store-region/filter-region", dto);
    return response.data;
  }
  static async getCities(dto: any): Promise<CitiesFilterResponse[]> {
    const response = await api.post<any>("store-city/filter-city", dto);
    return response.data;
  }
  static async getShops(dto: any): Promise<ShopsFilterResponse[]> {
    const response = await api.post<any>("store-shop/filter-shop", dto);
    return response.data;
  }
}
