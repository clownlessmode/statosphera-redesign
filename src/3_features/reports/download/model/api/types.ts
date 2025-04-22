import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";

export interface DownloadReportRequest extends FilterApiPayload {
  typeFile: "csv" | "excel";
}

export interface DownloadReportResponse {
  message: string;
}
