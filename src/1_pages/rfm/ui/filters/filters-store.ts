import { create } from "zustand";

interface Filters {
  rfmList: number[];
  period: string;
  sankey: string;
  heatmap: string;
}

interface RfmFiltersState {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetAll: () => void;
  getApiPayload: () => Filters;
}

const initialFilters = {
  filters: {
    rfmList: [],
    period: "M0",
    sankey: "M-3 -> M0",
    heatmap: "M-3 -> M0",
  },
};

export const useRfmFiltersStore = create<RfmFiltersState>((set, get) => ({
  ...initialFilters,
  updateFilters: (key, value) =>
    set((state) => {
      if (Array.isArray(value) && key === "rfmList") {
        return {
          filters: {
            ...state.filters,
            [key]: value.sort((a, b) => Number(a) - Number(b)),
          },
        };
      } else {
        return {
          filters: {
            ...state.filters,
            [key]: value,
          },
        };
      }
    }),

  resetAll: () => set(initialFilters),

  getApiPayload: () => {
    // приводим get() к SalesDynamicsFilters
    const { filters } = get();
    return filters;
  },
}));
