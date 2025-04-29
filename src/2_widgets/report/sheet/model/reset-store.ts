// src/stores/formResetStore.ts
import { create } from "zustand";

type FormResetFn = () => void;

interface FormResetStore {
  resets: FormResetFn[];
  addReset: (fn: FormResetFn) => void;
  removeReset: (fn: FormResetFn) => void;
  resetAll: () => void;
}

export const useFormResetStore = create<FormResetStore>((set, get) => ({
  resets: [],
  addReset: (fn) =>
    set((state) => ({
      resets: [...state.resets, fn],
    })),
  removeReset: (fn) =>
    set((state) => ({
      resets: state.resets.filter((f) => f !== fn),
    })),
  resetAll: () => {
    const { resets } = get();
    resets.forEach((fn) => fn());
  },
}));
