import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "../config/schema";
import { defaultValues } from "../config/default";
import { useForm as useHookForm } from "react-hook-form";
import { FormValues } from "../config/types";
import { useNightStoresFiltersStore } from "@widgets/night-shops/model/filters-store";
import {
  AGE_GROUP,
  FRS_CHANNEL,
} from "@pages/sales-dynamics/model/filters-store";

export const useForm = () => {
  const {
    ageGroup,
    channel,
    district,
    idCity,
    idLegalEntity,
    idManager,
    idRegion,
    idStore,
    storeCondition,
  } = useNightStoresFiltersStore((state) => state.filters.store);
  const form = useHookForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ageGroup: (ageGroup as AGE_GROUP[]) || defaultValues.ageGroup,
      channel: (channel as FRS_CHANNEL[]) || defaultValues.channel,
      district: district || defaultValues.district,
      idCity: idCity || defaultValues.idCity,
      idLegalEntity: idLegalEntity || defaultValues.idLegalEntity,
      idManager: idManager || defaultValues.idManager,
      idRegion: idRegion || defaultValues.idRegion,
      idStore: idStore || defaultValues.idStore,
      storeCondition: storeCondition || defaultValues.storeCondition,
    },
    mode: "all",
  });

  return form;
};
