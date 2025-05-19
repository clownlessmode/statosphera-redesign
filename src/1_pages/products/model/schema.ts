// schema.ts
import { z } from "zod";

export const schema = z.object({
  ppProducts: z.boolean().nullable(),
  isIm: z.boolean().nullable(),
  groupsFranchise: z.any(),
});