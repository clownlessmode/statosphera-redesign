import { WriteOffReasonsRequest } from "../api/types";
import { FiltersState } from "@widgets/write-off/sheet/model/filters-store";

export const transformToReasonsDto = (
  filters: FiltersState,
): WriteOffReasonsRequest => {
  const result = {
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
        subGroups: filters.filters.product.subGroups
          .flatMap((id) => {
            const idStr = typeof id === "string" ? id : String(id);
            return idStr
              .replace(/[[\]]/g, "")
              .split(",")
              .map((singleId) => parseInt(singleId.trim()))
              .filter((singleId) => !isNaN(singleId));
          })
          .map((id) => id.toString()),
        subSubGroups: filters.filters.product.subSubGroups
          .flatMap((id) => {
            const idStr = typeof id === "string" ? id : String(id);
            return idStr
              .replace(/[[\]]/g, "")
              .split(",")
              .map((singleId) => parseInt(singleId.trim()))
              .filter((singleId) => !isNaN(singleId));
          })
          .map((id) => id.toString()),
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
      writeoff: {
        indicator: filters.filters.writeoff.indicator || [],
        article: filters.filters.writeoff.article || [],
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

  return result;
};
