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
    [],
  );
  const { getSubGroups, isSubGroupsLoading } = useFilters();
  const { savedSubgroupLabels, setSubgroupLabels } = useSubgroupStore();

  const handleOpenSubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubGroups(processFiltersDto(allData));

      const groupedMap = new Map<string, number[]>();

      response.forEach((subgroup: SubgroupFilterResponse) => {
        const name = subgroup.subGroups;
        const ids = subgroup.idSubGroups || [];

        if (groupedMap.has(name)) {
          const existingIds = groupedMap.get(name)!;
          const mergedIds = [...new Set([...existingIds, ...ids])];
          groupedMap.set(name, mergedIds);
        } else {
          groupedMap.set(name, [...ids]);
        }
      });

      const apiOptions = Array.from(groupedMap.entries()).map(
        ([name, ids]) => ({
          label: name,
          value: String(JSON.stringify(ids)),
        }),
      );

      setSubgroupOptions(apiOptions);
      setSubgroupLabels(apiOptions);
    } catch {
      setSubgroupOptions([]);
      setSubgroupLabels([]);
    }
  };

  return {
    handleOpenSubgroupsSelect,
    subgroupOptions,
    isSubGroupsLoading,
    savedSubgroupLabels,
  };
};
