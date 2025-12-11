import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";

export const useForm = () => {
  const {
    idGroupMain,
    idProduct,
    seasonalityProducts,
    subGroups,
    subSubGroups,
  } = useFiltersStore((state) => state.filters.product);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idGroupMain: processArrayableValue(
        idGroupMain,
        defaultValues.idGroupMain,
      ),
      idProduct: processArrayableValue(idProduct, defaultValues.idProduct),
      seasonalityProducts: processArrayableValue(
        seasonalityProducts,
        defaultValues.seasonalityProducts,
      ),
      subGroups: processArrayableValue(subGroups, defaultValues.subGroups),
      subSubGroups: processArrayableValue(
        subSubGroups,
        defaultValues.subSubGroups,
      ),
    },
    mode: "onSubmit",
  });

  return form;
};
