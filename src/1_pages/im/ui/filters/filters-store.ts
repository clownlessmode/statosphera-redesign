import { endOfMonth, format, startOfMonth, subDays, subMonths } from "date-fns";
import { create } from "zustand";

interface LoyaltyFiltersState {
  store: {
    idStore: string[];
    idCity: string[];
    idRegion: string[];
    idManager: string[];
    storeCondition: string[];
    ageGroup: string[];
    idLegalEntity: string[];
    channel: string[];
    district: string[];
  };
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  groups: string[];
  updateStoreFilter: (key: string, value: string[]) => void;
  updateDateFilter: (dateStart: string, dateEnd: string) => void;
  updateGroups: (groups: string[]) => void;
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
  filterDate: {
    dateStart,
    dateEnd,
  },
  groups: [],
};

export const useLoyaltyFiltersStore = create<LoyaltyFiltersState>((set) => ({
  ...initialState,
  updateStoreFilter: (key, value) =>
    set((state) => ({
      store: {
        ...state.store,
        [key]: value,
      },
    })),
  updateDateFilter: (dateStart, dateEnd) =>
    set({
      filterDate: { dateStart, dateEnd },
    }),
  updateGroups: (groups) => set({ groups }),
}));
