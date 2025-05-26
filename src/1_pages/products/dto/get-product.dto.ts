
export type FilterApiPayload = ReturnType<getProductDto["getApiPayload"]>;
export type getProductDto = {
    product: {
        groupFranchise: string[];
        ppProducts: boolean | null;
        subDivisionProducts: string[];
        subGroups: string[];
        subSubGroups: string[];
        typeProducts: string[];
        teamProducts: string[];
        directionProducts: string[];
        groupsEconomist: string[];
        idGroupMain: string[];
        idProduct: string[];
        seasonalityProducts: string[];
        managerAuto: string[];
      };

      getApiPayload: () => Omit<
getProductDto,
| "uniques"
| "indicators"
| "updateStoreFilter"
| "updateProductFilter"
| "updateCheckFilter"
| "updateLoyalFilter"
| "updateOnlineStoreFilter"
| "updateWriteoffFilter"
| "updateDateFilter"
| "updateTimeFilter"
| "updateSorts"
| "updatePagination"
| "updateGroups"
| "updateUniques"
| "updateIndicators"
| "resetAllFilters"
| "getApiPayload"
>;
}


