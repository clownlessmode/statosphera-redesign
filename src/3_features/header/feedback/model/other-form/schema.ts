// schema.ts
import { z } from "zod";

export const schema = z.object({
  type: z.string(),
  message: z.string(),
  page: z.string(),
});
