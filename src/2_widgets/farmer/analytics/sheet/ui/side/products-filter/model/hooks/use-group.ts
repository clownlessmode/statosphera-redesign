import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { GroupMainFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface GroupStore {
  savedGroupLabels: MultiSelectOption[];
  setGroupLabels: (opts: MultiSelectOption[]) => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  savedGroupLabels: [],
  setGroupLabels: (opts) => set({ savedGroupLabels: opts }),
}));

export const useGroup = (allData: any) => {
  const [groupOptions, setGroupOptions] = useState<MultiSelectOption[]>([]);
  const { getGroups, isGroupsLoading } = useFilters();
  const { savedGroupLabels, setGroupLabels } = useGroupStore();

  const handleOpenGroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getGroups(processFiltersDto(allData));
      const apiOptions = response.map((group: GroupMainFilterResponse) => ({
        label: group.groupsMain,
        value: String(JSON.stringify(group.idGroupsMain || [])),
      }));
      setGroupOptions(apiOptions);
      setGroupLabels(apiOptions);
    } catch (error) {
      setGroupOptions([]);
      setGroupLabels([]);
      console.error("Ошибка при загрузке групп:", error);
    }
  };

  return {
    handleOpenGroupsSelect,
    groupOptions,
    isGroupsLoading,
    savedGroupLabels,
  };
};
