import { processFiltersDto } from "@entities/report/model/api/filters/data/service";
import { useFilters } from "@entities/report/model/api/filters/shops/controller";
import { PartnersFilterResponse } from "@entities/report/model/api/filters/shops/service";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";

interface PartnersStore {
  savedPartnerLabels: MultiSelectOption[];
  setPartnerLabels: (options: MultiSelectOption[]) => void;
}

export const usePartnersStore = create<PartnersStore>((set) => ({
  savedPartnerLabels: [],
  setPartnerLabels: (options) => set({ savedPartnerLabels: options }),
}));

export const usePartners = (allData: any) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useFilters();
  const { setPartnerLabels, savedPartnerLabels } = usePartnersStore();

  const handleOpenPartnersSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPartners(processFiltersDto(allData));
      const apiOptions = response.map((partner: PartnersFilterResponse) => ({
        label: partner.nameManager,
        value: String(JSON.stringify(partner.idManager || [])),
      }));

      setPartnerOptions(apiOptions);
      setPartnerLabels(apiOptions);
    } catch (error) {
      setPartnerOptions([]);
      setPartnerLabels([]);
      console.error("Ошибка при загрузке партнёров:", error);
    }
  };

  return {
    partnerOptions,
    handleOpenPartnersSelect,
    isPartnersLoading,
    savedPartnerLabels, // ← теперь доступен в компоненте
  };
};
