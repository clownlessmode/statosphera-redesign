import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm as useHookForm } from "react-hook-form";

import { FormValues, schema } from "../../config";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";

export const useForm = () => {
  const values = usePartnerFiltersStore((state) => state.values);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { values },
    mode: "all",
  });

  useEffect(() => {
    form.reset({ values });
  }, [values, form]);

  return form;
};
