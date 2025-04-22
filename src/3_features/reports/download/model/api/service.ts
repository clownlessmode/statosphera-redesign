import { api } from "@shared/api/api";
import { DownloadReportRequest, DownloadReportResponse } from "./types";

export class DownloadReportService {
  static async downloadReport(
    request: DownloadReportRequest
  ): Promise<DownloadReportResponse> {
    const response = await api.post<DownloadReportResponse>(
      "report-page/data_export",
      request
    );
    return response.data;
  }
}
