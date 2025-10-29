// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useLoyaltyFiltersStore } from "../../filters-store";

const useForm = () => {
  const { dateStart, dateEnd } = useLoyaltyFiltersStore(
    (state) => state.filterDate,
  );

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateStart: dateStart || defaultValues.dateStart,
      dateEnd: dateEnd || defaultValues.dateEnd,
    },
    mode: "all",
  });

  return form;
};

export default useForm;
