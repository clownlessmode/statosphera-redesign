import { api } from "@shared/api/api";
import { Coordinates } from "@entities/store/config";
import { Store } from "@entities/store/config";
import { StoreFilters } from "../types";

export class StoresService {
  static async getStores(filters: StoreFilters) {
    const response = await api.post<Store[]>("store/all", filters);
    return response.data;
  }
  static async getStore(id: number) {
    const response = await api.get<Store[]>(`store/${id}`);
    return response.data[0];
  }
  static async getMap() {
    const response = await api.get<Coordinates[]>(`store/coordinates`);
    return response.data;
  }
}
