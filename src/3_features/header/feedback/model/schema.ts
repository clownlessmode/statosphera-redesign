// schema.ts
import { z } from "zod";



export const schema = z.object({
  rank: z.string(),
  textMessage: z.string(),
  page: z.string(),
});
