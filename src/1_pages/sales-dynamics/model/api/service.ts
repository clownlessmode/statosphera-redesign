import { api } from "@shared/api/api";
import { SalesDynamicsApiPayload } from "../filters-store";

export interface SalesTableResponse {
  data: any[];
  totalRows: number;
}

export interface SalesTotalResponse {
  data: any[];
  totalRows: number;
}

export type GraphPoint = [string, number];
export interface GraphSeries {
  name: string;
  data: GraphPoint[];
}
export interface GraphCard {
  name1: string;
  name2: string;
  negative: boolean;
  value1: string;
  value2: string;
}
export interface SalesGraphResponse {
  graph: GraphSeries[];
}

export type SalesDynamicsApiPayloadGraph = Omit<
  SalesDynamicsApiPayload,
  "values" | "groups"
> & {
  value: string;
  groups: string;
};
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
export class SalesDynamicsService {
  static async getPartners(dto: any): Promise<PartnersFilterResponse[]> {
    const response = await api.post<any>("store/manager", {
      filters: {
        store: { ...dto.filters },
      },
    });
    return response.data;
  }
  static async getRegions(dto: any): Promise<RegionsFilterResponse[]> {
    const response = await api.post<any>("filters/region", {
      filters: {
        store: { ...dto.filters },
      },
    });
    return response.data;
  }
  static async getCities(dto: any): Promise<CitiesFilterResponse[]> {
    const response = await api.post<any>("filters/city", {
      filters: {
        store: { ...dto.filters },
      },
    });
    return response.data;
  }
  static async getShops(dto: any): Promise<ShopsFilterResponse[]> {
    const response = await api.post<any>("store/shop", {
      filters: {
        store: { ...dto.filters },
      },
    });
    return response.data;
  }
  static async getSalesDynamicsTable(
    dto: SalesDynamicsApiPayload
  ): Promise<SalesTableResponse> {
    const response = await api.post<any>("Sales_dynamics/tbl", dto);

    return response.data;
  }
  static async getSalesDynamicsGraph(
    dto: SalesDynamicsApiPayloadGraph
  ): Promise<GraphSeries[]> {
    const response = await api.post<any>("Sales_dynamics/graphic_sales", {
      ...dto,
    });
    return response.data;
  }
  static async getSalesDynamicsTotal(
    dto: SalesDynamicsApiPayload
  ): Promise<SalesTotalResponse> {
    const { ...payload } = dto;

    const response = await api.post<any>("Sales_dynamics/tbl_total", payload);
    return response.data;
  }
}
