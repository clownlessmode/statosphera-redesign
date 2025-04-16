// default.ts

import { FormValues } from "./types";

export const defaultValues: FormValues = {
  isIm: null,
  imTypeOrder: "all",
  imDeliveryMethod: "all",
  imPaymentMethod: "all",
  imStatusOrder: [
    "Завершен",
    "Отменен_клиентом",
    "Отменен",
    "Сборка",
    "Собран",
    "Принят",
    "Создан",
  ],
  imReceiveInterval: [],
  imPromo: [],
};
