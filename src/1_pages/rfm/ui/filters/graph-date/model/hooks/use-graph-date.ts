import { create } from "zustand";
import { DateFilterValue } from "../../ui";

export const useGraphDate = create<GraphDateState>((set) => ({
  value: "day",
  setValue: (value) => set({ value }),
}));

interface GraphDateState {
  value: DateFilterValue;
  setValue: (value: DateFilterValue) => void;
}
