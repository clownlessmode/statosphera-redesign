// schema.ts
import {
  ageGroupSchema,
  frsChannelSchema,
} from "@widgets/summary/sheet/model/filters-store";
import { z } from "zod";

export const schema = z.object({
  idStore: z.array(z.string()),
  idCity: z.array(z.string()),
  idRegion: z.array(z.string()),
  idManager: z.array(z.string()),
  storeCondition: z.array(z.string()),
  ageGroup: z.array(ageGroupSchema),
  idLegalEntity: z.array(z.string()),
  channel: z.array(frsChannelSchema),
  district: z.array(z.string()),
  sector: z.array(z.string()),
});
