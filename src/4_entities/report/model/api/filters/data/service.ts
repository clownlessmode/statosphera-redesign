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

export const mockData = {
  graph: [
    {
      name: "Выбранный период",
      data: [
        ["2025-04-01", 26332184],
        ["2025-04-02", 26672743],
        ["2025-04-03", 28492564],
        ["2025-04-04", 31926369],
        ["2025-04-05", 25433627],
        ["2025-04-06", 20439182],
        ["2025-04-07", 24474108],
        ["2025-04-08", 25651170],
        ["2025-04-09", 27141710],
        ["2025-04-10", 30117974],
        ["2025-04-11", 34502424],
        ["2025-04-12", 30595743],
        ["2025-04-13", 23584530],
        ["2025-04-14", 26337250],
        ["2025-04-15", 29347587],
        ["2025-04-16", 29937957],
      ],
    },
    {
      name: "Прошлый год",
      data: [
        ["2025-04-01", 25486060],
        ["2025-04-02", 26952643],
        ["2025-04-03", 28304461],
        ["2025-04-04", 28751558],
        ["2025-04-05", 32942873],
        ["2025-04-06", 30539278],
        ["2025-04-07", 23062001],
        ["2025-04-08", 25701343],
        ["2025-04-09", 26305156],
        ["2025-04-10", 28564117],
        ["2025-04-11", 29778647],
        ["2025-04-12", 34566796],
        ["2025-04-13", 29690083],
        ["2025-04-14", 22002662],
        ["2025-04-15", 26772287],
        ["2025-04-16", 29043777],
      ],
    },
  ],
  card1: {
    name1: "Выручка",
    value1: "440 987 122 Руб.",
    name2: "Выручка прошлый год",
    value2: "448 463 742 Руб.",
    negative: false,
  },
  card2: {
    name1: "Изменения абсолютное",
    value1: "-7 476 620 Руб.",
    name2: "Изменения относительное",
    value2: "-1,67 %",
    negative: true,
  },
  card3: {
    name1: "Среднедневные значения",
    value1: "27 561 695,13 Руб.",
    name2: "Изменения к прошлому году",
    value2: "-467 288,75 Руб. / -1.67 %",
    negative: true,
  },
};

export class ReportService {
  static async getReportTable(dto: any): Promise<ReportTableResponse> {
    const response = await api.post<any>("report-page/data", dto);

    return response.data;
  }
  static async getReportGraph(dto: any): Promise<ReportGraphResponse> {
    console.log(dto);
    // const response = await api.post<any>("report-page/graphic", dto);
    // return response.data;
    return mockData as ReportGraphResponse;
  }
  static async getReportTotal(dto: any): Promise<ReportTotalResponse> {
    const response = await api.post<any>("report-page/data_total", dto);
    return response.data;
  }
}
