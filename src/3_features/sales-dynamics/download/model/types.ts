import { SalesDynamicsApiPayload } from "@pages/sales-dynamics/model/filters-store";

export type DownloadReportRequest = SalesDynamicsApiPayload;

export interface DownloadReportResponse {
  message: string;
}
