import { zodResolver } from "@hookform/resolvers/zod";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";

export const useForm = () => {
  const filtersStore = useFiltersStore();
  const { dateStart, dateEnd } = filtersStore.filterDate;
  const { timeStart, timeEnd } = filtersStore.filterTime;

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateStart: dateStart || defaultValues.dateStart,
      dateEnd: dateEnd || defaultValues.dateEnd,
      timeStart: timeStart || defaultValues.timeStart,
      timeEnd: timeEnd || defaultValues.timeEnd,
    },
    mode: "all",
  });

  return form;
};
