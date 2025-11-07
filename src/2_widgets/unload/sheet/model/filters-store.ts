// features/filters-store/store.ts
import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";
import { z } from "zod";
import { create } from "zustand";
export enum FULL_GROUPS_SERVER {
  MONTH = "month",
  YEAR = "year",
  DAY = "day",
  QUARTER = "quarter",
  WEEK = "week",
  HOUR = "hour",
  STORE = "store",
  CITY = "city",
  REGION = "region",
  CHANNEL = "channel",
  AGE_GROUP = "ageGroup",
  STORE_CONDITION = "storeCondition",
  GROUP = "group",
  PRODUCT = "product",
  SUBGROUPS = "subGroups",
  SUBSUBGROUPS = "subSubGroups",
  GROUP_ECONOMIST = "groupsEconomist",
  TYPE_PRODUCT = "typeProducts",
  CARD_NUMBER = "cardNumber",
  TAB_NUMBER = "tabNumber",
  ID_CHECK = "idCheck",
  IM_TYPE_ORDER = "imTypeOrder",
  IM_DELIVERY_METHOD = "imDeliveryMethod",
  IM_PAYMENT_METHOD = "imPaymentMethod",
  IM_STATUS_ORDER = "imStatusOrder",
  IM_PROMO = "imPromo",
  IM_RECEIVE_INTERVAL = "imReceiveInterval",
  ID_STORE = "id_store",
  ID_GROUP = "group_id",
  ID_PRODUCT = "id_product",
  ID_CITY = "id_city",
  GROUP_FRANCHISE = "groupsFranchise",
  MANAGER_AUTO = "managerAuto",
  DIRECTION_PRODUCT = "directionProducts",
  TEAM_PRODUCT = "teamProducts",
  SUBDIVISION_PRODUCT = "subDivisionProducts",
  SEASONALITY_PRODUCT = "seasonalityProducts",
  ID_REGION = "id_region",
  ID_SUBGROUPS = "idSubGroups",
  ID_SUBSUBGROUPS = "idSubSubGroups",
  ID_GROUP_ECONOMIST = "idGroupsEconomist",
  ID_TYPE_PRODUCT = "idTypeProducts",
  ID_SEASONALITY_PRODUCT = "idSeasonalityProducts",
  ID_SUBDIVISION_PRODUCT = "idSubdivisionProducts",
  ID_TEAM_PRODUCT = "idTeamProducts",
  ID_DIRECTION_PRODUCT = "idDirectionProducts",
  ID_MANAGER_AUTO = "idManagerAuto",
  ID_GROUP_FRANCHISE = "idGroupsFranchise",
  NUMBER_FIELD = "numberfield",
  IM_SEX_LOYAL = "sexLoyal",
  IS_IM = "isIm",
  LOYAL_AGE = "loyalAge",
  CASH_BOX = "cashBox",
  TYPE = "type",
  ID_DISCOUNT = "idDiscount",
  DISCOUNT_TYPE = "discountType",
}

export enum GROUPINGS {
  DISCOUNT_TYPE = FULL_GROUPS_SERVER.DISCOUNT_TYPE,
  DISCOUNT = FULL_GROUPS_SERVER.ID_DISCOUNT,
  TYPE = FULL_GROUPS_SERVER.TYPE,
  MONTH = FULL_GROUPS_SERVER.MONTH,
  DAY = FULL_GROUPS_SERVER.DAY,
  QUARTER = FULL_GROUPS_SERVER.QUARTER,
  WEEK = FULL_GROUPS_SERVER.WEEK,
  YEAR = FULL_GROUPS_SERVER.YEAR,
  HOUR = FULL_GROUPS_SERVER.HOUR,
  STORE = FULL_GROUPS_SERVER.STORE,
  CITY = FULL_GROUPS_SERVER.CITY,
  REGION = FULL_GROUPS_SERVER.REGION,
  CHANNEL = FULL_GROUPS_SERVER.CHANNEL,
  AGE_GROUP = FULL_GROUPS_SERVER.AGE_GROUP,
  STORE_CONDITION = FULL_GROUPS_SERVER.STORE_CONDITION,
  GROUP = FULL_GROUPS_SERVER.GROUP,
  PRODUCT = FULL_GROUPS_SERVER.PRODUCT,
  SUBGROUPS = FULL_GROUPS_SERVER.SUBGROUPS,
  SUBSUBGROUPS = FULL_GROUPS_SERVER.SUBSUBGROUPS,
  GROUP_ECONOMIST = FULL_GROUPS_SERVER.GROUP_ECONOMIST,
  TYPE_PRODUCT = FULL_GROUPS_SERVER.TYPE_PRODUCT,
  CARD_NUMBER = FULL_GROUPS_SERVER.CARD_NUMBER,
  TAB_NUMBER = FULL_GROUPS_SERVER.TAB_NUMBER,
  ID_CHECK = FULL_GROUPS_SERVER.ID_CHECK,
  GROUP_FRANCHISE = FULL_GROUPS_SERVER.GROUP_FRANCHISE,
  MANAGER_AUTO = FULL_GROUPS_SERVER.MANAGER_AUTO,
  DIRECTION_PRODUCT = FULL_GROUPS_SERVER.DIRECTION_PRODUCT,
  TEAM_PRODUCT = FULL_GROUPS_SERVER.TEAM_PRODUCT,
  SUBDIVISION_PRODUCT = FULL_GROUPS_SERVER.SUBDIVISION_PRODUCT,
  SEASONALITY_PRODUCT = FULL_GROUPS_SERVER.SEASONALITY_PRODUCT,
  IM_SEX_LOYAL = FULL_GROUPS_SERVER.IM_SEX_LOYAL,
  LOYAL_AGE = FULL_GROUPS_SERVER.LOYAL_AGE,
  CASH_BOX = FULL_GROUPS_SERVER.CASH_BOX,
  IM_TYPE_ORDER = FULL_GROUPS_SERVER.IM_TYPE_ORDER,
  IM_DELIVERY_METHOD = FULL_GROUPS_SERVER.IM_DELIVERY_METHOD,
  IM_PAYMENT_METHOD = FULL_GROUPS_SERVER.IM_PAYMENT_METHOD,
  IM_STATUS_ORDER = FULL_GROUPS_SERVER.IM_STATUS_ORDER,
  IM_PROMO = FULL_GROUPS_SERVER.IM_PROMO,
  IM_RECEIVE_INTERVAL = FULL_GROUPS_SERVER.IM_RECEIVE_INTERVAL,
}

export enum GROUP_COLUMN_CHECK_GRAPH {
  DAY = FULL_GROUPS_SERVER.DAY,
  QUARTER = FULL_GROUPS_SERVER.QUARTER,
  WEEK = FULL_GROUPS_SERVER.WEEK,
  HOUR = FULL_GROUPS_SERVER.HOUR,
  YEAR = FULL_GROUPS_SERVER.YEAR,
}
export enum CHANNEL {
  FRS = "ФРС",
  INVEST = "Франшиза инвестиционная",
  RENT = "Франшиза в аренду",
  FOODTRUCK = "Фудтрак",
  MICROMARKET = "Микромаркет",
  WENDING = "Вендинг",
  SERVICES_STORE = "Служебный магазин ООО Волков",
  TRADING_NETWORK = "Отдел торговой сети",
}

export enum FRS_CHANNEL {
  FRS = "ФРС",
  INVEST = "Франшиза инвестиционная",
  RENT = "Франшиза в аренду",
  FOODTRUCK = "Фудтрак",
  MICROMARKET = "Микромаркет",
  WENDING = "Вендинг",
  SERVICES_STORE = "Служебный магазин ООО Волков",
  TRADING_NETWORK = "Отдел торговой сети",
}
export enum STORE_CONDITIONS {
  OPEN = "Действующие",
  CLOSED = "ЗАКРЫТЫЕ",
}

export enum AGE_GROUP {
  NOT_CALCULATED = "Не рассчитан",
  ADULT = "Взрослый",
  TEENAGER = "Подросток",
  TODDLER = "Малыш",
}

export const ageGroupSchema = z.nativeEnum(AGE_GROUP);
export const frsChannelSchema = z.nativeEnum(FRS_CHANNEL);

export type FilterApiPayload = ReturnType<FiltersState["getApiPayload"]>;
const today = new Date();

let dateStart: string;
let dateEnd: string;

if (today.getDate() === 1) {
  // Сегодня — первое число месяца → берём весь предыдущий месяц
  const lastMonth = subMonths(today, 1);
  dateStart = format(startOfMonth(lastMonth), "yyyy-MM-dd");
  dateEnd = format(endOfMonth(lastMonth), "yyyy-MM-dd");
} else {
  // Иначе → с начала месяца до вчерашнего дня
  dateStart = format(startOfMonth(today), "yyyy-MM-dd");
  dateEnd = format(subDays(today, 1), "yyyy-MM-dd");
}
export type FiltersState = {
  // Основная структура данных
  filters: {
    store: {
      idStore: string[];
      idCity: string[];
      idRegion: string[];
      idManager: string[];
      storeCondition: string[];
      ageGroup: AGE_GROUP[];
      idLegalEntity: string[];
      channel: FRS_CHANNEL[];
      district: string[];
    };
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
      groupsMain: string[];
      idGroupMain: string[];
      idProduct: string[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
    loyal: {
      sex: "M" | "Ж" | null;
      guidDiscount: string[];
      guidBonus: string[];
      ageStart: number | null;
      ageEnd: number | null;
      groupAge: string[];
      colorsDiscount: string[];
    };
    onlineStore: {
      isIm: boolean | null;
      imTypeOrder: string[];
      imDeliveryMethod: string[];
      imPaymentMethod: string[];
      imStatusOrder: string[];
      imReceiveInterval: string[];
      imPromo: string[];
    };
  };
  values: string[];
  mainData: {
    dateStart: string;
    dateEnd: string;
    rfmList: (number | undefined)[];
  };
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  filterTime: {
    timeStart: string;
    timeEnd: string;
  };
  sorts: {
    sort: "asc" | "desc";
    colId: string[];
  };
  limit: number;
  offset: number;
  groups: string[];

  // Методы обновления состояния
  updateStoreFilter: <K extends keyof FiltersState["filters"]["store"]>(
    key: K,
    value: FiltersState["filters"]["store"][K],
  ) => void;

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K],
  ) => void;

  updateLoyalFilter: <K extends keyof FiltersState["filters"]["loyal"]>(
    key: K,
    value: FiltersState["filters"]["loyal"][K],
  ) => void;

  updateOnlineStoreFilter: <
    K extends keyof FiltersState["filters"]["onlineStore"],
  >(
    key: K,
    value: FiltersState["filters"]["onlineStore"][K],
  ) => void;

  updateDateFilter: (dateStart: string, dateEnd: string) => void;
  updateMainDataFilter: (
    dateStart: string,
    dateEnd: string,
    rfmList: (number | undefined)[],
  ) => void;
  updateTimeFilter: (timeStart: string, timeEnd: string) => void;
  updateSorts: (sort: "asc" | "desc", colId: string[]) => void;
  updateGroups: (groups: string[]) => void;
  resetAllFilters: () => void;
  getApiPayload: () => Omit<
    FiltersState,
    | "uniques"
    | "updateStoreFilter"
    | "updateProductFilter"
    | "updateLoyalFilter"
    | "updateOnlineStoreFilter"
    | "updateMainDataFilter"
    | "updateDateFilter"
    | "updateTimeFilter"
    | "updateSorts"
    | "updateGroups"
    | "resetAllFilters"
    | "getApiPayload"
  >;
};

// Начальное состояние
const initialState: Omit<
  FiltersState,
  | "updateStoreFilter"
  | "updateProductFilter"
  | "updateLoyalFilter"
  | "updateOnlineStoreFilter"
  | "updateMainDataFilter"
  | "updateDateFilter"
  | "updateTimeFilter"
  | "updateSorts"
  | "updateGroups"
  | "resetAllFilters"
  | "getApiPayload"
> = {
  filters: {
    store: {
      idStore: [],
      idCity: [],
      idRegion: [],
      idManager: [],
      storeCondition: [],
      ageGroup: [],
      idLegalEntity: [],
      channel: [],
      district: [],
    },
    product: {
      groupFranchise: [],
      ppProducts: null,
      subDivisionProducts: [],
      subGroups: [],
      subSubGroups: [],
      typeProducts: [],
      teamProducts: [],
      directionProducts: [],
      groupsEconomist: [],
      groupsMain: [],
      idGroupMain: [],
      idProduct: [],
      seasonalityProducts: [],
      managerAuto: [],
    },
    loyal: {
      sex: null,
      guidDiscount: [],
      guidBonus: [],
      ageStart: null,
      ageEnd: null,
      colorsDiscount: [],
      groupAge: [],
    },
    onlineStore: {
      isIm: null,
      imTypeOrder: [],
      imDeliveryMethod: [],
      imPaymentMethod: [],
      imStatusOrder: [],
      imReceiveInterval: [],
      imPromo: [],
    },
  },
  values: ["proceeds"],
  mainData: {
    dateStart,
    dateEnd,
    rfmList: [],
  },
  filterDate: {
    dateStart,
    dateEnd,
  },
  filterTime: {
    timeStart: "",
    timeEnd: "",
  },
  sorts: {
    sort: "desc",
    colId: [],
  },
  limit: 100,
  offset: 0,
  groups: [],
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  ...initialState,
  updateStoreFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        store: {
          ...state.filters.store,
          [key]: value,
        },
      },
    })),

  updateProductFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        product: {
          ...state.filters.product,
          [key]: value,
        },
      },
    })),

  updateLoyalFilter: (key, value) => {
    set((state) => ({
      filters: {
        ...state.filters,
        loyal: {
          ...state.filters.loyal,
          [key]: value,
        },
      },
    }));
  },

  updateOnlineStoreFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        onlineStore: {
          ...state.filters.onlineStore,
          [key]: value,
        },
      },
    })),

  updateDateFilter: (dateStart, dateEnd) =>
    set({ filterDate: { dateStart, dateEnd } }),

  updateMainDataFilter: (dateStart, dateEnd, rfmList) =>
    set({ mainData: { dateStart, dateEnd, rfmList } }),

  updateTimeFilter: (timeStart, timeEnd) =>
    set({ filterTime: { timeStart, timeEnd } }),

  updateSorts: (sort, colId) => set({ sorts: { sort, colId } }),

  updateGroups: (groups) => set({ groups }),

  resetAllFilters: () => set(initialState),

  getApiPayload: () => {
    const state = get();
    return {
      filters: state.filters,
      values: state.values,
      mainData: state.mainData,
      filterDate: state.filterDate,
      filterTime: state.filterTime,
      sorts: state.sorts,
      limit: state.limit,
      offset: state.offset,
      groups: state.groups,
    };
  },
}));
