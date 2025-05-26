import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { SubgroupFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface SubgroupStore {
  savedSubgroupLabels: MultiSelectOption[];
  setSubgroupLabels: (opts: MultiSelectOption[]) => void;
}

const useSubgroupStore = create<SubgroupStore>((set) => ({
  savedSubgroupLabels: [],
  setSubgroupLabels: (opts) => set({ savedSubgroupLabels: opts }),
}));

export const useSubgroup = (allData: any) => {
  const [subgroupOptions, setSubgroupOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getSubGroups, isSubGroupsLoading } = useFilters();
  const { savedSubgroupLabels, setSubgroupLabels } = useSubgroupStore();

  const handleOpenSubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubGroups(processFiltersDto(allData));
      const apiOptions = response.map((subgroup: SubgroupFilterResponse) => ({
        label: subgroup.subGroups,
        value: String(JSON.stringify(subgroup.idSubGroups || [])),
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
