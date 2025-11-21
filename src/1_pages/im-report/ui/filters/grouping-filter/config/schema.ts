import { z } from "zod";

export const schema = z.object({
  days: z.array(z.string()),
});
