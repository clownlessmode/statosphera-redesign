import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { useEffect } from "react";
import {
  storesFilterSchema,
  StoresFilterFormValues,
  defaultValues,
} from "../../config";
import { useStoresFiltersStore } from "../stores-filters-store";

export const useForm = () => {
  const form = useReactHookForm<StoresFilterFormValues>({
    resolver: zodResolver(storesFilterSchema),
    defaultValues,
  });

  const { filters } = useStoresFiltersStore();

  // Синхронизация формы с store при изменении фильтров
  useEffect(() => {
    form.reset({
      idStore: filters.idStore,
      idCity: filters.idCity.map(String),
      idRegion: filters.idRegion.map(String),
      idManager: filters.idManager.map(String),
      ageGroup: filters.ageGroup,
      channel: filters.channel,
      storeCondition: filters.storeCondition,
      nightStore: filters.nightStore,
      shopOnAuto: filters.shopOnAuto,
      deliveryIm: filters.deliveryIm,
      walkingDelivery: filters.walkingDelivery,
      grill: filters.grill,
      dopeki: filters.dopeki,
      bakehouse: filters.bakehouse,
      brazier: filters.brazier,
      camera: filters.camera,
      coffee: filters.coffee,
      typeCoffee: filters.typeCoffee,
      ownershipCoffee: filters.ownershipCoffee,
      milkRefrigerator: filters.milkRefrigerator,
      pizzaCm: filters.pizzaCm,
      pizzaDaysSchedule: filters.pizzaDaysSchedule,
      pizzaHoursSchedule: filters.pizzaHoursSchedule,
      maxPower: filters.maxPower,
      format: filters.format,
      discountTime: filters.discountTime,
    });
  }, [filters, form]);

  return form;
};
