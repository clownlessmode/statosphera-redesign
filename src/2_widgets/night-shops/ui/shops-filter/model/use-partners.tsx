import { PartnersFilterResponse } from "@pages/sales-dynamics/model/api/service";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useSalesDynamicsController } from "@pages/sales-dynamics/model/api/controller";

export const usePartners = (allData: any) => {
  const [partnerOptions, setPartnerOptions] = useState<MultiSelectOption[]>([]);
  const { getPartners, isPartnersLoading } = useSalesDynamicsController();

  const handleOpenPartnersSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPartners(allData);
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
