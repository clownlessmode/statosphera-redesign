import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../../config/schema";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "../../config/types";
import { defaultValues } from "../../config";

export const useForm = () => {
  const { idAccount } = useFiltersStore((state) => state.filters.account);

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      idAccount: idAccount || defaultValues.idAccount,
    },
    mode: "all",
  });

  return form;
};
