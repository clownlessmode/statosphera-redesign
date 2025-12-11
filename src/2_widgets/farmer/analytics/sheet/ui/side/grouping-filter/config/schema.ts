import { z } from "zod";

export const schema = z.object({
  days: z.array(z.string()),
  geo: z.array(z.string()),
  store: z.array(z.string()),
  product: z.array(z.string()),
  loyal: z.array(z.string()),
  online: z.array(z.string()),
  id: z.array(z.string()),
});
