import { WriteOffReasonsRequest } from "../api/types";
import { FiltersState } from "@widgets/write-off/sheet/model/filters-store";

export const transformToReasonsDto = (
  filters: FiltersState,
): WriteOffReasonsRequest => {
  return {
    filters: {
      store: {
        idStore: (filters.filters.store.idStore || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idCity: (filters.filters.store.idCity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idRegion: (filters.filters.store.idRegion || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idManager: (filters.filters.store.idManager || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        storeCondition: filters.filters.store.storeCondition || [],
        ageGroup: (filters.filters.store.ageGroup || []).map((age) =>
          age.toString(),
        ),
        idLegalEntity: (filters.filters.store.idLegalEntity || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        channel: (filters.filters.store.channel || []).map((ch) =>
          ch.toString(),
        ),
        district: filters.filters.store.district || [],
      },
      product: {
        groupFranchise: filters.filters.product.groupFranchise || [],
        ppProducts: filters.filters.product.ppProducts || null,
        isImProducts: null, // Не используется в текущей структуре
        subDivisionProducts: filters.filters.product.subDivisionProducts || [],
        subGroups: filters.filters.product.subGroups || [],
        subSubGroups: filters.filters.product.subSubGroups || [],
        typeProducts: filters.filters.product.typeProducts || [],
        teamProducts: filters.filters.product.teamProducts || [],
        directionProducts: filters.filters.product.directionProducts || [],
        groupsEconomist: filters.filters.product.groupsEconomist || [],
        idGroupMain: (filters.filters.product.idGroupMain || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        idProduct: (filters.filters.product.idProduct || [])
          .map((id) => parseInt(id.toString().replace(/[[\]]/g, "")))
          .filter((id) => !isNaN(id))
          .map((id) => id.toString()),
        seasonalityProducts: filters.filters.product.seasonalityProducts || [],
        managerAuto: filters.filters.product.managerAuto || [],
      },
      writeoff: {
        indicator: filters.filters.writeoff?.indicator || [],
        article: (filters.filters.writeoff?.article || []).map((article) =>
          article.toString(),
        ),
      },
    },
    filterDate: {
      filterDate: {
        dateStart: filters.filterDate.dateStart,
        dateEnd: filters.filterDate.dateEnd,
      },
    },
    role: false,
    household: false,
  };
};
