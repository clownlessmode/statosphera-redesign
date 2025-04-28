// schema.ts
import { z } from "zod";

export const schema = z.object({
  indicators_and_groups: z.array(z.string()).min(1),
});
