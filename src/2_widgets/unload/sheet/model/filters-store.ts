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

export function processFiltersUnload(dto: any): any {
  const flattenStringArrays = (arr: string[]): number[] => {
    return arr.flatMap((str) => {
      try {
        const parsed = JSON.parse(str);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    });
  };

  const processFilters = (filters: any): any => {
    const processed = { ...filters };

    // Обрабатываем все вложенные объекты
    Object.keys(processed).forEach((category) => {
      if (processed[category] && typeof processed[category] === "object") {
        Object.keys(processed[category]).forEach((field) => {
          const value = processed[category][field];
          if (
            Array.isArray(value) &&
            value.length > 0 &&
            typeof value[0] === "string" &&
            value[0].startsWith("[")
          ) {
            processed[category][field] = flattenStringArrays(value);
          }
        });
      }
    });

    return processed;
  };

  return {
    ...dto,
    filters: processFilters(dto.filters),
  };
}

export const ageGroupSchema = z.nativeEnum(AGE_GROUP);
export const frsChannelSchema = z.nativeEnum(FRS_CHANNEL);
export interface PreparedFilterBlock {
  RFM?: { rfmList: number[]; period: string | null };
  filterDate: { dateStart: string; dateEnd: string };
  filterTime: { timeStart: string; timeEnd: string };
  store: FiltersState["filters"]["store"];
  product: FiltersState["filters"]["product"];
  onlineStore: FiltersState["filters"]["onlineStore"];
  client: {
    sex: string[];
    guidDiscount: string[];
    guidBonus: string[];
    ageStart: number | null;
    ageEnd: number | null;
    ageAccount: FiltersState["filters"]["clients"]["ageAccount"];
    colorsDiscount: string[];
    countBonus: FiltersState["filters"]["clients"]["countBonus"];
    bonusWriteoff: FiltersState["filters"]["clients"]["bonusWriteoff"];
    bonusAccrual: FiltersState["filters"]["clients"]["bonusAccrual"];
    totalPurchase: FiltersState["filters"]["clients"]["totalPurchase"];
    avg: FiltersState["filters"]["clients"]["avg"];
    frequency: FiltersState["filters"]["clients"]["frequency"];
    avgCheckLen: FiltersState["filters"]["clients"]["avgCheckLen"];
    proceedPerCheck: FiltersState["filters"]["clients"]["proceedPerCheck"];
  };
  audienceId: number[];
}
export interface PreparedFiltersState {
  include: Partial<PreparedFilterBlock>[];
  exclude: Partial<PreparedFilterBlock>[];
  count: number;
}
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
    clients: {
      sex: string[];
      guidDiscount: string[];
      guidBonus: string[];
      frequency: {
        from: number | null;
        to: number | null;
      };
      totalPurchase: {
        from: number | null;
        to: number | null;
      };
      proceedPerCheck: {
        from: number | null;
        to: number | null;
      };
      avgCheckLen: {
        from: number | null;
        to: number | null;
      };
      avg: {
        from: number | null;
        to: number | null;
      };
      countBonus: {
        from: number | null;
        to: number | null;
      };
      bonusWriteoff: {
        from: number | null;
        to: number | null;
      };
      bonusAccrual: {
        from: number | null;
        to: number | null;
      };
      ageAccount: {
        from: {
          years: number | null;
          months: number | null;
          days: number | null;
        };
        to: {
          years: number | null;
          months: number | null;
          days: number | null;
        };
      };
      ageStart: number | null;
      ageEnd: number | null;
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
  mainData: {
    dateStart: string;
    dateEnd: string;
    timeStart: string;
    timeEnd: string;
    rfmList: number[];
    period: string | null;
    audienceId: number[];
  };

  // Методы обновления состояния
  updateStoreFilter: <K extends keyof FiltersState["filters"]["store"]>(
    key: K,
    value: FiltersState["filters"]["store"][K],
  ) => void;

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K],
  ) => void;

  updateClientsFilter: <K extends keyof FiltersState["filters"]["clients"]>(
    key: K,
    value: FiltersState["filters"]["clients"][K],
  ) => void;

  updateOnlineStoreFilter: <
    K extends keyof FiltersState["filters"]["onlineStore"],
  >(
    key: K,
    value: FiltersState["filters"]["onlineStore"][K],
  ) => void;

  updateMainDataFilter: <K extends keyof FiltersState["mainData"]>(
    key: K,
    value: FiltersState["mainData"][K],
  ) => void;
  resetAllFilters: () => void;
  getApiPayload: () => Omit<
    FiltersState,
    | "updateStoreFilter"
    | "updateProductFilter"
    | "updateClientsFilter"
    | "updateOnlineStoreFilter"
    | "updateMainDataFilter"
    | "resetAllFilters"
    | "getApiPayload"
    | "preparedFilter"
    | "getPreparedFilterPayload"
    | "updatePreparedFilter"
    | "removePreparedFilter"
    | "resetPreparedFilter"
    | "getPreparedFilter"
  >;

  getPreparedFilterPayload: () => {
    RFM?: {
      rfmList: number[];
      period: string | null;
    };
    filterDate: { dateStart: string; dateEnd: string };
    filterTime: { timeStart: string; timeEnd: string };
    store: FiltersState["filters"]["store"];
    product: FiltersState["filters"]["product"];
    onlineStore: FiltersState["filters"]["onlineStore"];
    client: {
      sex: string[];
      guidDiscount: string[];
      guidBonus: string[];
      ageStart: number | null;
      ageEnd: number | null;
      ageAccount: FiltersState["filters"]["clients"]["ageAccount"];
      colorsDiscount: string[];
      countBonus: FiltersState["filters"]["clients"]["countBonus"];
      bonusWriteoff: FiltersState["filters"]["clients"]["bonusWriteoff"];
      bonusAccrual: FiltersState["filters"]["clients"]["bonusAccrual"];
      totalPurchase: FiltersState["filters"]["clients"]["totalPurchase"];
      avg: FiltersState["filters"]["clients"]["avg"];
      frequency: FiltersState["filters"]["clients"]["frequency"];
      avgCheckLen: FiltersState["filters"]["clients"]["avgCheckLen"];
      proceedPerCheck: FiltersState["filters"]["clients"]["proceedPerCheck"];
    };
    audienceId: number[];
  };

  getPreparedFilter: () => {
    include: Partial<PreparedFilterBlock>[];
    exclude: Partial<PreparedFilterBlock>[];
    count: number;
  };

  updatePreparedFilter: (
    side: "include" | "exclude",
    partial: Partial<PreparedFilterBlock>,
  ) => void;

  removePreparedFilter: (side: "include" | "exclude", index: number) => void;

  resetPreparedFilter: () => void;
};

// Начальное состояние
const initialPreparedState: PreparedFiltersState = {
  include: [],
  exclude: [],
  count: 0,
};

const initialState: Omit<
  FiltersState,
  | "updateStoreFilter"
  | "updateProductFilter"
  | "updateClientsFilter"
  | "updateOnlineStoreFilter"
  | "updateMainDataFilter"
  | "resetAllFilters"
  | "getApiPayload"
  | "getPreparedFilterPayload"
  | "updatePreparedFilter"
  | "removePreparedFilter"
  | "resetPreparedFilter"
  | "getPreparedFilter"
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
    clients: {
      sex: [],
      frequency: {
        from: null,
        to: null,
      },
      totalPurchase: {
        from: null,
        to: null,
      },
      proceedPerCheck: {
        from: null,
        to: null,
      },
      avgCheckLen: {
        from: null,
        to: null,
      },
      avg: {
        from: null,
        to: null,
      },
      countBonus: {
        from: null,
        to: null,
      },
      bonusWriteoff: {
        from: null,
        to: null,
      },
      bonusAccrual: {
        from: null,
        to: null,
      },
      ageAccount: {
        from: { years: null, months: null, days: null },
        to: { years: null, months: null, days: null },
      },
      guidDiscount: [],
      guidBonus: [],
      ageStart: null,
      ageEnd: null,
      colorsDiscount: [],
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
  mainData: {
    dateStart,
    dateEnd,
    timeStart: "",
    timeEnd: "",
    rfmList: [],
    period: "",
    audienceId: [],
  },
};

export const useUnloadFilterStore = create<FiltersState & PreparedFiltersState>(
  (set, get) => ({
    ...initialState,
    ...initialPreparedState,
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

    updateClientsFilter: (key, value) => {
      set((state) => ({
        filters: {
          ...state.filters,
          clients: {
            ...state.filters.clients,
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

    updateMainDataFilter: <K extends keyof FiltersState["mainData"]>(
      key: K,
      value: FiltersState["mainData"][K],
    ) =>
      set((state) => ({
        mainData: {
          ...state.mainData,
          [key]: value,
        },
      })),

    resetAllFilters: () => set(initialState),

    getApiPayload: () => {
      const state = get();
      return {
        filters: state.filters,
        mainData: state.mainData,
      };
    },

    getPreparedFilterPayload: () => {
      const filters = get();
      const processedFilters = processFiltersUnload({
        filters: filters.filters,
        mainData: filters.mainData,
      });

      const rfmPart = processedFilters.mainData.period
        ? {
            RFM: {
              rfmList: processedFilters.mainData.rfmList ?? [],
              period: processedFilters.mainData.period,
            },
          }
        : {};
      return {
        ...rfmPart,
        filterDate: {
          dateStart: processedFilters.mainData.dateStart,
          dateEnd: processedFilters.mainData.dateEnd,
        },
        filterTime: {
          timeStart: processedFilters.mainData.timeStart,
          timeEnd: processedFilters.mainData.timeEnd,
        },
        store: {
          ...processedFilters.filters.store,
        },
        product: {
          ...processedFilters.filters.product,
        },
        onlineStore: {
          ...processedFilters.filters.onlineStore,
        },
        client: {
          sex: processedFilters.filters.clients.sex ?? [],
          guidDiscount: processedFilters.filters.clients.guidDiscount ?? [],
          guidBonus: processedFilters.filters.clients.guidBonus ?? [],
          ageStart: processedFilters.filters.clients.ageStart ?? null,
          ageEnd: processedFilters.filters.clients.ageEnd ?? null,
          ageAccount: processedFilters.filters.clients.ageAccount,
          colorsDiscount: processedFilters.filters.clients.colorsDiscount ?? [],
          countBonus: processedFilters.filters.clients.countBonus,
          bonusWriteoff: processedFilters.filters.clients.bonusWriteoff,
          bonusAccrual: processedFilters.filters.clients.bonusAccrual,
          totalPurchase: processedFilters.filters.clients.totalPurchase,
          avg: processedFilters.filters.clients.avg,
          frequency: processedFilters.filters.clients.frequency,
          avgCheckLen: processedFilters.filters.clients.avgCheckLen,
          proceedPerCheck: processedFilters.filters.clients.proceedPerCheck,
        },
        audienceId: processedFilters.mainData.audienceId,
      };
    },
    updatePreparedFilter: (side, partial) =>
      set((state) => ({
        ...state,
        [side]: Array.isArray(partial)
          ? [...state[side], ...partial]
          : [...state[side], partial],
      })),
    getPreparedFilter: () => {
      const { include, exclude, count } = get();
      return { include, exclude, count };
    },

    removePreparedFilter: (side, index) =>
      set((state) => ({
        ...state,
        [side]: state[side].filter((_, i) => i !== index),
      })),

    resetPreparedFilter: () => set(initialPreparedState),
  }),
);
