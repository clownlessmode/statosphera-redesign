import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

export const useForm = () => {
  const {
    cashBox,
    checkNumber,
    containsBankQr,
    numberfield,
    paymentClass,
    shift,
    tabNumber,
    type,
  } = useFiltersStore((state) => state.filters.check);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      cashBox: cashBox || defaultValues.cashBox,
      checkNumber: checkNumber || defaultValues.checkNumber,
      containsBankQr: containsBankQr || defaultValues.containsBankQr,
      numberfield: numberfield || defaultValues.numberfield,
      paymentClass: paymentClass || defaultValues.paymentClass,
      shift: shift || defaultValues.shift,
      tabNumber: tabNumber || defaultValues.tabNumber,
      type: (Array.isArray(type) ? type[0] : type) ?? defaultValues.type,
    },
    mode: "all",
  });

  return form;
};
