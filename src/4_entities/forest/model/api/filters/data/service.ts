import { api } from "@shared/api/api";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";

export interface ForestTableResponse {
  data: any[];
  totalRows: number;
}

export interface ForestTotalResponse {
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
export interface ForestGraphResponse {
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

// Функция для загрузки опций фильтра без разбиения JSON строк
export function processFiltersDtoForOptions(dto: any): any {
  return dto; //возвроащает данные как есть
}
export class ForestService {
  static async getForestTable(
    dto: FilterApiPayload,
  ): Promise<ForestTableResponse> {
    const response = await api.post<any>("iiko/data", processFiltersDto(dto));

    return response.data;
  }
  static async getForestGraph(
    dto: FilterApiPayload,
  ): Promise<ForestGraphResponse> {
    const response = await api.post<any>(
      "iiko/graphic",
      processFiltersDto(dto),
    );
    return response.data;
  }
  static async getForestTotal(
    dto: FilterApiPayload,
  ): Promise<ForestTotalResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { limit, offset, ...payload } = dto;

    const response = await api.post<any>(
      "iiko/data_total",
      processFiltersDto(payload),
    );
    return response.data;
  }
}
