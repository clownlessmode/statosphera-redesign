import { api } from "@shared/api/api";
import { UpdateStoreDto } from "./types";

export class EditStoreService {
  static async updateStore(data: UpdateStoreDto) {
    const response = await api.patch<void>("store/update-store", data);
    return response.data;
  }
}
