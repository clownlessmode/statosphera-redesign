import {
  ReportGraphResponse,
  ReportTableResponse,
  ReportTotalResponse,
} from "@entities/report/model/api/filters/data/service";
import { ApiError } from "@shared/api/types";
import { create } from "zustand";

interface ReportStore {
  graph: ReportGraphResponse | null;
  total: ReportTotalResponse | null;
  table: ReportTableResponse | null;
  error: string | null;
  lastUpdate: number;
  isGraphLoading: boolean;
  isTableLoading: boolean;
  isTotalLoading: boolean;
  setGraph: (data: ReportGraphResponse) => void;
  setTotal: (data: ReportTotalResponse) => void;
  setTable: (data: ReportTableResponse) => void;
  setError: (data: ApiError) => void;
  setGraphLoading: (loading: boolean) => void;
  setTableLoading: (loading: boolean) => void;
  setTotalLoading: (loading: boolean) => void;
  clearAll: () => void;
}

export const useReportStore = create<ReportStore>((set) => ({
  graph: null,
  total: null,
  table: null,
  lastUpdate: 0,
  error: null,
  isGraphLoading: false,
  isTableLoading: false,
  isTotalLoading: false,
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
  setError: (data) =>
    set((state) => ({
      error: deepEqual(state.error, data.message)
        ? state.error
        : Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message,
      lastUpdate: Date.now(),
    })),

  setGraphLoading: (loading) => set({ isGraphLoading: loading }),
  setTableLoading: (loading) => set({ isTableLoading: loading }),
  setTotalLoading: (loading) => set({ isTotalLoading: loading }),

  clearAll: () =>
    set({
      graph: null,
      total: null,
      table: null,
      lastUpdate: 0,
      isGraphLoading: false,
      isTableLoading: false,
      isTotalLoading: false,
    }),
}));

// Вспомогательная функция для глубокого сравнения
const deepEqual = (a: any, b: any): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};
