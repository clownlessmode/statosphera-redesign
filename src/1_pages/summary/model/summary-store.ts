import { create } from "zustand";
import {
  SummaryTableResponse,
  SummaryTotalResponse,
  SummaryCardResponse,
  SummaryNomenklaturaResponse,
} from "../api/types";

interface SummaryStore {
  // Данные карточек
  cards: SummaryCardResponse[] | null;

  // Данные таблицы
  table: SummaryTableResponse | null;
  total: SummaryTotalResponse | null;

  // Данные номенклатуры
  nomenklatura: SummaryNomenklaturaResponse[] | null;

  // Состояние загрузки
  isLoading: boolean;
  error: string | null;

  // Методы для обновления состояния
  setCards: (data: SummaryCardResponse[] | null) => void;
  setTable: (data: SummaryTableResponse | null) => void;
  setTotal: (data: SummaryTotalResponse | null) => void;
  setNomenklatura: (data: SummaryNomenklaturaResponse[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Методы для очистки данных
  clearAll: () => void;
  clearCards: () => void;
  clearTable: () => void;
  clearTotal: () => void;
  clearNomenklatura: () => void;
}

export const useSummaryStore = create<SummaryStore>((set) => ({
  // Начальное состояние
  cards: null,
  table: null,
  total: null,
  nomenklatura: null,
  isLoading: false,
  error: null,

  // Методы для обновления состояния
  setCards: (data) => set({ cards: data }),
  setTable: (data) => set({ table: data }),
  setTotal: (data) => set({ total: data }),
  setNomenklatura: (data) => set({ nomenklatura: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Методы для очистки данных
  clearAll: () =>
    set({
      cards: null,
      table: null,
      total: null,
      nomenklatura: null,
      error: null,
    }),
  clearCards: () => set({ cards: null }),
  clearTable: () => set({ table: null }),
  clearTotal: () => set({ total: null }),
  clearNomenklatura: () => set({ nomenklatura: null }),
}));
