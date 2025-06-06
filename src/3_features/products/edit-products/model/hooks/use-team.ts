
import { TeamFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";
import { defaultValues } from "../../config";

interface TeamStore {
  savedTeamLabels: MultiSelectOption[];
  setTeamLabels: (opts: MultiSelectOption[]) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  savedTeamLabels: [],
  setTeamLabels: (opts) => set({ savedTeamLabels: opts }),
}));

export const useTeam = () => {
  const [teamOptions, setTeamOptions] = useState<MultiSelectOption[]>([]);
  const { getTeam, isTeamLoading } = useFilters();
  const { savedTeamLabels, setTeamLabels } = useTeamStore();

  const handleOpenTeamsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTeam();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.team_products,
        value: String(franchise.id_team_products || "")
      }));
      setTeamOptions(apiOptions);
      setTeamLabels(apiOptions);
    } catch (error) {
      setTeamOptions([]);
      setTeamLabels([]);
      console.error("Ошибка при загрузке команд:", error);
    }
  };

  return {
    handleOpenTeamsSelect,
    teamOptions,
    isTeamLoading,
    savedTeamLabels,
  };
};
