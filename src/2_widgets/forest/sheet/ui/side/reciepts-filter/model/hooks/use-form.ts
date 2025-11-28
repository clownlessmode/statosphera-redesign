import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";

export const useForm = () => {
  const { checkNumber, shift, tabNumber, discountType, typePayment } =
    useFiltersStore((state) => state.filters.check);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      checkNumber: checkNumber || defaultValues.checkNumber,
      shift: shift || defaultValues.shift,
      tabNumber: tabNumber || defaultValues.tabNumber,
      discountType: discountType || defaultValues.discountType,
      typePayment: typePayment || defaultValues.typePayment,
    },
    mode: "all",
  });

  return form;
};
