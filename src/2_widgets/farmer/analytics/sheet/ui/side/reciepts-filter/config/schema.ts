import { z } from "zod";

export const schema = z.object({
  paymentClass: z.enum(["Безналичный", "Наличный"]).nullable(),
  type: z.enum(["Продажа", "Возврат"]).nullable(),
});
