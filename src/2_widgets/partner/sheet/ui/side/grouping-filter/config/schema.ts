import { z } from "zod";

export const schema = z.object({
  days: z.array(z.string()),
  store: z.array(z.string()),
  product: z.array(z.string()),
});

export type FormValues = z.infer<typeof schema>;
