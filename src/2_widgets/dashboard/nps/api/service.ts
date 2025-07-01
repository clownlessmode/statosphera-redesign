import { api } from "@shared/api/api";
import { NpsAllResponse, NpsGraphRequest, NpsGraphResponse } from "./types";

export class NpsService {
  static async getSummaryNps() {
    const response = await api.get("home-page/nps");
    return response.data;
  }
  static async getAllNps() {
    const response = await api.get<NpsAllResponse>("nps/all");
    return response.data;
  }

  static async getNpsGraph(
    request: NpsGraphRequest,
  ): Promise<NpsGraphResponse[]> {
    const response = await api.post("nps/graph", request);
    return response.data;
  }
}
