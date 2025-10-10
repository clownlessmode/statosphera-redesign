import { FilterApiPayload } from "@widgets/summary/sheet/model/filters-store";
import {
  SummaryCardRequest,
  SummaryTableRequest,
  SummaryTotalRequest,
  //   SummaryComparisonCardsRequest,
} from "../api/types";

// Функция для обработки строковых массивов (аналогично parseAllStringArrays)
const parseAllStringArrays = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.flatMap((item: any): any => {
      if (
        typeof item === "string" &&
        item.startsWith("[") &&
        item.endsWith("]")
      ) {
        try {
          const parsed = JSON.parse(item);
          return Array.isArray(parsed) ? parsed : item;
        } catch (e) {
          console.warn("Ошибка парсинга строкового массива:", item, e);
          return item;
        }
      }
      if (item && typeof item === "object") {
        return parseAllStringArrays(item);
      }
      return item;
    });
  }

  if (obj && typeof obj === "object" && obj.constructor === Object) {
    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = parseAllStringArrays(value);
    }
    return result;
  }

  return obj;
};

export function transformToSummaryDto(
  payload: FilterApiPayload,
): SummaryCardRequest | SummaryTableRequest | SummaryTotalRequest {
  // Обрабатываем данные перед преобразованием
  const processedPayload = {
    ...payload,
    filters: parseAllStringArrays(payload.filters),
  };

  const result = {
    filters: {
      store: {
        idStore: (processedPayload.filters.store.idStore || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idCity: (processedPayload.filters.store.idCity || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idRegion: (processedPayload.filters.store.idRegion || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idManager: (processedPayload.filters.store.idManager || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        storeCondition: processedPayload.filters.store.storeCondition || [],
        ageGroup: processedPayload.filters.store.ageGroup || [],
        idLegalEntity: (processedPayload.filters.store.idLegalEntity || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        channel: processedPayload.filters.store.channel || [],
        district: processedPayload.filters.store.district || [],
      },
    },
    dateStart: processedPayload.filterDate.dateStart,
    dateEnd: processedPayload.filterDate.dateEnd,
    idProduct: (processedPayload.filters.product?.idProduct || [])
      .map((id: any) => parseInt(id.toString()))
      .filter((id: any) => !isNaN(id)),
    role: false, // По умолчанию false
    group: processedPayload.groups,
    sort: processedPayload.sorts,
    limit: processedPayload.limit || 100,
    offset: processedPayload.offset || 0,
    package: processedPayload.package || false,
    fastSearch: processedPayload.fastSearch || false,
  };

  return result as SummaryTableRequest;
}

export function transformToNomenklaturaDto(payload: FilterApiPayload): any {
  // Функция для правильного преобразования значений
  const parseArrayValues = (arr: any[]): number[] => {
    return arr
      .map((item) => {
        // Если это строка в квадратных скобках, извлекаем число
        if (
          typeof item === "string" &&
          item.startsWith("[") &&
          item.endsWith("]")
        ) {
          const numStr = item.slice(1, -1);
          const num = parseInt(numStr);
          return isNaN(num) ? null : num;
        }
        // Если это обычное число или строка с числом
        const num = parseInt(item.toString());
        return isNaN(num) ? null : num;
      })
      .filter((item): item is number => item !== null);
  };

  const result = {
    filters: {
      product: {
        groupFranchise: parseArrayValues(
          payload.filters.product?.groupFranchise || [],
        ),
        ppProducts: payload.filters.product?.ppProducts || null,
        subDivisionProducts: parseArrayValues(
          payload.filters.product?.subDivisionProducts || [],
        ),
        subGroups: parseArrayValues(payload.filters.product?.subGroups || []),
        subSubGroups: parseArrayValues(
          payload.filters.product?.subSubGroups || [],
        ),
        typeProducts: parseArrayValues(
          payload.filters.product?.typeProducts || [],
        ),
        teamProducts: parseArrayValues(
          payload.filters.product?.teamProducts || [],
        ),
        directionProducts: parseArrayValues(
          payload.filters.product?.directionProducts || [],
        ),
        groupsEconomist: parseArrayValues(
          payload.filters.product?.groupsEconomist || [],
        ),
        idGroupMain: parseArrayValues(
          payload.filters.product?.idGroupMain || [],
        ),
        idProduct: parseArrayValues(payload.filters.product?.idProduct || []),
        seasonalityProducts: parseArrayValues(
          payload.filters.product?.seasonalityProducts || [],
        ),
        managerAuto: parseArrayValues(
          payload.filters.product?.managerAuto || [],
        ),
      },
    },
    filterDate: {
      dateStart: payload.filterDate.dateStart,
      dateEnd: payload.filterDate.dateEnd,
    },
  };

  return result;
}

export function transformToComparisonCardsDto(
  payload: FilterApiPayload,
  selectedProductIds: number[] = [],
) {
  // Обрабатываем данные перед преобразованием
  const processedPayload = {
    ...payload,
    filters: parseAllStringArrays(payload.filters),
  };

  // Функция для правильного преобразования значений
  const parseArrayValues = (arr: any[]): number[] => {
    return arr
      .map((item) => {
        // Если это строка в квадратных скобках, извлекаем число
        if (
          typeof item === "string" &&
          item.startsWith("[") &&
          item.endsWith("]")
        ) {
          const numStr = item.slice(1, -1);
          const num = parseInt(numStr);
          return isNaN(num) ? null : num;
        }
        // Если это обычное число или строка с числом
        const num = parseInt(item.toString());
        return isNaN(num) ? null : num;
      })
      .filter((item): item is number => item !== null);
  };

  const result = {
    filters: {
      store: {
        idStore: (processedPayload.filters.store.idStore || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idCity: (processedPayload.filters.store.idCity || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idRegion: (processedPayload.filters.store.idRegion || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        idManager: (processedPayload.filters.store.idManager || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        storeCondition: processedPayload.filters.store.storeCondition || [],
        ageGroup: processedPayload.filters.store.ageGroup || [],
        idLegalEntity: (processedPayload.filters.store.idLegalEntity || [])
          .map((id: any) => parseInt(id.toString()))
          .filter((id: any) => !isNaN(id)),
        channel: processedPayload.filters.store.channel || [],
        district: processedPayload.filters.store.district || [],
      },
    },
    dateStart: processedPayload.filterDate.dateStart,
    dateEnd: processedPayload.filterDate.dateEnd,
    idProduct:
      selectedProductIds.length > 0
        ? selectedProductIds
        : parseArrayValues(processedPayload.filters.product?.idProduct || []),
    role: false,
    limit: processedPayload.limit || 50,
    offset: processedPayload.offset || 0,
    package: processedPayload.package || false,
    fastSearch: processedPayload.fastSearch || false,
  };

  return result;
}
