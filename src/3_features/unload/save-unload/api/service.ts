import { api } from "@shared/api/api";
import { PreparedFilterBlock } from "@widgets/unload/sheet/model/filters-store";

export interface CheckUniqueRequest {
  unloadName: string;
}

export interface CheckUniqueResponse {
  available: boolean;
}

export interface SaveUnloadRequest {
  filter: {
    include: PreparedFilterBlock[];
    exclude: PreparedFilterBlock[];
  };
  nameAudience: string;
}

export class SaveUnloadService {
  static async checkUnique(
    request: CheckUniqueRequest,
  ): Promise<CheckUniqueResponse> {
    const response = await api.post("unload/check-unique", request);
    return response.data;
  }

  static async saveUnload(request: SaveUnloadRequest) {
    const response = await api.post("unload/save-audience", request);
    return response.data;
  }
}
