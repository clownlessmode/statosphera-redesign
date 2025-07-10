import { FilterApiPayload } from "@widgets/write-off/sheet/model/filters-store";
import { WriteOffGraphRequest } from "../api/types";

// Функция для маппинга группировок в значения, которые принимает сервер
function mapGroupToServerValue(group: string): string {
  const groupToServerMap: Record<string, string> = {
    group: "groupsMain",
    store: "store",
    city: "city",
    region: "region",
    channel: "channel",
    ageGroup: "ageGroup",
    storeCondition: "storeCondition",
    product: "product",
    subGroups: "subGroups",
    subSubGroups: "subSubGroups",
    groupsEconomist: "groupsEconomist",
    groupsFranchise: "groupsFranchise",
    typeProducts: "typeProducts",
    seasonalityProducts: "seasonalityProducts",
    subDivisionProducts: "subDivisionProducts",
    teamProducts: "teamProducts",
    directionProducts: "directionProducts",
    managerAuto: "managerAuto",
    tabNumber: "tabNumber",
    cashBox: "cashBox",
    cardNumber: "cardNumber",
    year: "year",
    quarter: "quarter",
    month: "month",
    week: "week",
    day: "day",
    hour: "hour",
  };

  return groupToServerMap[group] || group;
}

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
      writeoff: {
        indicator: payload.filters.writeoff?.indicator || [],
        article: payload.filters.writeoff?.article || [],
        household: payload.filters.writeoff?.household || null,
      },
    },
    filterDate: {
      filterDate: {
        dateStart: payload.filterDate.dateStart,
        dateEnd: payload.filterDate.dateEnd,
      },
    },
    role: false,
    group: mapGroupToServerValue(payload.groups[0] || "day"), // Используем группировку из payload с маппингом
    value: payload.values[0] || "writeOff", // Используем значение из payload
    type: type, // Используем определенный тип
    household: payload.filters.writeoff?.household === true,
  };

  return result;
}
