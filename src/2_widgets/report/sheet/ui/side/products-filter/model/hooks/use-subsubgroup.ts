import { useFilters } from "@entities/report/model/api/filters/products/controller";
import { SubSubGroupFilterResponse } from "@entities/report/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface SubsubgroupStore {
  savedSubsubgroupLabels: MultiSelectOption[];
  setSubsubgroupLabels: (opts: MultiSelectOption[]) => void;
}

const useSubsubgroupStore = create<SubsubgroupStore>((set) => ({
  savedSubsubgroupLabels: [],
  setSubsubgroupLabels: (opts) => set({ savedSubsubgroupLabels: opts }),
}));

export const useSubsubgroup = (allData: any) => {
  const [subsubgroupOptions, setSubsubgroupOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getSubSubGroups, isSubsubgroupsLoading } = useFilters();
  const { savedSubsubgroupLabels, setSubsubgroupLabels } =
    useSubsubgroupStore();

  const handleOpenSubsubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getSubSubGroups(allData);
      const apiOptions = response.map(
        (subsubgroup: SubSubGroupFilterResponse) => ({
          label: subsubgroup.subSubGroups,
          value: String(subsubgroup.idSubSubGroups?.[0] || ""),
        })
      );
      setSubsubgroupOptions(apiOptions);
      setSubsubgroupLabels(apiOptions);
    } catch (error) {
      setSubsubgroupOptions([]);
      setSubsubgroupLabels([]);
      console.error("Ошибка при загрузке подподгрупп:", error);
    }
  };

  return {
    handleOpenSubsubgroupsSelect,
    subsubgroupOptions,
    isSubsubgroupsLoading,
    savedSubsubgroupLabels,
  };
};
