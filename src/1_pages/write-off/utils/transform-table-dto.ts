import { FilterApiPayload } from "@widgets/write-off/sheet/model/filters-store";
import { WriteOffTableRequest, WriteOffTotalRequest } from "../api/types";

export function transformToTableDto(
  payload: FilterApiPayload,
): WriteOffTableRequest {
  // Определяем тип на основе payload или используем переданный
  const type = (payload as any).type || "write_off";

  const result: WriteOffTableRequest = {
    filters: {
      store: {
        idStore: (payload.filters.store.idStore || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idCity: (payload.filters.store.idCity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idRegion: (payload.filters.store.idRegion || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idManager: (payload.filters.store.idManager || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        storeCondition: payload.filters.store.storeCondition || [],
        ageGroup: payload.filters.store.ageGroup || [],
        idLegalEntity: (payload.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        channel: payload.filters.store.channel || [],
        district: payload.filters.store.district || [],
      },
      product: {
        groupFranchise: payload.filters.product.groupFranchise || [],
        ppProducts: payload.filters.product.ppProducts || null,
        isImProducts: null,
        subDivisionProducts: payload.filters.product.subDivisionProducts || [],
        subGroups: payload.filters.product.subGroups || [],
        subSubGroups: payload.filters.product.subSubGroups || [],
        typeProducts: payload.filters.product.typeProducts || [],
        teamProducts: payload.filters.product.teamProducts || [],
        directionProducts: payload.filters.product.directionProducts || [],
        groupsEconomist: payload.filters.product.groupsEconomist || [],
        idGroupMain: (payload.filters.product.idGroupMain || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idProduct: (payload.filters.product.idProduct || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        seasonalityProducts: payload.filters.product.seasonalityProducts || [],
        managerAuto: payload.filters.product.managerAuto || [],
      },
    },
    filterDate: {
      filterDate: {
        dateStart: payload.filterDate.dateStart,
        dateEnd: payload.filterDate.dateEnd,
      },
    },
    limitOffset: {
      limit: payload.limit || 100,
      offset: payload.offset || 0,
    },
    role: false,
    group: payload.groups || [],
    type: type,
    household: payload.filters.writeoff?.household === true,
  };

  // Добавляем опциональные фильтры если они есть
  if (payload.filters.check) {
    result.filters.check = payload.filters.check;
  }
  if (payload.filters.loyal) {
    result.filters.loyal = payload.filters.loyal;
  }
  if (payload.filters.onlineStore) {
    result.filters.onlineStore = payload.filters.onlineStore;
  }

  return result;
}

// Отдельная функция для /write-off/all_total с другой структурой
export function transformToTotalDto(
  payload: FilterApiPayload,
): WriteOffTotalRequest {
  // Определяем тип на основе payload или используем переданный
  const type = (payload as any).type || "write_off";

  const result: WriteOffTotalRequest = {
    filters: {
      store: {
        idStore: (payload.filters.store.idStore || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idCity: (payload.filters.store.idCity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idRegion: (payload.filters.store.idRegion || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idManager: (payload.filters.store.idManager || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        storeCondition: payload.filters.store.storeCondition || [],
        ageGroup: payload.filters.store.ageGroup || [],
        idLegalEntity: (payload.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        channel: payload.filters.store.channel || [],
        district: payload.filters.store.district || [],
      },
      product: {
        groupFranchise: payload.filters.product.groupFranchise || [],
        ppProducts: payload.filters.product.ppProducts || null,
        isImProducts: null,
        subDivisionProducts: payload.filters.product.subDivisionProducts || [],
        subGroups: payload.filters.product.subGroups || [],
        subSubGroups: payload.filters.product.subSubGroups || [],
        typeProducts: payload.filters.product.typeProducts || [],
        teamProducts: payload.filters.product.teamProducts || [],
        directionProducts: payload.filters.product.directionProducts || [],
        groupsEconomist: payload.filters.product.groupsEconomist || [],
        idGroupMain: (payload.filters.product.idGroupMain || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idProduct: (payload.filters.product.idProduct || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        seasonalityProducts: payload.filters.product.seasonalityProducts || [],
        managerAuto: payload.filters.product.managerAuto || [],
      },
    },
    filterDate: {
      dateStart: payload.filterDate.dateStart,
      dateEnd: payload.filterDate.dateEnd,
    },
    limit: payload.limit || 100,
    offset: payload.offset || 0,
    role: false,
    group: payload.groups || [],
    type: type,
    household: payload.filters.writeoff?.household === true,
  };

  // Добавляем опциональные фильтры если они есть
  if (payload.filters.check) {
    result.filters.check = payload.filters.check;
  }
  if (payload.filters.loyal) {
    result.filters.loyal = payload.filters.loyal;
  }
  if (payload.filters.onlineStore) {
    result.filters.onlineStore = payload.filters.onlineStore;
  }

  return result;
}
