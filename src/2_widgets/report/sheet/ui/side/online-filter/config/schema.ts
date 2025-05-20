import { z } from "zod";

export const schema = z.object({
  isIm: z.boolean().nullable(),
  imTypeOrder: z.any(),
  imDeliveryMethod: z.any(),
  imPaymentMethod: z.any(),
  imStatusOrder: z.array(z.any()).default([]),
  imReceiveInterval: z.array(z.string()).default([]),
  imPromo: z.array(z.string()).default([]),
});
