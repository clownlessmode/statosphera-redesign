import { z } from "zod";

export const schema = z.object({
  proceeds: z.array(z.string()),
  nightProceeds: z.array(z.string()),
});
