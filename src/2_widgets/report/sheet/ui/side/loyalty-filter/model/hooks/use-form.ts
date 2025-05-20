import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

export const useForm = () => {
  const {
    ageEnd,
    ageStart,
    cardNumber,
    groupAge,
    guidBonus,
    guidDiscount,
    isLoyal,
    sex,
  } = useFiltersStore((state) => state.filters.loyal);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      age:
        ageStart === undefined && ageEnd === undefined
          ? defaultValues.age
          : [ageStart || 0, ageEnd || 100],
      cardNumber: cardNumber || defaultValues.cardNumber,
      groupAge: groupAge || defaultValues.groupAge,
      guidBonus: guidBonus || defaultValues.guidBonus,
      guidDiscount: guidDiscount || defaultValues.guidDiscount,
      isLoyal: isLoyal || defaultValues.isLoyal,
      sex: sex || defaultValues.sex,
    },
    mode: "all",
  });

  return form;
};
