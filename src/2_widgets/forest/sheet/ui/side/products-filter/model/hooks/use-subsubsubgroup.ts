import { processFiltersDto } from "@entities/forest/model/api/filters/data/service";
import { useFilters } from "@entities/forest/model/api/filters/products/controller";
import { SubSubSubGroupFilterResponse } from "@entities/forest/model/api/filters/products/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useTabStore } from "@widgets/forest/sheet/model/url-store";
import { useState } from "react";
import { create } from "zustand";
import { useFiltersWriteOff } from "@entities/forest/model/api/filters/products-write-off/controller";

interface SubsubsubgroupStore {
  savedSubsubsubgroupLabels: MultiSelectOption[];
  setSubsubsubgroupLabels: (opts: MultiSelectOption[]) => void;
}

const useSubsubsubgroupStore = create<SubsubsubgroupStore>((set) => ({
  savedSubsubsubgroupLabels: [],
  setSubsubsubgroupLabels: (opts) => set({ savedSubsubsubgroupLabels: opts }),
}));

export const useSubsubsubgroup = (allData: any) => {
  const [subsubsubgroupOptions, setSubsubsubgroupOptions] = useState<
    MultiSelectOption[]
  >([]);
  const tab = useTabStore((state) => state.tab);
  const { getSubSubSubGroups, isSubSubSubGroupsLoading } = useFilters();
  const {
    getSubSubSubGroups: getSubSubSubGroupsWriteOff,
    isSubSubSubGroupsLoading: isSubSubSubGroupsLoadingWriteOff,
  } = useFiltersWriteOff();
  const { savedSubsubsubgroupLabels, setSubsubsubgroupLabels } =
    useSubsubsubgroupStore();

  const handleOpenSubsubsubgroupsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response =
        tab === "write-off"
          ? await getSubSubSubGroupsWriteOff(processFiltersDto(allData))
          : await getSubSubSubGroups(processFiltersDto(allData));

      // Группируем элементы по названию и объединяем ID
      const groupedMap = new Map<string, number[]>();

      response.forEach((subsubsubgroup: SubSubSubGroupFilterResponse) => {
        const name = subsubsubgroup.threeLvlGroupName;
        const ids = subsubsubgroup.idThreeLvlGroupProduct || [];

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

      setSubsubsubgroupOptions(apiOptions);
      setSubsubsubgroupLabels(apiOptions);
    } catch (error) {
      setSubsubsubgroupOptions([]);
      setSubsubsubgroupLabels([]);
      console.error("Ошибка при загрузке подподгрупп:", error);
    }
  };

  return {
    handleOpenSubsubsubgroupsSelect,
    subsubsubgroupOptions,
    isSubSubSubGroupsLoading:
      tab === "write-off"
        ? isSubSubSubGroupsLoadingWriteOff
        : isSubSubSubGroupsLoading,
    savedSubsubsubgroupLabels,
  };
};
