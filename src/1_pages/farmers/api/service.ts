import { api } from "@shared/api/api";

export class FarmersService {
  static async getAllFarmers() {
    const response = await api.get("/profile/get-all-profiles");
    return response.data;
  }
}
