import { RequestDtoComparison } from "@pages/rfm/config";
import { create } from "zustand";

interface RfmFiltersState {
  filters: RequestDtoComparison;
  updateFilters: <K extends keyof RequestDtoComparison>(
    key: K,
    value: RequestDtoComparison[K],
  ) => void;
  resetAll: () => void;
  getApiPayload: () => RequestDtoComparison;
}

const initialFilters = {
  filters: {
    firstSegment: {
      rfmCode: 111,
      age: [
        "<18",
        "18-25",
        "25-35",
        "35-45",
        "45-60",
        ">60",
        "Не указан возраст",
      ],
      sex: ["Мужской", "Женский", "Не определено"],
      period: "M0",
    },
    secondSegment: {
      rfmCode: 111,
      age: [
        "<18",
        "18-25",
        "25-35",
        "35-45",
        "45-60",
        ">60",
        "Не указан возраст",
      ],
      sex: ["Мужской", "Женский", "Не определено"],
      period: "M0",
    },
  },
};

export const useComparisonFiltersStore = create<RfmFiltersState>(
  (set, get) => ({
    ...initialFilters,
    updateFilters: (key, value) =>
      set((state) => {
        return {
          filters: {
            ...state.filters,
            [key]: { ...state.filters[key], ...value },
          },
        };
      }),

    resetAll: () => set(initialFilters),

    getApiPayload: () => {
      const { filters } = get();
      return filters;
    },
  }),
);
