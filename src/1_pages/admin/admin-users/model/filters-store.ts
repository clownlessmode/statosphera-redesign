import { create } from "zustand";

import {
  AdminUsersFilterFields,
  INITIAL_ADMIN_USERS_FILTERS,
} from "./use-form";

type AdminUsersFiltersState = {
  filters: AdminUsersFilterFields;
  dataVersion: number;
  updateFilter: <K extends keyof AdminUsersFilterFields>(
    key: K,
    value: AdminUsersFilterFields[K],
  ) => void;
  setFilters: (next: AdminUsersFilterFields) => void;
  resetFilters: () => void;
  bumpDataVersion: () => void;
};

export const useAdminUsersFiltersStore = create<AdminUsersFiltersState>(
  (set) => ({
    filters: INITIAL_ADMIN_USERS_FILTERS,
    dataVersion: 0,

    updateFilter: (key, value) =>
      set((state) => ({
        filters: {
          ...state.filters,
          [key]: value,
        },
      })),

    setFilters: (next) => set({ filters: next }),

    resetFilters: () => set({ filters: INITIAL_ADMIN_USERS_FILTERS }),

    bumpDataVersion: () =>
      set((state) => ({ dataVersion: state.dataVersion + 1 })),
  }),
);
