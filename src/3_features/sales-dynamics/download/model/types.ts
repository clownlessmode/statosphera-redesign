import { SalesDynamicsApiPayload } from "@pages/sales-dynamics/model/filters-store";

export interface DownloadReportRequest extends SalesDynamicsApiPayload {}

export interface DownloadReportResponse {
  message: string;
}
