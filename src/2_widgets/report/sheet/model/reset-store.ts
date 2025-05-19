import { create } from "zustand";

interface FormResetStore {
  resetSignal: number;
  triggerReset: () => void;
}

export const useFormResetStore = create<FormResetStore>((set) => ({
  resetSignal: 0,
  triggerReset: () => set((state) => ({ resetSignal: state.resetSignal + 1 })),
}));
