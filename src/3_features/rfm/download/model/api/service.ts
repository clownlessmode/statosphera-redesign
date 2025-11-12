import { api } from "@shared/api/api";
import { DownloadMigrationsRequest, DownloadSegmentRequest } from "./types";

export class DownloadMigrationsService {
  static async downloadMigrations(request: DownloadMigrationsRequest) {
    await api.post("/rfm/download-migrations-client", request);
  }
}

export class DownloadSegmentService {
  static async downloadSegment(request: DownloadSegmentRequest) {
    await api.post("/rfm/download-segment-client", request);
  }
}
