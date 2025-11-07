import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";
import { defaultValues, FormValues, schema } from "../../config";
import { useFiltersStore } from "@widgets/unload/sheet/model/filters-store";

export const useForm = () => {
  const { dateStart, dateEnd, rfmList } = useFiltersStore(
    (state) => state.mainData,
  );

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dateStart: dateStart || defaultValues.dateStart,
      dateEnd: dateEnd || defaultValues.dateEnd,
      rfmList: rfmList || defaultValues.rfmList,
    },
    mode: "all",
  });

  return form;
};
