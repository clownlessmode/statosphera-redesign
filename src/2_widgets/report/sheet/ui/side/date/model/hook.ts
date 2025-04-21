// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

const useForm = () => {
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

export default useForm;
