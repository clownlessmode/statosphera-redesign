// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { FormValues, schema, defaultValues } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";

export const useForm = () => {
  const {
    ageGroup,
    channel,

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
      idCity: processArrayableValue(idCity, defaultValues.idCity),
      idLegalEntity: processArrayableValue(
        idLegalEntity,
        defaultValues.idLegalEntity,
      ),
      idManager: processArrayableValue(idManager, defaultValues.idManager),
      idRegion: processArrayableValue(idRegion, defaultValues.idRegion),
      idStore: processArrayableValue(idStore, defaultValues.idStore),
      storeCondition: storeCondition || defaultValues.storeCondition,
    },
    mode: "all",
  });

  return form;
};
