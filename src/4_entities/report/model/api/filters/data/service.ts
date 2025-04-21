import { api } from "@shared/api/api";

export interface ReportTableResponse {
  data: any[];
  totalRows: number;
}

export interface ReportTotalResponse {
  data: any[];
  totalRows: number;
}

export type GraphPoint = [string, number];
export interface GraphSeries {
  name: string;
  data: GraphPoint[];
}
export interface GraphCard {
  name1: string;
  name2: string;
  negative: boolean;
  value1: string;
  value2: string;
}
export interface ReportGraphResponse {
  graph: GraphSeries[];
  card1: GraphCard;
  card2: GraphCard;
  card3: GraphCard;
}

export class ReportService {
  static async getReportTable(dto: any): Promise<ReportTableResponse> {
    const response = await api.post<any>("report-page/data", dto);

    return response.data;
  }
  static async getReportGraph(dto: any): Promise<ReportGraphResponse> {
    console.log(dto);
    const response = await api.post<any>("report-page/graphic", dto);
    return response.data;
  }
  static async getReportTotal(dto: any): Promise<ReportTotalResponse> {
    const response = await api.post<any>("report-page/data_total", dto);
    return response.data;
  }
}
