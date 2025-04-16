// schema.ts
import { z } from "zod";

export const schema = z.object({
  isIm: z.boolean().nullable(),
  imTypeOrder: z.enum(["Мобилка", "Сайт", "all"]),
  imDeliveryMethod: z.enum(["Курьер", "Самовывоз", "all"]),
  imPaymentMethod: z.enum(["Онлайн", "Офлайн", "Картой курьера", "all"]),
  imStatusOrder: z
    .array(
      z.enum([
        "Завершен",
        "Отменен_клиентом",
        "Отменен",
        "Сборка",
        "Собран",
        "Принят",
        "Создан",
      ])
    )
    .default([]),
  imReceiveInterval: z.array(z.string()).default([]),
  imPromo: z.array(z.string()).default([]),
});
