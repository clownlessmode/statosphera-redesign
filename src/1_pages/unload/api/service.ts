import { api } from "@shared/api/api";
import { RequestDto } from "../config";

export class UnloadService {
  static async getAudience(dto: RequestDto, signal: AbortSignal) {
    const response = await api.post("/unload/build-audience", dto, { signal });
    return response.data;
  }
}
