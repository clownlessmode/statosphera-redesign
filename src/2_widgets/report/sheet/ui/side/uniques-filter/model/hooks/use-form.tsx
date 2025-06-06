import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";

export const useForm = () => {
  const uniques = useFiltersStore((state) => state.uniques);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      proceeds: uniques || defaultValues.proceeds,
    },
    mode: "all",
  });
  return form;
};
