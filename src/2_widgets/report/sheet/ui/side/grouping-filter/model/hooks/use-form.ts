import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useHookForm } from "react-hook-form";

import {
  DAYS,
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
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";

const extractValues = (options: { value: string }[]) =>
  options.map((opt) => opt.value);

const daysOptions = extractValues(DAYS);
const geoOptions = extractValues(GEO);
const storeOptions = extractValues(SHOP);
const productOptions = extractValues(PRODUCT);
const loyalOptions = extractValues(LOYAL);
const personalOptions = extractValues(PERSONAL);
const onlineOptions = extractValues(ONLINE);
const idOptions = extractValues(ID);

export const useForm = () => {
  const selectedGroupings = useFiltersStore((state) => state.groups);

  const match = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) || [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: match(daysOptions),
      geo: match(geoOptions),
      store: match(storeOptions),
      product: match(productOptions),
      loyal: match(loyalOptions),
      personal: match(personalOptions),
      online: match(onlineOptions),
      id: match(idOptions),
    },
    mode: "all",
  });

  return form;
};
