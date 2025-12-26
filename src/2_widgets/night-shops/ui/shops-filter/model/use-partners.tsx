import { PartnersFilterResponse, RequestDto } from "@pages/night-stores/config";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useNightStores } from "@pages/night-stores/api/controller";

export const usePartners = (dto: Pick<RequestDto, "filters">) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useNightStores();

  const handleOpenPartnersSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPartners(dto);
      const apiOptions = response.map((partner: PartnersFilterResponse) => ({
        label: partner.nameManager,
        value: String(partner.idManager?.[0] || ""),
      }));
      setPartnerOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке партнёров:", error);
    }
  };

  return { partnerOptions, handleOpenPartnersSelect, isPartnersLoading };
};
