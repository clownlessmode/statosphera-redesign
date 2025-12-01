import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";

export const useForm = () => {
  const { discountType, typePayment } = useFiltersStore(
    (state) => state.filters.check,
  );

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      discountType: discountType || defaultValues.discountType,
      typePayment: typePayment || defaultValues.typePayment,
    },
    mode: "all",
  });

  return form;
};
