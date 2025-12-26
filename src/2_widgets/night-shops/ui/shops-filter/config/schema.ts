// schema.ts
import {
  ageGroupSchema,
  frsChannelSchema,
} from "@pages/sales-dynamics/model/filters-store";
import { z } from "zod";

export const schema = z.object({
  idStore: z.array(z.number()),
  idCity: z.array(z.number()),
  idRegion: z.array(z.number()),
  idManager: z.array(z.number()),
  storeCondition: z.array(z.string()),
  ageGroup: z.array(ageGroupSchema),
  idLegalEntity: z.array(z.number()),
  channel: z.array(frsChannelSchema),
  district: z.array(z.number()),
});
