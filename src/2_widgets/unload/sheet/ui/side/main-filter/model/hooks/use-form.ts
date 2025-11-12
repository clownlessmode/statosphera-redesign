import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useUnloadFilterStore } from "@widgets/unload/sheet/model/filters-store";

export const useForm = () => {
  const {
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    rfmList,
    period,
    audienceId,
  } = useUnloadFilterStore((state) => state.mainData);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      rfmList: rfmList || defaultValues.rfmList,
      period: period || defaultValues.period,
      dateStart: dateStart || defaultValues.dateStart,
      dateEnd: dateEnd || defaultValues.dateEnd,
      timeStart: timeStart || defaultValues.timeStart,
      timeEnd: timeEnd || defaultValues.timeEnd,
      audienceId: audienceId || defaultValues.audienceId,
    },
    mode: "all",
  });

  return form;
};
