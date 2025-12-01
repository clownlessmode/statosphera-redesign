import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";

export const useForm = () => {
  const {
    idProduct,
    idGroupProduct,
    oneLvlGroupProduct,
    twoLvlGroupProduct,
    threeLvlGroupProduct,
    dishMeasureUnit,
  } = useFiltersStore((state) => state.filters.product);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idProduct: processArrayableValue(idProduct, defaultValues.idProduct),
      idGroupProduct: processArrayableValue(
        idGroupProduct,
        defaultValues.idGroupProduct,
      ),
      oneLvlGroupProduct: processArrayableValue(
        oneLvlGroupProduct,
        defaultValues.oneLvlGroupProduct,
      ),
      twoLvlGroupProduct: processArrayableValue(
        twoLvlGroupProduct,
        defaultValues.twoLvlGroupProduct,
      ),
      threeLvlGroupProduct: processArrayableValue(
        threeLvlGroupProduct,
        defaultValues.threeLvlGroupProduct,
      ),
      dishMeasureUnit: processArrayableValue(
        dishMeasureUnit,
        defaultValues.dishMeasureUnit,
      ),
    },
    mode: "onSubmit",
  });

  return form;
};
