// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../config/schema";
import { defaultValues } from "../config/default";
import { useForm as useHookForm } from "react-hook-form";
import { useState } from "react";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { useFiltersStore } from "@widgets/rfm/model/filters-store";
import { useRfm } from "@pages/rfm/api";
import { FormValues } from "../config/types";

const useForm = () => {
  const { rfmList, agePeriods, period, sankey, heatmap } = useFiltersStore(
    (state) => state.filters,
  );
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      rfmList: rfmList || defaultValues.rfmList,
      agePeriods: agePeriods || defaultValues.agePeriods,
      period: period || defaultValues.period,
      sankey: sankey || defaultValues.sankey,
      heatmap: heatmap || defaultValues.heatmap,
    },
    mode: "all",
  });

  return form;
};

export default useForm;

export const useNameSegments = () => {
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

export const useAgePeriods = () => {
  const [agePeriodsOptions, setNameSegmentOptions] = useState<
    MultiSelectOption[]
  >([]);

  const { agePeriods, isAgePeriodsLoading } = useRfm();

  const handleOpenAgePeriods = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const apiOptions = agePeriods!.map((agePeriod) => ({
        label: `${agePeriod}`,
        value: String(agePeriod || ""),
      }));
      setNameSegmentOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке возраста:", error);
    }
  };

  return { agePeriodsOptions, handleOpenAgePeriods, isAgePeriodsLoading };
};
