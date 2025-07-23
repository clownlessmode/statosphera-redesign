import { create } from "zustand";

interface SummaryVersionStore {
  dataVersion: number;
  bumpDataVersion: () => void;
}

export const useSummaryVersionStore = create<SummaryVersionStore>((set) => ({
  dataVersion: 0,
  bumpDataVersion: () =>
    set((state) => ({ dataVersion: state.dataVersion + 1 })),
}));
