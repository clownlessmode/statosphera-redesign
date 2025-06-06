import { z } from "zod";
import { schema } from "./schema";

export type FormValues = z.infer<typeof schema>;

export interface Product {
  idProduct: number;
  productCode: string;
  productName: string | null;
  nameImProducts: string;
  idSubSubGroups: number;
  subSubGroups: string;
  idSubGroups: number;
  subGroups: string;
  idGroupsMain: number;
  groupsMain: string;
  idGroupsEconomist: number;
  groupsEconomist: string;
  idTypeProducts: number;
  typeProducts: string;
  idSeasonalityProducts: number;
  seasonalityProducts: string;
  idSubdivisionProducts: number;
  subDivisionProducts: string;
  idTeamProducts: number;
  teamProducts: string;
  idDirectionProducts: number;
  directionProducts: string;
  ppProducts: boolean | null;
  isImProducts: boolean | null;
  ed: string;
  idManagerAuto: number;
  managerAuto: string;
  idGroupsFranchise: number;
  groupsFranchise: string;
}


export interface UpdateProductPayload {
  groupFranchise: string[];
  ppProducts: boolean | null;
  isImProducts: boolean | null;
  subDivisionProducts: string[];
  subGroups: string[];
  subSubGroups: string[];
  typeProducts: string[];
  teamProducts: string[];
  directionProducts: string[];
  groupsEconomist: string[];
  idGroupMain: string[];
  idProduct: string[];
  seasonalityProducts: string[];
  managerAuto: string[];
}