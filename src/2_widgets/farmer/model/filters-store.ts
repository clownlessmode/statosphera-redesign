import { create } from "zustand";

interface Filters {
  photo: string;
  organizationName: string;
  phoneNumber: string;
  email: string;
  inn: string[];
  legalAddress: string;
  workshopAddress: string;
  periodDeclar: string;
  startDateCooper: string;
  dateFirstDelivery: string;
  personalization: string;
  companyHistory: string;
}

interface FarmerFiltersState {
  filters: Filters;
  updateFilters: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  getApiPayload: () => Filters;
}

const initialFilters = {
  filters: {
    photo: "",
    organizationName: "",
    phoneNumber: "",
    email: "",
    inn: [],
    legalAddress: "",
    workshopAddress: "",
    periodDeclar: "",
    startDateCooper: "",
    dateFirstDelivery: "",
    personalization: "",
    companyHistory: "",
  },
};

export const useFiltersStore = create<FarmerFiltersState>((set, get) => ({
  ...initialFilters,
  updateFilters: (key, value) =>
    set((state) => {
      return {
        filters: {
          ...state.filters,
          [key]: value,
        },
      };
    }),

  getApiPayload: () => {
    const { filters } = get();
    return filters;
  },
}));
