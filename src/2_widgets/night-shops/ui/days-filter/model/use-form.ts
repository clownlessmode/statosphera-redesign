// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues, schema, defaultValues } from "../config";
import { useNightStoresFiltersStore } from "@widgets/night-shops/model/filters-store";

const useForm = () => {
  const { dateStart, dateEnd } = useNightStoresFiltersStore(
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
