import { z } from "zod";

export const schema = z.object({
  idProduct: z.array(z.string()),
  idGroupProduct: z.array(z.string()),
  oneLvlGroupProduct: z.array(z.string()),
  twoLvlGroupProduct: z.array(z.string()),
  threeLvlGroupProduct: z.array(z.string()),
  dishMeasureUnit: z.array(z.string()),
});
