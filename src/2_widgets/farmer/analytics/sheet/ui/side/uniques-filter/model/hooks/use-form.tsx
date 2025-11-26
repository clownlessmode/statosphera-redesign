import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { useFiltersStore } from "@widgets/farmer/analytics/sheet/model/filters-store";
import { defaultValues, FormValues, schema } from "../../config";

export const useForm = () => {
  const uniques = useFiltersStore((state) => state.uniques);
  const updateUniques = useFiltersStore((state) => state.updateUniques);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      proceeds:
        uniques && uniques.length > 0 ? uniques : defaultValues.proceeds,
    },
    mode: "all",
  });

  useEffect(() => {
    const resolved =
      uniques && uniques.length > 0 ? uniques : defaultValues.proceeds;

    form.reset({ proceeds: resolved });
    updateUniques(resolved);
  }, []);

  return form;
};
