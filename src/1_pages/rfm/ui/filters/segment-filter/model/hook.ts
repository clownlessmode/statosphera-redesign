// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useRfmFiltersStore } from "../../filters-store";
import { useRfm } from "@pages/rfm/api";
import { FormValues } from "./types";

const useForm = () => {
  const { rfmList, period, sankey, heatmap } = useRfmFiltersStore(
    (state) => state.filters,
  );
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      rfmList: rfmList || defaultValues.rfmList,
      period: period || defaultValues.period,
      sankey: sankey || defaultValues.sankey,
      heatmap: heatmap || defaultValues.heatmap,
    },
    mode: "all",
  });

  return form;
};

export default useForm;

export const useSegments = () => {
  const [nameSegmentOptions, setNameSegmentOptions] = useState<
    MultiSelectOption[]
  >([]);

  const { nameSegment, isNameSegmentLoading } = useRfm();

  const handleOpenNameSegment = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const apiOptions = nameSegment!.map((nameSegment) => ({
        label: `${nameSegment.rfmCode}. ${nameSegment.rfmName}`,
        value: String(nameSegment.rfmCode || ""),
      }));
      setNameSegmentOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке сегментов:", error);
    }
  };

  return { nameSegmentOptions, handleOpenNameSegment, isNameSegmentLoading };
};
