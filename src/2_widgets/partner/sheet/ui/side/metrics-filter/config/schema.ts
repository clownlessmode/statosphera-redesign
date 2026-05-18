import { z } from "zod";

export const schema = z.object({
  values: z.array(z.string()),
});

export type FormValues = z.infer<typeof schema>;
