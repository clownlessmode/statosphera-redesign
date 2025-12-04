import { z } from "zod";

export const schema = z.object({
  days: z.array(z.string()),
  geo: z.array(z.string()),
  product: z.array(z.string()),
});
