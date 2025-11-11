import { z } from "zod";

export const schema = z.object({
  age: z
    .tuple([z.number().min(0).max(100), z.number().min(0).max(100)])
    .default([0, 100]),
  frequency: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  totalPurchase: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  proceedPerCheck: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  avgCheckLen: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  avg: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  countBonus: z.object({
    from: z.number().nullable(),
    to: z.number().nullable(),
  }),
  ageAccount: z.object({
    from: z.object({
      years: z.number().nullable(),
      months: z.number().nullable(),
      days: z.number().nullable(),
    }),
    to: z.object({
      years: z.number().nullable(),
      months: z.number().nullable(),
      days: z.number().nullable(),
    }),
  }),
  sex: z.array(z.string()),
  guidDiscount: z.array(z.string()),
  guidBonus: z.array(z.string()),
  colorsDiscount: z.array(z.string()),
});
