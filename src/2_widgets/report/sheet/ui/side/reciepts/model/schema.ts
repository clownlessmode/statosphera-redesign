// schema.ts
import { z } from "zod";

export const schema = z.object({
  tabNumber: z.string().array(),
  containsBankQr: z.boolean().nullable(),
  paymentClass: z.enum(["Безналичный", "Наличный"]).nullable(),
  shift: z.number().array(),
  cashBox: z.number().array(),
  checkNumber: z.number().array(),
  numberfield: z.number().array(),
  type: z.enum(["Продажа", "Возврат"]).nullable(),
});
