import { api } from "@shared/api/api";

export class UnloadService {
  static async getAudience() {
    const response = await api.get("/unload/name-audience");
    return response.data;
  }
}
