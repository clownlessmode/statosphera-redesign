import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { SeasonFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface SeasonStore {
  savedSeasonLabels: MultiSelectOption[];
  setSeasonLabels: (opts: MultiSelectOption[]) => void;
}

const useSeasonStore = create<SeasonStore>((set) => ({
  savedSeasonLabels: [],
  setSeasonLabels: (opts) => set({ savedSeasonLabels: opts }),
}));

export const useSeason = (allData: any) => {
  const [seasonsOptions, setSeasonsOptions] = useState<MultiSelectOption[]>([]);
  const { getSeasons, isSeasonsLoading } = useFilters();
  const { savedSeasonLabels, setSeasonLabels } = useSeasonStore();

  const handleOpenSeasonsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSeasons(allData);
      const apiOptions = response.map((season: SeasonFilterResponse) => ({
        label: season.seasonalityProducts,
        value: String(season.idSeasonalityProducts?.[0] || ""),
      }));
      setSeasonsOptions(apiOptions);
      setSeasonLabels(apiOptions);
    } catch (error) {
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
