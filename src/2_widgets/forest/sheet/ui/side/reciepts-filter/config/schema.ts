import { z } from "zod";

export const schema = z.object({
  discountType: z.string().array(),
  typePayment: z.string().array(),
});
