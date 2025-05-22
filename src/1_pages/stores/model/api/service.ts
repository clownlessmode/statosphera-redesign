import { api } from "@shared/api/api";
import { Store } from "../types";

export class StoresService {
  static async getStores() {
    const response = await api.get<Store[]>("store/all");
    return response.data;
  }
  static async getStore(id: number) {
    const response = await api.get<Store[]>(`store/${id}`);
    return response.data[0];
  }
}
