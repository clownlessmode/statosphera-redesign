import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { TeamFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface TeamStore {
  savedTeamLabels: MultiSelectOption[];
  setTeamLabels: (opts: MultiSelectOption[]) => void;
}

const useTeamStore = create<TeamStore>((set) => ({
  savedTeamLabels: [],
  setTeamLabels: (opts) => set({ savedTeamLabels: opts }),
}));

export const useTeam = (allData: any) => {
  const [teamOptions, setTeamOptions] = useState<MultiSelectOption[]>([]);
  const { getTeam, isTeamLoading } = useFilters();
  const { savedTeamLabels, setTeamLabels } = useTeamStore();

  const handleOpenTeamsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getTeam(allData);
      const apiOptions = response.map((team: TeamFilterResponse) => ({
        label: team.teamProducts,
        value: String(team.idTeamProducts?.[0] || ""),
      }));
      setTeamOptions(apiOptions);
      setTeamLabels(apiOptions);
    } catch (error) {
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
