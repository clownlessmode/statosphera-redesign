import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";

interface SeasonStore {
  savedSeasonLabels: MultiSelectOption[];
  setSeasonLabels: (opts: MultiSelectOption[]) => void;
}

const useSeasonStore = create<SeasonStore>((set) => ({
  savedSeasonLabels: [],
  setSeasonLabels: (opts) => set({ savedSeasonLabels: opts }),
}));

export const useSeason = () => {
  const [seasonsOptions, setSeasonsOptions] = useState<MultiSelectOption[]>([]);
  const { getSeasons, isSeasonsLoading } = useFilters();
  const { savedSeasonLabels, setSeasonLabels } = useSeasonStore();

  const handleOpenSeasonsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSeasons();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.seasonality_products,
        value: String(franchise.id_seasonality_products || ""),
      }));
      setSeasonsOptions(apiOptions);
      setSeasonLabels(apiOptions);
    } catch (error) {
      setSeasonsOptions([]);
      setSeasonLabels([]);
      console.error("Ошибка при загрузке сезонов:", error);
    }
  };

  return {
    handleOpenSeasonsSelect,
    seasonsOptions,
    isSeasonsLoading,
    savedSeasonLabels,
  };
};
