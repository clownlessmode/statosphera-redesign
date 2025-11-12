import { MultiSelectOption } from "@shared/ui/multiselect";
import { useState } from "react";
import { create } from "zustand";
import { useFilters } from "@entities/unload/model/api/filters/audience/controller";

interface AudienceStore {
  savedAudienceLabels: MultiSelectOption[];
  setAudienceLabels: (opts: MultiSelectOption[]) => void;
}

const useAudienceStore = create<AudienceStore>((set) => ({
  savedAudienceLabels: [],
  setAudienceLabels: (opts) => set({ savedAudienceLabels: opts }),
}));

export const useAudience = () => {
  const [audienceOptions, setAudienceOptions] = useState<MultiSelectOption[]>(
    [],
  );
  const { audience, isAudienceLoading } = useFilters();
  const { savedAudienceLabels, setAudienceLabels } = useAudienceStore();

  const handleOpenAudienceSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const apiOptions = audience?.data?.map(
        (audience: { nameAudience: string; idAudience: number }) => ({
          label: audience.nameAudience,
          value: String(audience.idAudience),
        }),
      );
      setAudienceOptions(apiOptions || []);
      setAudienceLabels(apiOptions || []);
    } catch (error) {
      setAudienceOptions([]);
      setAudienceLabels([]);
      console.error("Ошибка при загрузке аудиторий:", error);
    }
  };

  return {
    handleOpenAudienceSelect,
    audienceOptions,
    isAudienceLoading,
    savedAudienceLabels,
  };
};
