import { api } from "@shared/api/api";
import { ProductRequestDto, ProductResponse } from "../model";

export function processFiltersDto(dto: any): any {
  const flattenStringArrays = (arr: any[]): number[] => {
    return arr.flatMap((item) => {
      try {
        if (typeof item === "string" && item.startsWith("[")) {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : [];
        }
        return typeof item === "number" ? [item] : [];
      } catch {
        return [];
      }
    });
  };

  const processObject = (obj: any): any => {
    if (!obj || typeof obj !== "object") return obj;

    const processed = Array.isArray(obj) ? [...obj] : { ...obj };

    Object.keys(processed).forEach((key) => {
      const value = processed[key];

      if (
        Array.isArray(value) &&
        value.length > 0 &&
        value.some((v) => typeof v === "string" && v.startsWith("["))
      ) {
        processed[key] = flattenStringArrays(value);
      } else if (typeof value === "object" && value !== null) {
        processed[key] = processObject(value);
      }
    });

    return processed;
  };

  return processObject(dto);
}

export class ProductsService {
  static async getAllData(
    payload: ProductRequestDto,
  ): Promise<ProductResponse[]> {
    const response = await api.post<ProductResponse[]>(
      "products/all-nomenclature",
      processFiltersDto(payload),
    );
    return response.data;
  }
}
