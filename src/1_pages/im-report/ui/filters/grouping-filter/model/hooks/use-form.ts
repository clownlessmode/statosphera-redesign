import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import { FormValues, schema, DAYS } from "../../config";
import { useLoyaltyFiltersStore } from "../../../filters-store";

export const useForm = () => {
  const selectedGroupings = useLoyaltyFiltersStore((state) => state.groups);

  const extractValues = (options: { value: string }[]) =>
    options.map((opt) => opt.value);

  const match = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) || [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: match(extractValues(DAYS)),
    },
    mode: "all",
  });

  return form;
};
