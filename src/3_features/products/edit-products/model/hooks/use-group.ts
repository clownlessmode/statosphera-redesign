
import { GroupMainFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "../../api";
import { defaultValues } from "../../config";

interface GroupStore {
  savedGroupLabels: MultiSelectOption[];
  setGroupLabels: (opts: MultiSelectOption[]) => void;
}

const useGroupStore = create<GroupStore>((set) => ({
  savedGroupLabels: [],
  setGroupLabels: (opts) => set({ savedGroupLabels: opts }),
}));

export const useGroup = () => {
  const [groupOptions, setGroupOptions] = useState<MultiSelectOption[]>([]);
  const { getGroups, isGroupsLoading } = useFilters();
  const { savedGroupLabels, setGroupLabels } = useGroupStore();

  const handleOpenGroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getGroups();
      const apiOptions = response.map((franchise: any) => ({
        label: franchise.groups_main,
        value: String(franchise.id_groups_main || "")
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
