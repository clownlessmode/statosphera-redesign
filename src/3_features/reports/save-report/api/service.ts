import { api } from "@shared/api/api";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";

export interface CheckUniqueRequest {
  reportName: string;
}

export interface CheckUniqueResponse {
  available: boolean;
}

export interface SaveReportRequest {
  filters: FilterApiPayload["filters"];
  values: string[];
  groups: string[];
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  reportName: string;
  mode: "COMMERCIAL" | "CHECK";
}

export interface SaveReportResponse {
  success: boolean;
  reportId?: number;
  message?: string;
}

export class SaveReportService {
  static async checkUnique(
    request: CheckUniqueRequest,
  ): Promise<CheckUniqueResponse> {
    const response = await api.post<CheckUniqueResponse>(
      "report/check-unique",
      request,
    );
    return response.data;
  }

  static async saveReport(
    request: SaveReportRequest,
  ): Promise<SaveReportResponse> {
    const response = await api.post<SaveReportResponse>(
      "report/upload",
      request,
    );
    return response.data;
  }
}
