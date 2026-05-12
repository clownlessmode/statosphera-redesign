import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { SectorsFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface SectorsStore {
  savedSectorLabels: MultiSelectOption[];
  setSectorLabels: (options: MultiSelectOption[]) => void;
}

export const useSectorsStore = create<SectorsStore>((set) => ({
  savedSectorLabels: [],
  setSectorLabels: (options) => set({ savedSectorLabels: options }),
}));

export const useSectors = () => {
  const [sectorsOptions, setSectorsOptions] = useState<MultiSelectOption[]>([]);
  const { sectors, isSectorsLoading } = useFilters();
  const { setSectorLabels, savedSectorLabels } = useSectorsStore();

  const handleOpenSectorsSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const apiOptions = sectors.map((sector: SectorsFilterResponse) => ({
        label: sector.sector,
        value: sector.sector,
      }));

      setSectorsOptions(apiOptions);
      setSectorLabels(apiOptions);
    } catch (error) {
      setSectorsOptions([]);
      setSectorLabels([]);
      console.error("Ошибка при загрузке секторов:", error);
    }
  };

  return {
    sectorsOptions,
    handleOpenSectorsSelect,
    isSectorsLoading,
    savedSectorLabels, // ← доступен в компоненте
  };
};
