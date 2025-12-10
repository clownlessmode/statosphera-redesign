import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/products/controller";
import { SubgroupFilterResponse } from "@entities/forest/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useState } from "react";
import { create } from "zustand";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/products-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getSubGroups, isSubGroupsLoading } = useFilters();
  const {
    getSubGroups: getSubGroupsWriteOff,
    isSubGroupsLoading: isSubGroupsLoadingWriteOff,
  } = useFiltersWriteOff();
  const { savedSubgroupLabels, setSubgroupLabels } = useSubgroupStore();

  const handleOpenSubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getSubGroupsWriteOff(processFiltersDto(allData))
          : await getSubGroups(processFiltersDto(allData));

      const groupedMap = new Map<string, number[]>();

      response.forEach((subgroup: SubgroupFilterResponse) => {
        const name = subgroup.oneLvlGroupName;
        const ids = subgroup.idOneLvlGroupProduct || [];

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
    isSubGroupsLoading:
      tab === "write-off" ? isSubGroupsLoadingWriteOff : isSubGroupsLoading,
    savedSubgroupLabels,
  };
};
