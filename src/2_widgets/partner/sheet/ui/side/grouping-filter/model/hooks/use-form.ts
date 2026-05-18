import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm as useHookForm } from "react-hook-form";

import {
  FormValues,
  PARTNER_DAYS,
  PARTNER_PRODUCT,
  PARTNER_STORE,
  schema,
} from "../../config";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";

const extractValues = (options: { value: string }[]) =>
  options.map((opt) => opt.value);

const matchGroupSection = (group: string[], options: { value: string }[]) =>
  group.filter((item) => extractValues(options).includes(item));

export const useForm = () => {
  const group = usePartnerFiltersStore((state) => state.group);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: matchGroupSection(group, PARTNER_DAYS),
      store: matchGroupSection(group, PARTNER_STORE),
      product: matchGroupSection(group, PARTNER_PRODUCT),
    },
    mode: "all",
  });

  useEffect(() => {
    form.reset({
      days: matchGroupSection(group, PARTNER_DAYS),
      store: matchGroupSection(group, PARTNER_STORE),
      product: matchGroupSection(group, PARTNER_PRODUCT),
    });
  }, [group, form]);

  return form;
};
