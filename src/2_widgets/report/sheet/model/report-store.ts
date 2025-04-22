import {
  ReportGraphResponse,
  ReportTableResponse,
  ReportTotalResponse,
} from "@entities/report/model/api/filters/data/service";
import { create } from "zustand";

interface ReportStore {
  graph: ReportGraphResponse | null;
  total: ReportTotalResponse | null;
  table: ReportTableResponse | null;
  lastUpdate: number;
  setGraph: (data: ReportGraphResponse) => void;
  setTotal: (data: ReportTotalResponse) => void;
  setTable: (data: ReportTableResponse) => void;
  clearAll: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  graph: null,
  total: null,
  table: null,
  lastUpdate: 0,

  setGraph: (data) =>
    set((state) => ({
      graph: deepEqual(state.graph, data) ? state.graph : data,
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
      lastUpdate: 0,
    }),
}));

// Вспомогательная функция для глубокого сравнения
const deepEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
