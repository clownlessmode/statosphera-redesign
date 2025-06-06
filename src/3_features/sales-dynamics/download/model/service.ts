import { api } from "@shared/api/api";
import { DownloadReportRequest, DownloadReportResponse } from "./types";

export class DownloadReportService {
  static async downloadReport(
    request: DownloadReportRequest,
  ): Promise<DownloadReportResponse> {
    const response = await api.post<DownloadReportResponse>(
      "Sales_dynamics/download_excel",
      request,
      { responseType: "blob" },
    );
    return response.data;
  }
}
