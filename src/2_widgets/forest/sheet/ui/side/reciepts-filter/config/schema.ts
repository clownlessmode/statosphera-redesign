import { z } from "zod";

export const schema = z.object({
  tabNumber: z.number().array(),
  shift: z.number().array(),
  checkNumber: z.number().array(),
  discountType: z.number().array(),
  typePayment: z.number().array(),
});
