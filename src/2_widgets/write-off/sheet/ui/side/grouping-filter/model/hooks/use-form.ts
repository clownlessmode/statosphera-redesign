import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import {
  GEO,
  SHOP,
  PRODUCT,
  LOYAL,
  PERSONAL,
  ONLINE,
  ID,
  FormValues,
  schema,
} from "../../config";
import { useFiltersStore } from "@widgets/write-off/sheet/model/filters-store";

export const useForm = ({
  daysOptions,
}: {
  tab: string;
  daysOptions: { value: string }[];
}) => {
  const filtersStore = useFiltersStore();
  const selectedGroupings = filtersStore.groups;

  const extractValues = (options: { value: string }[]) =>
    options.map((opt) => opt.value);

  const match = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) || [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: match(extractValues(daysOptions)), // <= сюда передаётся динамический список
      geo: match(extractValues(GEO)),
      store: match(extractValues(SHOP)),
      product: match(extractValues(PRODUCT)),
      loyal: match(extractValues(LOYAL)),
      personal: match(extractValues(PERSONAL)),
      online: match(extractValues(ONLINE)),
      id: match(extractValues(ID)),
    },
    mode: "all",
  });

  return form;
};
