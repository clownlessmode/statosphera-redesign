import { create } from "zustand";

interface TypeCheckStore {
  isTypeCheckSelected: boolean;
  setIsTypeCheckSelected: (value: boolean) => void;
}

export const useTypeCheckStore = create<TypeCheckStore>((set) => ({
  isTypeCheckSelected: false,
  setIsTypeCheckSelected: (value) => set({ isTypeCheckSelected: value }),
}));
