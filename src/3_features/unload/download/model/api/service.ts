import { api } from "@shared/api/api";
import { DownloadAudienceRequest } from "./types";

export class DownloadAudienceService {
  static async downloadAudience(request: DownloadAudienceRequest) {
    await api.post("/unload/download-audience", request);
  }
}
