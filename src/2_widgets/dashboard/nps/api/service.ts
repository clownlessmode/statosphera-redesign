import { api } from "@shared/api/api";

export class NpsService {
  static async getSummaryNps() {
    const response = await api.get("home-page/nps");
    return response.data;
  }
}
