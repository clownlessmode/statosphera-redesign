import { api } from "@shared/api/api";
import { Coordinates, Store } from "../types";

export class StoresService {
  static async getStores() {
    const response = await api.get<Store[]>("store/all");
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
