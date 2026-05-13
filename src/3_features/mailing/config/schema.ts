// schema.ts
import { z } from "zod";

export const addChannelSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.string(),
  id_store: z.number(),
  active: z.boolean(),
});

export const updateChannelSchema = addChannelSchema.omit({ id: true });
