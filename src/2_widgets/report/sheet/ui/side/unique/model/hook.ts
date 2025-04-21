// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

const useForm = () => {
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

export default useForm;
