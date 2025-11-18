import { z } from "zod";

export const schema = z.object({
  subGroups: z.array(z.string()),
  subSubGroups: z.array(z.string()),
  idGroupMain: z.array(z.string()),
  idProduct: z.array(z.string()),
});
