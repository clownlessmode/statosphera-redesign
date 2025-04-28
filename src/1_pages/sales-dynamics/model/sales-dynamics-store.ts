import {
  GraphSeries,
  SalesTableResponse,
  SalesTotalResponse,
} from "./api/service";
import { create } from "zustand";

interface SalesDynamicsStore {
  graph: GraphSeries[] | null;
  total: SalesTotalResponse | null;
  table: SalesTableResponse | null;
  secondGraph: GraphSeries[] | null;
  lastUpdate: number;
  setGraph: (data: GraphSeries[]) => void;
  setSecondGraph: (data: GraphSeries[]) => void;
  setTotal: (data: SalesTotalResponse) => void;
  setTable: (data: SalesTableResponse) => void;
  clearAll: () => void;
}

export const useSalesDynamicsStore = create<SalesDynamicsStore>((set) => ({
  graph: null,
  total: null,
  table: null,
  secondGraph: null,
  lastUpdate: 0,

  setGraph: (data) =>
    set((state) => ({
      graph: deepEqual(state.graph, data) ? state.graph : data,
      lastUpdate: Date.now(),
    })),

  setSecondGraph: (data) =>
    set((state) => ({
      secondGraph: deepEqual(state.secondGraph, data)
        ? state.secondGraph
        : data,
      lastUpdate: Date.now(),
    })),

  setTotal: (data) =>
    set((state) => ({
      total: deepEqual(state.total, data) ? state.total : data,
      lastUpdate: Date.now(),
    })),

  setTable: (data) =>
    set((state) => ({
      table: deepEqual(state.table, data) ? state.table : data,
      lastUpdate: Date.now(),
    })),

  clearAll: () =>
    set({
      graph: null,
      total: null,
      table: null,
      secondGraph: null,
      lastUpdate: 0,
    }),
}));

// Вспомогательная функция для глубокого сравнения
const deepEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
