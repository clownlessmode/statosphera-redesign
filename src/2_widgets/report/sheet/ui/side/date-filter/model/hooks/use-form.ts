import { zodResolver } from "@hookform/resolvers/zod";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";

export const useForm = () => {
  const { dateStart, dateEnd } = useFiltersStore((state) => state.filterDate);
  const { timeStart, timeEnd } = useFiltersStore((state) => state.filterTime);

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
