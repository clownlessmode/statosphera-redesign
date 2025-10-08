// stores-apply-store.ts - Store для управления применением фильтров

import { create } from "zustand";

type StoresApplyState = {
  shouldApply: boolean;
  setShouldApply: (value: boolean) => void;
  triggerApply: () => void;
};

export const useStoresApplyStore = create<StoresApplyState>((set) => ({
  shouldApply: true, // По умолчанию true для первой загрузки
  setShouldApply: (value) => set({ shouldApply: value }),
  triggerApply: () => set({ shouldApply: true }),
}));
