import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

export const useForm = () => {
  const {
    ageEnd,
    ageStart,
    guidBonus,
    guidDiscount,
    frequency,
    totalPurchase,
    proceedPerCheck,
    avgCheckLen,
    avg,
    countBonus,
    ageAccount,
    sex,
    colorsDiscount,
  } = useUnloadFilterStore((state) => state.filters.clients);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      age:
        ageStart === undefined && ageEnd === undefined
          ? defaultValues.age
          : [ageStart || 0, ageEnd || 100],
      frequency: frequency || defaultValues.frequency,
      totalPurchase: totalPurchase || defaultValues.totalPurchase,
      proceedPerCheck: proceedPerCheck || defaultValues.proceedPerCheck,
      avgCheckLen: avgCheckLen || defaultValues.avgCheckLen,
      avg: avg || defaultValues.avg,
      countBonus: countBonus || defaultValues.countBonus,
      ageAccount: ageAccount || defaultValues.ageAccount,
      sex: sex || defaultValues.sex,
      guidBonus: processArrayableValue(guidBonus, defaultValues.guidBonus),
      guidDiscount: processArrayableValue(
        guidDiscount,
        defaultValues.guidDiscount,
      ),
      colorsDiscount: colorsDiscount || defaultValues.colorsDiscount,
    },
    mode: "all",
  });

  return form;
};
