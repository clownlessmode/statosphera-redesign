import { z } from "zod";

export const storesFilterSchema = z.object({
  idStore: z.array(z.number()).default([]),
  idCity: z.array(z.string()).default([]),
  idRegion: z.array(z.string()).default([]),
  idManager: z.array(z.string()).default([]),
  ageGroup: z.array(z.string()).default([]),
  channel: z.array(z.string()).default([]),
  storeCondition: z.array(z.string()).default([]),
  nightStore: z.boolean().nullable().optional(),
  shopOnAuto: z.boolean().nullable().optional(),
  deliveryIm: z.boolean().nullable().optional(),
  walkingDelivery: z.boolean().nullable().optional(),
  grill: z.boolean().nullable().optional(),
  dopeki: z.boolean().nullable().optional(),
  bakehouse: z.boolean().nullable().optional(),
  brazier: z.boolean().nullable().optional(),
  camera: z.boolean().nullable().optional(),
  coffee: z.boolean().nullable().optional(),
  typeCoffee: z.array(z.string()).default([]),
  ownershipCoffee: z.array(z.string()).default([]),
  milkRefrigerator: z.boolean().nullable().optional(),
  pizzaCm: z.array(z.string()).default([]),
  pizzaDaysSchedule: z.array(z.string()).default([]),
  pizzaHoursSchedule: z.array(z.string()).default([]),
  maxPower: z.array(z.string()).default([]),
  format: z.array(z.string()).default([]),
  discountTime: z.array(z.string()).default([]),
});

export type StoresFilterFormValues = z.infer<typeof storesFilterSchema>;
