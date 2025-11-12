import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class UnloadService {
  static async getAudience(dto: RequestDto) {
    const response = await api.post("/unload/build-audience", dto);
    return response.data;
  }

  static async saveAudience(dto: RequestDto) {
    const response = await api.post("/unload/save-audience", dto);
    return response.data;
  }
}
