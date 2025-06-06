import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";

interface SubgroupStore {
  savedSubgroupLabels: MultiSelectOption[];
  setSubgroupLabels: (opts: MultiSelectOption[]) => void;
}

const useSubgroupStore = create<SubgroupStore>((set) => ({
  savedSubgroupLabels: [],
  setSubgroupLabels: (opts) => set({ savedSubgroupLabels: opts }),
}));

export const useSubgroup = () => {
  const [subgroupOptions, setSubgroupOptions] = useState<MultiSelectOption[]>(
    [],
  );
  const { getSubGroups, isSubGroupsLoading } = useFilters();
  const { savedSubgroupLabels, setSubgroupLabels } = useSubgroupStore();

  const handleOpenSubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubGroups();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.sub_groups,
        value: String(franchise.id_sub_groups || ""),
      }));
      setSubgroupOptions(apiOptions);
      setSubgroupLabels(apiOptions);
    } catch (error) {
      setSubgroupOptions([]);
      setSubgroupLabels([]);
      console.error("Ошибка при загрузке подгрупп:", error);
    }
  };

  return {
    handleOpenSubgroupsSelect,
    subgroupOptions,
    isSubGroupsLoading,
    savedSubgroupLabels,
  };
};
