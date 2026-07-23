import { z } from "zod";

export const editUserStoresSchema = z.object({
  id_store: z.array(z.number()),
});
