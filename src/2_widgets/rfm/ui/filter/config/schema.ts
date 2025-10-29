// schema.ts
import { z } from "zod";

export const schema = z.object({
  rfmList: z.array(z.number()),
  agePeriods: z.array(z.string()),
  sex: z.array(z.string()),
  period: z.string(),
  sankey: z.string(),
  heatmap: z.string(),
});

export const schemaComparision = z.object({
  firstSegment: z.object({
    rfmCode: z.number(),
    age: z.array(z.string()),
    sex: z.array(z.string()),
    period: z.string(),
  }),
  secondSegment: z.object({
    rfmCode: z.number(),
    age: z.array(z.string()),
    sex: z.array(z.string()),
    period: z.string(),
  }),
});
