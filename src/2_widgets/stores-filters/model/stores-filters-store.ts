// stores-filters-store.ts - Store для управления фильтрами магазинов

import { create } from "zustand";

export enum STORE_AGE_GROUP {
  NOT_CALCULATED = "Не рассчитан",
  ADULT = "Взрослый",
  TEENAGER = "Подросток",
  TODDLER = "Малыш",
}

export enum STORE_CHANNEL {
  FRS = "ФРС",
  INVEST = "Франшиза инвестиционная",
  RENT = "Франшиза в аренду",
  FOODTRUCK = "Фудтрак",
  MICROMARKET = "Микромаркет",
  WENDING = "Вендинг",
  SERVICES_STORE = "Служебный магазин ООО Волков",
  TRADING_NETWORK = "Отдел торговой сети",
}

export enum STORE_STATUS {
  OPEN = "Действующие",
  CLOSED = "ЗАКРЫТЫЕ",
}

export type StoresFiltersState = {
  // Основные фильтры
  filters: {
    idStore: number[];
    idCity: number[];
    idRegion: number[];
    idManager: number[];
    ageGroup: string[];
    idLegalEntity: number[];
    channel: string[];
    district: number[];
    storeCondition: string[];
    nightStore: boolean | null;
    shopOnAuto: boolean | null;
    deliveryIm: boolean | null;
    walkingDelivery: boolean | null;
    grill: boolean | null;
    dopeki: boolean | null;
    bakehouse: boolean | null;
    brazier: boolean | null;
    camera: boolean | null;
    coffee: boolean | null;
    typeCoffee: string[];
    ownershipCoffee: string[];
    milkRefrigerator: boolean | null;
    pizzaCm: string[];
    pizzaDaysSchedule: string[];
    pizzaHoursSchedule: string[];
    maxPower: string[];
    format: string[];
    discountTime: string[];
    startDate: string;
    endDate: string;
  };

  // Методы обновления
  updateFilter: <K extends keyof StoresFiltersState["filters"]>(
    key: K,
    value: StoresFiltersState["filters"][K],
  ) => void;

  resetAllFilters: () => void;

  getApiPayload: () => StoresFiltersState["filters"];
};

// Начальное состояние
const initialState: Omit<
  StoresFiltersState,
  "updateFilter" | "resetAllFilters" | "getApiPayload"
> = {
  filters: {
    idStore: [],
    idCity: [],
    idRegion: [],
    idManager: [],
    ageGroup: [],
    idLegalEntity: [],
    channel: [],
    district: [],
    storeCondition: [],
    nightStore: null,
    shopOnAuto: null,
    deliveryIm: null,
    walkingDelivery: null,
    grill: null,
    dopeki: null,
    bakehouse: null,
    brazier: null,
    camera: null,
    coffee: null,
    typeCoffee: [],
    ownershipCoffee: [],
    milkRefrigerator: null,
    pizzaCm: [],
    pizzaDaysSchedule: [],
    pizzaHoursSchedule: [],
    maxPower: [],
    format: [],
    discountTime: [],
    startDate: "1800-01-01",
    endDate: "2030-06-10",
  },
};

export const useStoresFiltersStore = create<StoresFiltersState>((set, get) => ({
  ...initialState,

  updateFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  resetAllFilters: () => set(initialState),

  getApiPayload: () => {
    const state = get();
    return state.filters;
  },
}));
