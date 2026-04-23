import { z } from "zod";

export const schema = z.object({
  geo: z.array(z.string()),
  store: z.array(z.string()),
});
