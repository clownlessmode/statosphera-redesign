// schema.ts
import { z } from "zod";

export const schema = z.object({
  ppProducts: z.boolean().nullable(),
  isIm: z.boolean().nullable(),
  groupsFranchise: z.any(),
  subGroups: z.any(),
  subSubGroups: z.any(),
  typeProducts: z.any(),
  teamProducts: z.any(),
  directionProducts: z.any(),
  groupsEconomist: z.any(),
  idGroupMain: z.any(),
  idProduct: z.any(),
  seasonalityProducts: z.any(),
  managerAuto: z.any(),
  subDivisionProducts: z.any(),
  groupsMain: z.any()
});
