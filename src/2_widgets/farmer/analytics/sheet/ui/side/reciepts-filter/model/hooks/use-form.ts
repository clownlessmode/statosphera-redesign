import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";

export const useForm = () => {
  const { paymentClass, type } = useFiltersStore(
    (state) => state.filters.check,
  );

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentClass: paymentClass || defaultValues.paymentClass,
      type: (Array.isArray(type) ? type[0] : type) ?? defaultValues.type,
    },
    mode: "all",
  });

  return form;
};
