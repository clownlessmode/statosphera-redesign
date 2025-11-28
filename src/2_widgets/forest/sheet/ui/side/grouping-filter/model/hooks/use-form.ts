import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import {
  GEO,
  PRODUCT,
  LOYAL,
  ONLINE,
  ID,
  FormValues,
  schema,
} from "../../config";
import { useFiltersStore } from "@widgets/forest/sheet/model/filters-store";

export const useForm = ({
  daysOptions,
}: {
  tab: string;
  daysOptions: { value: string }[];
}) => {
  const selectedGroupings = useFiltersStore((state) => state.groups);

  const extractValues = (options: { value: string }[]) =>
    options.map((opt) => opt.value);

  const match = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) || [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: match(extractValues(daysOptions)), // <= сюда передаётся динамический список
      geo: match(extractValues(GEO)),
      product: match(extractValues(PRODUCT)),
      loyal: match(extractValues(LOYAL)),
      online: match(extractValues(ONLINE)),
      id: match(extractValues(ID)),
    },
    mode: "all",
  });

  return form;
};
