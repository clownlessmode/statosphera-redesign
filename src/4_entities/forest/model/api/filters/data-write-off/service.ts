import { api } from "@shared/api/api";
import { FilterApiPayload } from "@widgets/forest/sheet/model/filters-store";

export interface ForestWriteOffTableResponse {
  data: any[];
  totalRows: number;
}

export interface ForestWriteOffTotalResponse {
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
export interface ForestWriteOffGraphResponse {
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
    values: [
      "costPrice",
      "costPriceLY",
      "costPriceYoY",
      "costPriceYoYPercent",
      "costPriceLM",
      "costPriceMoM",
      "costPriceMoMPercent",
      "amountWriteOff",
      "amountWriteOffLY",
      "amountWriteOffYoY",
      "amountWriteOffYoYPercent",
      "amountWriteOffLM",
      "amountWriteOffMoM",
      "amountWriteOffMoMPercent",
    ],
  };
}

export class ForestWriteOffService {
  static async getGraph(
    dto: FilterApiPayload,
  ): Promise<ForestWriteOffGraphResponse> {
    const response = await api.post<ForestWriteOffGraphResponse>(
      "/iiko-write-off/graphic",
      processFiltersDto(dto),
    );
    return response.data;
  }

  static async getTable(
    dto: FilterApiPayload,
  ): Promise<ForestWriteOffTableResponse> {
    const response = await api.post<ForestWriteOffTableResponse>(
      "/iiko-write-off/data",
      processFiltersDto(dto),
    );

    // API возвращает массив напрямую, преобразуем в нужный формат
    return response.data;
  }

  static async getTotal(
    dto: FilterApiPayload,
  ): Promise<ForestWriteOffTotalResponse> {
    const response = await api.post<ForestWriteOffTotalResponse>(
      "/iiko-write-off/data_total",
      processFiltersDto(dto),
    );
    // API возвращает массив с одним элементом, берем первый
    return response.data;
  }
}
