// schema.ts
import { z } from "zod";

export const schema = z.object({
  rfmList: z.array(z.number()),
  period: z.string(),
  sankey: z.string(),
  heatmap: z.string(),
});
