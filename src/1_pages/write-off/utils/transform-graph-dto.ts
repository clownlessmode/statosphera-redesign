import { FilterApiPayload } from "@widgets/write-off/sheet/model/filters-store";
import { WriteOffGraphRequest } from "../api/types";

export function transformToGraphDto(
  payload: FilterApiPayload,
): WriteOffGraphRequest {
  // Определяем тип на основе payload или используем переданный
  const type = (payload as any).type || "write_off";

  const result = {
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
        ageGroup: (payload.filters.store.ageGroup || []).map((age) =>
          age.toString(),
        ),
        idLegalEntity: (payload.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        channel: (payload.filters.store.channel || []).map((ch) =>
          ch.toString(),
        ),
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
      writeoff: {
        indicator: payload.filters.writeoff?.indicator || [],
        article: (payload.filters.writeoff?.article || []).map((article) =>
          article.toString(),
        ),
      },
    },
    filterDate: {
      filterDate: {
        dateStart: payload.filterDate.dateStart,
        dateEnd: payload.filterDate.dateEnd,
      },
    },
    role: false,
    group: payload.groups[0] || "month", // Используем группировку из payload (по умолчанию "month")
    value: payload.values[0] || "writeOff", // Используем значение из payload
    type: type, // Используем определенный тип
    household: false,
  };

  return result;
}
