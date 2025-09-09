import { processFiltersDtoForOptions } from "@entities/report/model/api/filters/data/service";
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
      const response = await getSubSubGroups(
        processFiltersDtoForOptions(allData),
      );

      // Группируем элементы по названию и объединяем ID
      const groupedMap = new Map<string, number[]>();

      response.forEach((subsubgroup: SubSubGroupFilterResponse) => {
        const name = subsubgroup.subSubGroups;
        const ids = subsubgroup.idSubSubGroups || [];

        if (groupedMap.has(name)) {
          // Объединяем ID для существующего названия
          const existingIds = groupedMap.get(name)!;
          const mergedIds = [...new Set([...existingIds, ...ids])];
          groupedMap.set(name, mergedIds);
        } else {
          // Создаем новую группу
          groupedMap.set(name, [...ids]);
        }
      });

      // Создаем опции из сгруппированных данных
      const apiOptions = Array.from(groupedMap.entries()).map(
        ([name, ids]) => ({
          label: name,
          value: String(JSON.stringify(ids)),
        }),
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
