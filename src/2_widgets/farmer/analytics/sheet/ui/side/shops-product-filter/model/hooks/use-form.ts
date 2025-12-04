// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { FormValues, schema, defaultValues } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";

export const useForm = () => {
  const { idCity, idRegion, idStore } = useFiltersStore(
    (state) => state.filters.store,
  );
  const { idProduct } = useFiltersStore((state) => state.filters.product);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idProduct: processArrayableValue(idProduct, defaultValues.idProduct),
      idCity: processArrayableValue(idCity, defaultValues.idCity),
      idRegion: processArrayableValue(idRegion, defaultValues.idRegion),
      idStore: processArrayableValue(idStore, defaultValues.idStore),
    },
    mode: "all",
  });

  return form;
};
