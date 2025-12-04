import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/products/controller";
import { GroupMainFilterResponse } from "@entities/forest/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/products-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getGroups, isGroupsLoading } = useFilters();
  const {
    getGroups: getGroupsWriteOff,
    isGroupsLoading: isGroupsLoadingWriteOff,
  } = useFiltersWriteOff();
  const { savedGroupLabels, setGroupLabels } = useGroupStore();

  const handleOpenGroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getGroupsWriteOff(processFiltersDto(allData))
          : await getGroups(processFiltersDto(allData));
      const apiOptions = response.map((group: GroupMainFilterResponse) => ({
        label: group.groupMainName,
        value: String(JSON.stringify(group.idProductGroup || [])),
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
    isGroupsLoading:
      tab === "write-off" ? isGroupsLoadingWriteOff : isGroupsLoading,
    savedGroupLabels,
  };
};
