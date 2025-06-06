// features/sales-dynamics/filters-store.ts

import { create } from "zustand";
import { format, startOfMonth, endOfMonth, subDays, subMonths } from "date-fns";
import { z } from "zod";

//
// 1) Типы
//
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
// структура payload-а
interface DateFilter {
  dateStart: string;
  dateEnd: string;
}

interface Filters {
  idStore: number[];
  idCity: number[];
  idRegion: number[];
  idManager: number[];
  storeCondition: STORE_CONDITIONS[];
  ageGroup: AGE_GROUP[];
  idLegalEntity: number[];
  channel: FRS_CHANNEL[];
  district: string[];
}

export interface SalesDynamicsFilters {
  filterDate: DateFilter;
  filters: Filters;
  role: boolean;
  lfl: boolean;
  values: string[];
  groups: string;
}

// расширенный state-закус для zustand
export interface SalesDynamicsState extends SalesDynamicsFilters {
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  updateFilterDate: (dateStart: string, dateEnd: string) => void;
  updateRole: (role: boolean) => void;
  updateLfl: (lfl: boolean) => void;
  updateValues: (values: string[]) => void;
  updateGroups: (groups: string) => void;
  resetAll: () => void;
  getApiPayload: () => SalesDynamicsFilters;
}

//
// 2) Собираем initialFilters
//

const today = new Date();
let dateStart: string;
let dateEnd: string;

if (today.getDate() === 1) {
  const lastMonth = subMonths(today, 1);
  dateStart = format(startOfMonth(lastMonth), "yyyy-MM-dd");
  dateEnd = format(endOfMonth(lastMonth), "yyyy-MM-dd");
} else {
  dateStart = format(startOfMonth(today), "yyyy-MM-dd");
  dateEnd = format(subDays(today, 1), "yyyy-MM-dd");
}

const initialFilters: SalesDynamicsFilters = {
  filterDate: { dateStart, dateEnd },
  filters: {
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
  role: false,
  lfl: false,
  values: ["proceeds"],
  groups: "store",
};

//
// 3) Создаём zustand-store
//
export const ageGroupSchema = z.nativeEnum(AGE_GROUP);
export const frsChannelSchema = z.nativeEnum(FRS_CHANNEL);
export type SalesDynamicsApiPayload = ReturnType<
  SalesDynamicsState["getApiPayload"]
>;

export const useSalesDynamicsFiltersStore = create<SalesDynamicsState>(
  (set, get) => ({
    // сначала все поля из SalesDynamicsFilters
    ...initialFilters,

    // а теперь методы
    updateFilters: (key, value) =>
      set((state) => ({
        filters: { ...state.filters, [key]: value },
      })),

    updateFilterDate: (ds, de) =>
      set({ filterDate: { dateStart: ds, dateEnd: de } }),

    updateRole: (role) => set({ role }),

    updateLfl: (lfl) => set({ lfl }),

    updateValues: (values) => set({ values }),

    updateGroups: (groups) => set({ groups }),

    resetAll: () => set(initialFilters),

    getApiPayload: () => {
      // приводим get() к SalesDynamicsFilters
      const { filterDate, filters, role, lfl, values, groups } = get();
      return { filterDate, filters, role, lfl, values, groups };
    },
  }),
);
