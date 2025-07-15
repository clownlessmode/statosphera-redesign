// features/filters-store/store.ts

import { COLUMN_KEY } from "@shared/constants/table-columns";
import { format, startOfMonth, subDays } from "date-fns";
import { z } from "zod";
import { create } from "zustand";
import { useTabStore } from "./url-store";

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
  WRITE_OFF_TYPE = "ops",
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
  WRITE_OFF_TYPE = FULL_GROUPS_SERVER.WRITE_OFF_TYPE,
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
  WRITEOFF_PERCENT = COLUMN_KEY.WRITE_OFF_PERCENT,
  WRITEOFF_PERCENT_YOY_PERCENT = COLUMN_KEY.WRITE_OFF_PERCENT_YOY_PERCENT,
  WRITEOFF_PERCENT_LM = COLUMN_KEY.WRITE_OFF_PERCENT_LM,
  WRITEOFF_PERCENT_MOM_PERCENT = COLUMN_KEY.WRITE_OFF_PERCENT_MOM_PERCENT,
  WRITEOFF = COLUMN_KEY.WRITE_OFF_LY,
  WRITEOFF_LY = COLUMN_KEY.WRITE_OFF_LY,
  WRITEOFF_YOY = COLUMN_KEY.WRITE_OFF_YOY,
  WRITEOFF_YOY_PERCENT = COLUMN_KEY.WRITE_OFF_YOY_PERCENT,
  WRITEOFF_LM = COLUMN_KEY.WRITE_OFF_LM,
  WRITEOFF_MOM = COLUMN_KEY.WRITE_OFF_MOM,
  WRITEOFF_MOM_PERCENT = COLUMN_KEY.WRITE_OFF_MOM_PERCENT,
}

export type FilterApiPayload = ReturnType<FiltersState["getApiPayload"]>;

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
    check: {
      tabNumber: number[];
      containsBankQr: boolean | null;
      paymentClass: "Безналичный" | "Наличный" | null;
      shift: number[];
      cashBox: number[];
      checkNumber: number[];
      numberfield: number[];
      type: ("Продажа" | "Возврат")[];
    };
    loyal: {
      isLoyal: boolean | null;
      cardNumber: string[];
      sex: "M" | "Ж" | null;
      guidDiscount: string[];
      guidBonus: string[];
      ageStart: number | null;
      ageEnd: number | null;
      groupAge: string[];
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
    writeoff: {
      household: boolean | null;
      article: ARTICLE_WRITE_OFF[];
      indicator: OPERATION_WRITE_OFF[];
    };
  };
  uniques: string[];
  indicators: string[];
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
    value: FiltersState["filters"]["store"][K],
  ) => void;

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K],
  ) => void;

  updateCheckFilter: <K extends keyof FiltersState["filters"]["check"]>(
    key: K,
    value: FiltersState["filters"]["check"][K],
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

  updateWriteoffFilter: <K extends keyof FiltersState["filters"]["writeoff"]>(
    key: K,
    value: FiltersState["filters"]["writeoff"][K],
  ) => void;

  updateDateFilter: (dateStart: string, dateEnd: string) => void;
  updateTimeFilter: (timeStart: string, timeEnd: string) => void;
  updateSorts: (sort: "asc" | "desc", colId: string[]) => void;
  updatePagination: (limit: number, offset: number) => void;
  updateGroups: (groups: string[]) => void;
  updateUniques: (uniques: string[]) => void;
  updateIndicators: (indicators: string[]) => void;
  resetAllFilters: () => void;
  getApiPayload: () => Omit<
    FiltersState,
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
};

// Создаем отдельные store'ы для каждого таба
export const useSummaryFiltersStore = create<FiltersState>((set, get) => ({
  // Основная структура данных
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
    check: {
      tabNumber: [],
      containsBankQr: null,
      paymentClass: null,
      shift: [],
      cashBox: [],
      checkNumber: [],
      numberfield: [],
      type: [],
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
      household: null,
      article: [],
      indicator: [],
    },
  },
  uniques: [],
  indicators: [],
  values: [],
  filterDate: {
    dateStart: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateEnd: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  },
  filterTime: {
    timeStart: "00:00",
    timeEnd: "23:59",
  },
  sorts: {
    sort: "desc",
    colId: [],
  },
  limit: 100,
  offset: 0,
  groups: [],

  // Методы обновления состояния
  updateStoreFilter: <K extends keyof FiltersState["filters"]["store"]>(
    key: K,
    value: FiltersState["filters"]["store"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        store: {
          ...state.filters.store,
          [key]: value,
        },
      },
    }));
  },

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        product: {
          ...state.filters.product,
          [key]: value,
        },
      },
    }));
  },

  updateCheckFilter: <K extends keyof FiltersState["filters"]["check"]>(
    key: K,
    value: FiltersState["filters"]["check"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        check: {
          ...state.filters.check,
          [key]: value,
        },
      },
    }));
  },

  updateLoyalFilter: <K extends keyof FiltersState["filters"]["loyal"]>(
    key: K,
    value: FiltersState["filters"]["loyal"][K],
  ) => {
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

  updateOnlineStoreFilter: <
    K extends keyof FiltersState["filters"]["onlineStore"],
  >(
    key: K,
    value: FiltersState["filters"]["onlineStore"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        onlineStore: {
          ...state.filters.onlineStore,
          [key]: value,
        },
      },
    }));
  },

  updateWriteoffFilter: <K extends keyof FiltersState["filters"]["writeoff"]>(
    key: K,
    value: FiltersState["filters"]["writeoff"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        writeoff: {
          ...state.filters.writeoff,
          [key]: value,
        },
      },
    }));
  },

  updateDateFilter: (dateStart: string, dateEnd: string) => {
    set({ filterDate: { dateStart, dateEnd } });
  },

  updateTimeFilter: (timeStart: string, timeEnd: string) => {
    set({ filterTime: { timeStart, timeEnd } });
  },

  updateSorts: (sort: "asc" | "desc", colId: string[]) => {
    set({ sorts: { sort, colId } });
  },

  updatePagination: (limit: number, offset: number) => {
    set({ limit, offset });
  },

  updateGroups: (groups: string[]) => {
    set({ groups });
  },

  updateUniques: (uniques: string[]) => {
    set({ uniques });
  },

  updateIndicators: (indicators: string[]) => {
    set({ indicators });
  },

  resetAllFilters: () => {
    set({
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
        check: {
          tabNumber: [],
          containsBankQr: null,
          paymentClass: null,
          shift: [],
          cashBox: [],
          checkNumber: [],
          numberfield: [],
          type: [],
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
          household: null,
          article: [],
          indicator: [],
        },
      },
      uniques: [],
      indicators: [],
      values: [],
      filterDate: {
        dateStart: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        dateEnd: format(subDays(new Date(), 1), "yyyy-MM-dd"),
      },
      filterTime: {
        timeStart: "00:00",
        timeEnd: "23:59",
      },
      sorts: {
        sort: "desc",
        colId: [],
      },
      limit: 100,
      offset: 0,
      groups: [],
    });
  },

  getApiPayload: () => {
    const state = get();
    return {
      filters: state.filters,
      uniques: state.uniques,
      indicators: state.indicators,
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

// Store для списаний по оборудованию (без фильтров списаний)
export const useEquipmentFiltersStore = create<FiltersState>((set, get) => ({
  // Основная структура данных
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
    check: {
      tabNumber: [],
      containsBankQr: null,
      paymentClass: null,
      shift: [],
      cashBox: [],
      checkNumber: [],
      numberfield: [],
      type: [],
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
      household: null,
      article: [],
      indicator: [],
    },
  },
  uniques: [],
  indicators: [],
  values: [],
  filterDate: {
    dateStart: format(startOfMonth(new Date()), "yyyy-MM-dd"),
    dateEnd: format(subDays(new Date(), 1), "yyyy-MM-dd"),
  },
  filterTime: {
    timeStart: "00:00",
    timeEnd: "23:59",
  },
  sorts: {
    sort: "desc",
    colId: ["writeOff"],
  },
  limit: 100,
  offset: 0,
  groups: [],

  // Методы обновления состояния (аналогичные, но для оборудования)
  updateStoreFilter: <K extends keyof FiltersState["filters"]["store"]>(
    key: K,
    value: FiltersState["filters"]["store"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        store: {
          ...state.filters.store,
          [key]: value,
        },
      },
    }));
  },

  updateProductFilter: <K extends keyof FiltersState["filters"]["product"]>(
    key: K,
    value: FiltersState["filters"]["product"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        product: {
          ...state.filters.product,
          [key]: value,
        },
      },
    }));
  },

  updateCheckFilter: <K extends keyof FiltersState["filters"]["check"]>(
    key: K,
    value: FiltersState["filters"]["check"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        check: {
          ...state.filters.check,
          [key]: value,
        },
      },
    }));
  },

  updateLoyalFilter: <K extends keyof FiltersState["filters"]["loyal"]>(
    key: K,
    value: FiltersState["filters"]["loyal"][K],
  ) => {
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

  updateOnlineStoreFilter: <
    K extends keyof FiltersState["filters"]["onlineStore"],
  >(
    key: K,
    value: FiltersState["filters"]["onlineStore"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        onlineStore: {
          ...state.filters.onlineStore,
          [key]: value,
        },
      },
    }));
  },

  updateWriteoffFilter: <K extends keyof FiltersState["filters"]["writeoff"]>(
    key: K,
    value: FiltersState["filters"]["writeoff"][K],
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        writeoff: {
          ...state.filters.writeoff,
          [key]: value,
        },
      },
    }));
  },

  updateDateFilter: (dateStart: string, dateEnd: string) => {
    set({ filterDate: { dateStart, dateEnd } });
  },

  updateTimeFilter: (timeStart: string, timeEnd: string) => {
    set({ filterTime: { timeStart, timeEnd } });
  },

  updateSorts: (sort: "asc" | "desc", colId: string[]) => {
    set({ sorts: { sort, colId } });
  },

  updatePagination: (limit: number, offset: number) => {
    set({ limit, offset });
  },

  updateGroups: (groups: string[]) => {
    set({ groups });
  },

  updateUniques: (uniques: string[]) => {
    set({ uniques });
  },

  updateIndicators: (indicators: string[]) => {
    set({ indicators });
  },

  resetAllFilters: () => {
    set({
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
        check: {
          tabNumber: [],
          containsBankQr: null,
          paymentClass: null,
          shift: [],
          cashBox: [],
          checkNumber: [],
          numberfield: [],
          type: [],
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
          household: null,
          article: [],
          indicator: [],
        },
      },
      uniques: [],
      indicators: [],
      values: [],
      filterDate: {
        dateStart: format(startOfMonth(new Date()), "yyyy-MM-dd"),
        dateEnd: format(subDays(new Date(), 1), "yyyy-MM-dd"),
      },
      filterTime: {
        timeStart: "00:00",
        timeEnd: "23:59",
      },
      sorts: {
        sort: "desc",
        colId: ["writeOff"],
      },
      limit: 100,
      offset: 0,
      groups: [],
    });
  },

  getApiPayload: () => {
    const state = get();
    return {
      filters: state.filters,
      uniques: state.uniques,
      indicators: state.indicators,
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

// Хук для получения правильного store в зависимости от таба
export const useFiltersStore = () => {
  const { tab } = useTabStore();

  if (tab === "write-off-equip") {
    return useEquipmentFiltersStore();
  } else {
    return useSummaryFiltersStore();
  }
};
