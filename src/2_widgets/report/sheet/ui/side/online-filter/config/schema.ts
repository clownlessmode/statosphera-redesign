import { z } from "zod";

export const schema = z.object({
  isIm: z.boolean().nullable(),
  imTypeOrder: z.array(z.any()).default([]),
  imDeliveryMethod: z.array(z.any()).default([]),
  imPaymentMethod: z.array(z.any()).default([]),
  imStatusOrder: z.array(z.any()).default([]),
  imReceiveInterval: z.array(z.string()).default([]),
  imPromo: z.array(z.string()).default([]),
});
