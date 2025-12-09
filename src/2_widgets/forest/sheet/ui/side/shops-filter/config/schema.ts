// schema.ts
import { z } from "zod";

export const schema = z.object({
  idStore: z.array(z.string()),
  idCity: z.array(z.string()),
  idRegion: z.array(z.string()),
});
