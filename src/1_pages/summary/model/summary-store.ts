import { create } from "zustand";
import { SummaryCardResponse, SummaryNomenklaturaResponse } from "../api/types";
import { SummaryGraphResponse } from "../api/types/responses";

interface SummaryStore {
  // Данные карточек
  cards: SummaryCardResponse[] | null;

  // Данные графика
  graph: SummaryGraphResponse | null;

  // Данные номенклатуры
  nomenklatura: SummaryNomenklaturaResponse[] | null;

  // Состояние загрузки
  isLoading: boolean;
  error: string | null;

  // Методы для обновления состояния
  setCards: (data: SummaryCardResponse[] | null) => void;
  setGraph: (data: SummaryGraphResponse | null) => void;
  setNomenklatura: (data: SummaryNomenklaturaResponse[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Методы для очистки данных
  clearAll: () => void;
  clearCards: () => void;
  clearGraph: () => void;
  clearNomenklatura: () => void;
}

export const useSummaryStore = create<SummaryStore>((set) => ({
  // Начальное состояние
  cards: null,
  graph: null,
  nomenklatura: null,
  isLoading: false,
  error: null,

  // Методы для обновления состояния
  setCards: (data) => set({ cards: data }),
  setGraph: (data) => set({ graph: data }),
  setNomenklatura: (data) => set({ nomenklatura: data }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),

  // Методы для очистки данных
  clearAll: () =>
    set({
      cards: null,
      graph: null,
      nomenklatura: null,
      error: null,
    }),
  clearCards: () => set({ cards: null }),
  clearGraph: () => set({ graph: null }),
  clearNomenklatura: () => set({ nomenklatura: null }),
}));
