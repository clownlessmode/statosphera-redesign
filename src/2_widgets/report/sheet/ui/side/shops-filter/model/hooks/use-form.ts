// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { FormValues, schema, defaultValues } from "../../config";

export const useForm = () => {
  const {
    ageGroup,
    channel,
    district,
    idCity,
    idLegalEntity,
    idManager,
    idRegion,
    idStore,
    storeCondition,
  } = useFiltersStore((state) => state.filters.store);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ageGroup: ageGroup || defaultValues.ageGroup,
      channel: channel || defaultValues.channel,
      district: district || defaultValues.district,
      idCity: idCity || defaultValues.idCity,
      idLegalEntity: idLegalEntity || defaultValues.idLegalEntity,
      idManager: idManager || defaultValues.idManager,
      idRegion: idRegion || defaultValues.idRegion,
      idStore: idStore || defaultValues.idStore,
      storeCondition: storeCondition || defaultValues.storeCondition,
    },
    mode: "all",
  });

  return form;
};
