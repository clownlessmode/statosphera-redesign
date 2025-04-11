// features/filters-store/store.ts

import { COLUMN_KEYS } from "@shared/constants/column-keys";
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
}
export enum GROUPINGS {
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
  WENDING = "Вендинг",
  RENT = "Франшиза в аренду",
  INVEST = "Франшиза инвестиционная",
  FRS = "ФРС",
  MICROMARKET = "Микромаркет",
  OTHER = "",
  SERVICES_STORE = "Служебный магазин ООО Волков",
  TRADING_NETWORK = "Отдел торговой сети",
}

export enum FRS_CHANNEL {
  FRS = "ФРС",
  INVEST = "Франшиза инвестиционная",
  RENT = "Франшиза в аренду",
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

export enum OPERATION_WRITE_OFF {
  INDICATOR = "Показатель",
  HOUSEHOLD_GOODS = "Хозяйственные товары",
}

//Статьи списания все
export enum ARTICLE_WRITE_OFF {
  LOSSES = "ПОТЕРИ",
  EMPLOYEE_MEALS = "Питание сотрудников",
  TASTINGS = "Дегустации",
  CUSTOMER_GIFT = "Подарок покупателю (сервисная фишка)",
  THEFTS = "Кражи",
  MARKETING = "МАРКЕТИНГ (блогеры, фотосессии)",
  HOUSEHOLD_GOODS = "Хозяйственные товары",
}
export const ageGroupSchema = z.nativeEnum(AGE_GROUP);
export const frsChannelSchema = z.nativeEnum(FRS_CHANNEL);
export const operationWriteOffSchema = z.nativeEnum(OPERATION_WRITE_OFF);
export const articleWriteOffSchema = z.nativeEnum(ARTICLE_WRITE_OFF);

// выбор подстатьи распределения по списаниям
export const indicatorWriteOff: Record<
  OPERATION_WRITE_OFF,
  ARTICLE_WRITE_OFF[]
> = {
  [OPERATION_WRITE_OFF.INDICATOR]: [
    ARTICLE_WRITE_OFF.LOSSES,
    ARTICLE_WRITE_OFF.EMPLOYEE_MEALS,
    ARTICLE_WRITE_OFF.TASTINGS,
    ARTICLE_WRITE_OFF.CUSTOMER_GIFT,
    ARTICLE_WRITE_OFF.THEFTS,
    ARTICLE_WRITE_OFF.MARKETING,
  ],
  [OPERATION_WRITE_OFF.HOUSEHOLD_GOODS]: [ARTICLE_WRITE_OFF.HOUSEHOLD_GOODS], // Нужно что-то указать, даже если пустой массив
};

//выборка главная группа статей списания
export const operationWriteOff: OPERATION_WRITE_OFF[] = [
  OPERATION_WRITE_OFF.INDICATOR,
  OPERATION_WRITE_OFF.INDICATOR,
];

export enum VALUE_WRITE_OFF {
  WRITEOFF_PERCENT = COLUMN_KEYS.WRITE_OFF_PERCENT,
  WRITEOFF_PERCENT_YOY_PERCENT = COLUMN_KEYS.WRITE_OFF_PERCENT_YOY_PERCENT,
  WRITEOFF_PERCENT_LM = COLUMN_KEYS.WRITE_OFF_PERCENT_LM,
  WRITEOFF_PERCENT_MOM_PERCENT = COLUMN_KEYS.WRITE_OFF_PERCENT_MOM_PERCENT,
  WRITEOFF = COLUMN_KEYS.WRITE_OFF_LY,
  WRITEOFF_LY = COLUMN_KEYS.WRITE_OFF_LY,
  WRITEOFF_YOY = COLUMN_KEYS.WRITE_OFF_YOY,
  WRITEOFF_YOY_PERCENT = COLUMN_KEYS.WRITE_OFF_YOY_PERCENT,
  WRITEOFF_LM = COLUMN_KEYS.WRITE_OFF_LM,
  WRITEOFF_MOM = COLUMN_KEYS.WRITE_OFF_MOM,
  WRITEOFF_MOM_PERCENT = COLUMN_KEYS.WRITE_OFF_MOM_PERCENT,
}

type FiltersState = {
  // Основная структура данных
  filters: {
    store: {
      idStore: number[];
      idCity: number[];
      idRegion: number[];
      idManager: number[];
      storeCondition: string[];
      ageGroup: AGE_GROUP[];
      idLegalEntity: number[];
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
      idGroupMain: string[];
      idProduct: string[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
    check: {
      tabNumber: string[];
      containsBankQr: boolean | null;
      paymentClass: "Безналичный" | "Наличный" | null;
      shift: number[];
      cashBox: number[];
      checkNumber: number[];
      numberfield: number[];
      type: "Продажа" | "Возврат" | null;
    };
    loyal: {
      isLoyal: boolean | null;
      cardNumber: number[];
      sex: "M" | "Ж" | null;
      guidDiscount: number[];
      guidBonus: number[];
      ageStart: number | null;
      ageEnd: number | null;
      groupAge: string[];
    };
    onlineStore: {
      isIm: boolean | null;
      imTypeOrder: Array<"Мобилка" | "Сайт">;
      imDeliveryMethod: Array<"Курьер" | "Самовывоз">;
      imPaymentMethod: Array<"Онлайн" | "Офлайн" | "Картой курьера">;
      imStatusOrder: Array<
        | "Завершен"
        | "Отменен_клиентом"
        | "Отменен"
        | "Сборка"
        | "Собран"
        | "Принят"
        | "Создан"
      >;
      imReceiveInterval: string[];
      imPromo: string[];
    };
    writeoff: {
      indicator: OPERATION_WRITE_OFF[];
      article: ARTICLE_WRITE_OFF[];
    };
  };
  values: string[];
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
    value: FiltersState["filters"]["store"][K]
  ) => void;

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K]
  ) => void;

  updateCheckFilter: <K extends keyof FiltersState["filters"]["check"]>(
    key: K,
    value: FiltersState["filters"]["check"][K]
  ) => void;

  updateLoyalFilter: <K extends keyof FiltersState["filters"]["loyal"]>(
    key: K,
    value: FiltersState["filters"]["loyal"][K]
  ) => void;

  updateOnlineStoreFilter: <
    K extends keyof FiltersState["filters"]["onlineStore"]
  >(
    key: K,
    value: FiltersState["filters"]["onlineStore"][K]
  ) => void;

  updateWriteoffFilter: <K extends keyof FiltersState["filters"]["writeoff"]>(
    key: K,
    value: FiltersState["filters"]["writeoff"][K]
  ) => void;

  updateDateFilter: (dateStart: string, dateEnd: string) => void;
  updateTimeFilter: (timeStart: string, timeEnd: string) => void;
  updateSorts: (sort: "asc" | "desc", colId: string[]) => void;
  updatePagination: (limit: number, offset: number) => void;
  updateGroups: (groups: string[]) => void;
  updateValues: (values: string[]) => void;

  resetAllFilters: () => void;
  getApiPayload: () => Omit<
    FiltersState,
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
    | "updateValues"
    | "resetAllFilters"
    | "getApiPayload"
  >;
};

// Начальное состояние
const initialState: Omit<
  FiltersState,
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
  | "updateValues"
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
      idGroupMain: [],
      idProduct: [],
      seasonalityProducts: [],
      managerAuto: [],
    },
    check: {
      tabNumber: [],
      containsBankQr: null,
      paymentClass: null,
      shift: [],
      cashBox: [],
      checkNumber: [],
      numberfield: [],
      type: null,
    },
    loyal: {
      isLoyal: null,
      cardNumber: [],
      sex: null,
      guidDiscount: [],
      guidBonus: [],
      ageStart: null,
      ageEnd: null,
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
    writeoff: {
      indicator: [],
      article: [],
    },
  },
  values: ["proceeds"],
  filterDate: {
    dateStart: "2024-01-01",
    dateEnd: "2024-01-02",
  },
  filterTime: {
    timeStart: "",
    timeEnd: "",
  },
  sorts: {
    sort: "desc",
    colId: ["proceeds"],
  },
  limit: 100,
  offset: 0,
  groups: ["day"],
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

  updateCheckFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        check: {
          ...state.filters.check,
          [key]: value,
        },
      },
    })),

  updateLoyalFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        loyal: {
          ...state.filters.loyal,
          [key]: value,
        },
      },
    })),

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

  updateWriteoffFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        writeoff: {
          ...state.filters.writeoff,
          [key]: value,
        },
      },
    })),

  updateDateFilter: (dateStart, dateEnd) =>
    set({ filterDate: { dateStart, dateEnd } }),

  updateTimeFilter: (timeStart, timeEnd) =>
    set({ filterTime: { timeStart, timeEnd } }),

  updateSorts: (sort, colId) => set({ sorts: { sort, colId } }),

  updatePagination: (limit, offset) => set({ limit, offset }),

  updateGroups: (groups) => set({ groups }),

  updateValues: (values) => set({ values }),

  resetAllFilters: () => set(initialState),

  getApiPayload: () => {
    const state = get();
    return {
      filters: state.filters,
      values: state.values,
      filterDate: state.filterDate,
      filterTime: state.filterTime,
      sorts: state.sorts,
      limit: state.limit,
      offset: state.offset,
      groups: state.groups,
    };
  },
}));
