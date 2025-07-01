import { WriteOffReasonsRequest } from "../api/types";
import { FiltersState } from "@widgets/write-off/sheet/model/filters-store";

export const transformToReasonsDto = (
  filters: FiltersState,
): WriteOffReasonsRequest => {
  return {
    filters: {
      store: {
        idStore: filters.filters.store.idStore
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        idCity: filters.filters.store.idCity
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        idRegion: filters.filters.store.idRegion
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        idManager: filters.filters.store.idManager
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        storeCondition: filters.filters.store.storeCondition,
        ageGroup: filters.filters.store.ageGroup.map((age) => age.toString()),
        idLegalEntity: filters.filters.store.idLegalEntity
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        channel: filters.filters.store.channel.map((ch) => ch.toString()),
        district: filters.filters.store.district,
      },
      product: {
        groupFranchise: filters.filters.product.groupFranchise,
        ppProducts: filters.filters.product.ppProducts,
        isImProducts: null, // Не используется в текущей структуре
        subDivisionProducts: filters.filters.product.subDivisionProducts,
        subGroups: filters.filters.product.subGroups,
        subSubGroups: filters.filters.product.subSubGroups,
        typeProducts: filters.filters.product.typeProducts,
        teamProducts: filters.filters.product.teamProducts,
        directionProducts: filters.filters.product.directionProducts,
        groupsEconomist: filters.filters.product.groupsEconomist,
        idGroupMain: filters.filters.product.idGroupMain
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        idProduct: filters.filters.product.idProduct
          .map((id) =>
            typeof id === "string"
              ? parseInt(id.replace(/[[\]]/g, ""))
              : parseInt(String(id)),
          )
          .filter((id) => !isNaN(id)),
        seasonalityProducts: filters.filters.product.seasonalityProducts,
        managerAuto: filters.filters.product.managerAuto,
      },
    },
    filterDate: {
      filterDate: {
        dateStart: filters.filterDate.dateStart,
        dateEnd: filters.filterDate.dateEnd,
      },
    },
    role: false,
    storeId: [null],
    household: filters.filters.writeoff.household === true,
  };
};
