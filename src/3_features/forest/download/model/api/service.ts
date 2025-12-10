import { api } from "@shared/api/api";
import { DownloadForestRequest, DownloadForestResponse } from "./types";

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

export class DownloadForestService {
  static async downloadForest(
    request: DownloadForestRequest,
  ): Promise<DownloadForestResponse> {
    const response = await api.post<DownloadForestResponse>(
      "iiko/data_export",
      processFiltersDto(request),
    );
    return response.data;
  }

  static async downloadForestWriteOff(
    request: DownloadForestRequest,
  ): Promise<DownloadForestResponse> {
    const response = await api.post<DownloadForestResponse>(
      "iiko-write-off/data_export",
      processFiltersDto({
        ...request,
        values: [
          "costPrice",
          "costPriceLY",
          "costPriceYoY",
          "costPriceYoYPercent",
          "costPriceLM",
          "costPriceMoM",
          "costPriceMoMPercent",
        ],
      }),
    );
    return response.data;
  }
}
