import { FilterApiPayload } from "@widgets/summary/sheet/model/filters-store";
import {
  SummaryCardRequest,
  SummaryTableRequest,
  SummaryTotalRequest,
  SummaryComparisonCardsRequest,
} from "../api/types";

export function transformToSummaryDto(
  payload: FilterApiPayload,
): SummaryCardRequest | SummaryTableRequest | SummaryTotalRequest {
  const result = {
    filters: {
      store: {
        idStore: (payload.filters.store.idStore || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idCity: (payload.filters.store.idCity || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idRegion: (payload.filters.store.idRegion || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idManager: (payload.filters.store.idManager || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        storeCondition: payload.filters.store.storeCondition || [],
        ageGroup: payload.filters.store.ageGroup || [],
        idLegalEntity: (payload.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        channel: payload.filters.store.channel || [],
        district: payload.filters.store.district || [],
      },
    },
    dateStart: payload.filterDate.dateStart,
    dateEnd: payload.filterDate.dateEnd,
    idProduct: (payload.filters.product?.idProduct || [])
      .map((id) => parseInt(id.toString()))
      .filter((id) => !isNaN(id)),
    role: false, // По умолчанию false
    group: payload.groups,
    sort: payload.sorts,
    limit: payload.limit || 100,
    offset: payload.offset || 0,
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
): SummaryComparisonCardsRequest {
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

  const result: SummaryComparisonCardsRequest = {
    filters: {
      store: {
        idStore: (payload.filters.store.idStore || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idCity: (payload.filters.store.idCity || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idRegion: (payload.filters.store.idRegion || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        idManager: (payload.filters.store.idManager || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        storeCondition: payload.filters.store.storeCondition || [],
        ageGroup: payload.filters.store.ageGroup || [],
        idLegalEntity: (payload.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString()))
          .filter((id) => !isNaN(id)),
        channel: payload.filters.store.channel || [],
        district: payload.filters.store.district || [],
      },
      product: {
        groupFranchise: parseArrayValues(
          payload.filters.product?.groupFranchise || [],
        ),
        ppProducts: payload.filters.product?.ppProducts || null,
        isImProducts: null,
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
    dateStart: payload.filterDate.dateStart,
    dateEnd: payload.filterDate.dateEnd,
    idProduct:
      selectedProductIds.length > 0
        ? selectedProductIds
        : parseArrayValues(payload.filters.product?.idProduct || []),
    role: false,
    limit: payload.limit || 50,
    offset: payload.offset || 0,
  };

  return result;
}
