import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { processArrayableValue } from "@shared/lib/arrayable-string";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

export const useForm = () => {
  const { idGroupMain, idProduct, subGroups, subSubGroups } =
    useUnloadFilterStore((state) => state.filters.product);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idGroupMain: processArrayableValue(
        idGroupMain,
        defaultValues.idGroupMain,
      ),
      idProduct: processArrayableValue(idProduct, defaultValues.idProduct),
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
