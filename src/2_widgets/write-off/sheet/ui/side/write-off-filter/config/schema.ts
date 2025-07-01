import { z } from "zod";
import { ARTICLE_WRITE_OFF } from "./constants";

export const writeOffFilterSchema = z.object({
  includeHouseholdGoods: z.boolean().nullable(),
  article: z.array(z.nativeEnum(ARTICLE_WRITE_OFF)),
});

export type WriteOffFilterForm = z.infer<typeof writeOffFilterSchema>;
