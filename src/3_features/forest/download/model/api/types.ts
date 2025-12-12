import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";

export interface DownloadForestRequest extends FilterApiPayload {
  typeFile: "csv" | "excel";
}

export interface DownloadForestResponse {
  message: string;
}
