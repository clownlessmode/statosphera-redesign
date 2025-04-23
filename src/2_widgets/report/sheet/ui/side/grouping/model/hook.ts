import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";

import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "./types";
import { useFiltersStore, GROUPINGS } from "../../../../model/filters-store";

// все возможные значения по группам
const daysOptions = Object.values(GROUPINGS).filter((val) =>
  [
    GROUPINGS.YEAR,
    GROUPINGS.QUARTER,
    GROUPINGS.MONTH,
    GROUPINGS.WEEK,
    GROUPINGS.DAY,
    GROUPINGS.HOUR,
  ].includes(val)
);
const geoOptions = [GROUPINGS.CITY, GROUPINGS.REGION];
const storeOptions = [
  GROUPINGS.STORE,
  GROUPINGS.CHANNEL,
  GROUPINGS.AGE_GROUP,
  GROUPINGS.STORE_CONDITION,
  "legalEntity",
  "nameManager",
];
const productOptions = [
  GROUPINGS.GROUP_FRANCHISE,
  GROUPINGS.SUBDIVISION_PRODUCT,
  GROUPINGS.GROUP,
  GROUPINGS.TEAM_PRODUCT,
  GROUPINGS.SUBGROUPS,
  GROUPINGS.DIRECTION_PRODUCT,
  GROUPINGS.SUBSUBGROUPS,
  "typeProducts",
  GROUPINGS.PRODUCT,
  GROUPINGS.SEASONALITY_PRODUCT,
  GROUPINGS.MANAGER_AUTO,
  GROUPINGS.GROUP_ECONOMIST,
];

const loyalOptions = [
  GROUPINGS.CARD_NUMBER,
  GROUPINGS.IM_SEX_LOYAL,
  GROUPINGS.LOYAL_AGE,
];

const personalOptions = [GROUPINGS.CASH_BOX];

const onlineOptions = [
  GROUPINGS.IM_TYPE_ORDER,
  GROUPINGS.IM_DELIVERY_METHOD,
  GROUPINGS.IM_PAYMENT_METHOD,
  GROUPINGS.IM_STATUS_ORDER,
  GROUPINGS.IM_PROMO,
  GROUPINGS.IM_RECEIVE_INTERVAL,
];

const idOptions = [GROUPINGS.ID_CHECK, GROUPINGS.CASH_BOX];

const useForm = () => {
  const selectedGroupings = useFiltersStore((state) => state.groups);

  const matchValues = (options: string[]) =>
    selectedGroupings?.filter((item) => options.includes(item)) ?? [];

  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      days: matchValues(daysOptions),
      geo: matchValues(geoOptions),
      store: matchValues(storeOptions),
      product: matchValues(productOptions),
      loyal: matchValues(loyalOptions),
      personal: matchValues(personalOptions),
      online: matchValues(onlineOptions),
      id: matchValues(idOptions),
    },
    mode: "all",
  });

  return form;
};

export default useForm;
