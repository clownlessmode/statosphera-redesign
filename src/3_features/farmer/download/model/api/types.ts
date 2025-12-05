import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";

export interface DownloadFarmerRequest extends FilterApiPayload {
  typeFile: "csv" | "excel";
}

export interface DownloadFarmerResponse {
  message: string;
}
