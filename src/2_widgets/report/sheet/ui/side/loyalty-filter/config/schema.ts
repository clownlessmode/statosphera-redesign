import { z } from "zod";

export const schema = z.object({
  isLoyal: z.boolean().nullable(),
  cardNumber: z.array(z.string()),
  sex: z.union([z.literal("M"), z.literal("Ж"), z.null()]),
  guidDiscount: z.array(z.string()),
  guidBonus: z.array(z.string()),
  age: z
    .tuple([z.number().min(0).max(100), z.number().min(0).max(100)])
    .default([0, 100]),
  groupAge: z.array(z.string()),
});
