import { api } from "@shared/api/api";
import { DownloadFarmerRequest, DownloadFarmerResponse } from "./types";

export class DownloadFarmerService {
  static async downloadFarmer(
    request: DownloadFarmerRequest,
  ): Promise<DownloadFarmerResponse> {
    const response = await api.post<DownloadFarmerResponse>(
      "report-page/data_export_farmer",
      request,
    );
    return response.data;
  }
}
