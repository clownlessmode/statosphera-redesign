import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/products/controller";
import { SubSubGroupFilterResponse } from "@entities/forest/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useState } from "react";
import { create } from "zustand";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/products-write-off/controller";

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
  const tab = useTabStore((state) => state.tab);
  const { getSubSubGroups, isSubsubgroupsLoading } = useFilters();
  const {
    getSubSubGroups: getSubSubGroupsWriteOff,
    isSubsubgroupsLoading: isSubsubgroupsLoadingWriteOff,
  } = useFiltersWriteOff();
  const { savedSubsubgroupLabels, setSubsubgroupLabels } =
    useSubsubgroupStore();

  const handleOpenSubsubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getSubSubGroupsWriteOff(processFiltersDto(allData))
          : await getSubSubGroups(processFiltersDto(allData));

      // Группируем элементы по названию и объединяем ID
      const groupedMap = new Map<string, number[]>();

      response.forEach((subsubgroup: SubSubGroupFilterResponse) => {
        const name = subsubgroup.twoLvlGroupName;
        const ids = subsubgroup.idTwoLvlGroupProduct || [];

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
    isSubsubgroupsLoading:
      tab === "write-off"
        ? isSubsubgroupsLoadingWriteOff
        : isSubsubgroupsLoading,
    savedSubsubgroupLabels,
  };
};
