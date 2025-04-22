// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

const useForm = () => {
  const indicators = useFiltersStore((state) => state.indicators);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      proceeds: indicators || ["proceeds"],
    },
    mode: "all",
  });

  return form;
};

export default useForm;
