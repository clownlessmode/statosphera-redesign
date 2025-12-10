// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues, schema, defaultValues } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";

export const useForm = () => {
  const { idCity, idRegion, idStore } = useFiltersStore(
    (state) => state.filters.store,
  );
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idCity: processArrayableValue(idCity, defaultValues.idCity),
      idRegion: processArrayableValue(idRegion, defaultValues.idRegion),
      idStore: processArrayableValue(idStore, defaultValues.idStore),
    },
    mode: "all",
  });

  return form;
};
