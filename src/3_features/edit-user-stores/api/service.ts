import { api } from "@shared/api/api";
import { EditUserStoresDto } from "./types";

export class EditUserStoresService {
  static async updateUserStores(id_user: number, data: EditUserStoresDto) {
    const response = await api.patch<void>(
      `admin-users/${id_user}/id-store`,
      data,
    );
    return response.data;
  }
}
