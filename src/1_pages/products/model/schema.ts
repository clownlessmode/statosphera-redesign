// schema.ts
import { z } from "zod";

export const schema = z.object({
  groupFranchise: z.array(z.string()),
  ppProducts: z.boolean().nullable(),
  subDivisionProducts: z.array(z.string()),
  subGroups: z.array(z.string()),
  subSubGroups: z.array(z.string()),
  typeProducts: z.array(z.string()),
  teamProducts: z.array(z.string()),
  directionProducts: z.array(z.string()),
  groupsEconomist: z.array(z.string()),
  idGroupMain: z.array(z.string()),
  idProduct: z.array(z.string()),
  seasonalityProducts: z.array(z.string()),
  managerAuto: z.array(z.string()),
});
