import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import { GEO, SHOP, FormValues, schema } from "../config";
import { useSalesDynamicsFiltersStore } from "@pages/sales-dynamics/model/filters-store";

export const useForm = () => {
  const selectedGroupings = useSalesDynamicsFiltersStore(
    (state) => state.groups,
  );

  const extractValues = (options: { value: string }[]) =>
    options.map((opt) => opt.value);

  const match = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) || [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      geo: match(extractValues(GEO)),
      store: match(extractValues(SHOP)),
    },
    mode: "all",
  });

  return form;
};
