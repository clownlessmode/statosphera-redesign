import { create } from "zustand";
import { WriteOffReason } from "../api/types";

interface WriteOffReasonsState {
  reasons: WriteOffReason[] | null;
  isLoading: boolean;
  error: string | null;

  setReasons: (data: WriteOffReason[] | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearReasons: () => void;
}

export const useWriteOffReasonsStore = create<WriteOffReasonsState>((set) => ({
  reasons: null,
  isLoading: false,
  error: null,

  setReasons: (data) => set({ reasons: data, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error, reasons: null }),
  clearReasons: () => set({ reasons: null, error: null }),
}));
