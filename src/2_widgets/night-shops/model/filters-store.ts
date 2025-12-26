import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";
import { create } from "zustand";

interface Filters {
  store: {
    idStore: number[];
    idCity: number[];
    idRegion: number[];
    idManager: number[];
    storeCondition: string[];
    ageGroup: string[];
    idLegalEntity: number[];
    channel: string[];
    district: number[];
  };
}
interface NightStoresFiltersState {
  filters: Filters;
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  updateStoreFilters: <K extends keyof Filters["store"]>(
    key: K,
    value: Filters["store"][K],
  ) => void;
  updateDateFilter: (dateStart: string, dateEnd: string) => void;
}
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
const initialState = {
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
  },
  filterDate: {
    dateStart,
    dateEnd,
  },
};

export const useNightStoresFiltersStore = create<NightStoresFiltersState>(
  (set) => ({
    ...initialState,
    updateStoreFilters: (key, value) =>
      set((state) => ({
        filters: {
          ...state.filters,
          store: {
            ...state.filters.store,
            [key]: value,
          },
        },
      })),
    updateDateFilter: (dateStart, dateEnd) =>
      set({
        filterDate: { dateStart, dateEnd },
      }),
  }),
);
