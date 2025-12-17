import { api } from "@shared/api/api";
import { DownloadWriteOffResponse } from "./types";
import { WriteOffTableRequest } from "@pages/write-off/api/types";

export class DownloadWriteOffService {
  static async downloadWriteOff(
    request: WriteOffTableRequest,
  ): Promise<DownloadWriteOffResponse> {
    const response = await api.post<DownloadWriteOffResponse>(
      "write-off/all-download",
      request,
    );
    return response.data;
  }

  static async downloadWriteOffEquipment(
    request: WriteOffTableRequest,
  ): Promise<DownloadWriteOffResponse> {
    const response = await api.post<DownloadWriteOffResponse>(
      "write-off/equipment-download",
      request,
    );
    return response.data;
  }
}
