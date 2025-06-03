import { api } from "@shared/api/api";
import { FilterApiPayload } from "@widgets/report/sheet/model/filters-store";

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
export function processFiltersDto(dto: any): any {
  const flattenStringArrays = (arr: string[]): number[] => {
    return arr.flatMap((str) => {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    });
  };

  const processFilters = (filters: any): any => {
    const processed = { ...filters };

    // Обрабатываем все вложенные объекты
    Object.keys(processed).forEach((category) => {
      if (processed[category] && typeof processed[category] === "object") {
        Object.keys(processed[category]).forEach((field) => {
          const value = processed[category][field];
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "string" &&
            value[0].startsWith("[")
          ) {
            processed[category][field] = flattenStringArrays(value);
          }
        });
      }
    });

    return processed;
  };

  return {
    ...dto,
    filters: processFilters(dto.filters),
  };
}
export class ReportService {
  static async getReportTable(
    dto: FilterApiPayload
  ): Promise<ReportTableResponse> {
    const response = await api.post<any>(
      "report-page/data",
      processFiltersDto(dto)
    );

    return response.data;
  }
  static async getReportGraph(
    dto: FilterApiPayload
  ): Promise<ReportGraphResponse> {
    const response = await api.post<any>(
      "report-page/graphic",
      processFiltersDto(dto)
    );
    return response.data;
  }
  static async getReportTotal(
    dto: FilterApiPayload
  ): Promise<ReportTotalResponse> {
    const { limit, offset, ...payload } = dto;

    const response = await api.post<any>(
      "report-page/data_total",
      processFiltersDto(payload)
    );
    return response.data;
  }
}
