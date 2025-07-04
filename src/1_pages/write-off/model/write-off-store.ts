import { create } from "zustand";
import {
  WriteOffTableResponse,
  WriteOffTotalResponse,
  WriteOffGraphSeriesArray,
} from "../api/types";

interface WriteOffStore {
  // Данные таблицы
  table: WriteOffTableResponse | null;
  total: WriteOffTotalResponse | null;

  // Данные графика
  graph: WriteOffGraphSeriesArray | null;

  // Статистика
  stats: any | null;

  // Состояние загрузки
  isLoading: boolean;
  error: string | null;

  // Методы для обновления состояния
  setTable: (data: WriteOffTableResponse | null) => void;
  setTotal: (data: WriteOffTotalResponse | null) => void;
  setGraph: (data: WriteOffGraphSeriesArray | null) => void;
  setStats: (data: any | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Методы для очистки данных
  clearAll: () => void;
  clearTable: () => void;
  clearGraph: () => void;
  clearStats: () => void;
}

export const useWriteOffStore = create<WriteOffStore>((set) => ({
  // Начальное состояние
  table: null,
  total: null,
  graph: null,
  stats: null,
  isLoading: false,
  error: null,

  // Методы обновления
  setTable: (data) => set({ table: data }),
  setTotal: (data) => set({ total: data }),
  setGraph: (data) => set({ graph: data }),
  setStats: (data) => set({ stats: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Методы очистки
  clearAll: () =>
    set({
      table: null,
      total: null,
      graph: null,
      stats: null,
      error: null,
    }),
  clearTable: () => set({ table: null, total: null }),
  clearGraph: () => set({ graph: null }),
  clearStats: () => set({ stats: null }),
}));
