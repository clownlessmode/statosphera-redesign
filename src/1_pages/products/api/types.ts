export type ProductResponse = {
    idProduct: string[];
    productCode: string;
    productName: string;
    nameImProducts: string;
    idSubSubGroups: string[];
    subSubGroups: string;
    idSubGroups: string[];
    subGroups: string;
    idGroupsMain: string[];
    groupsMain: string;
    idGroupsEconomist: string[];
    groupsEconomist: string;
    idTypeProducts: string[];
    typeProducts: string;
    idSeasonalityProducts: string[];
    seasonalityProducts: string;
    idSubdivisionProducts: string[];
    subDivisionProducts: string;
    idTeamProducts: string[];
    teamProducts: string;
    idDirectionProducts: string[];
    directionProducts: string;
    ppProducts: boolean;
    isIm: boolean;
    article: string;
    ed: string;
    path: string;
    extension: string;
    idManagerAuto: string[];
    managerAuto: string;
    idGroupsFranchise: string[];
    groupsFranchise: string;
  }

export type ProductPagination = {
    limit: number
    offset: number
    filter: boolean
}

export interface ProductFilter {
  groupFranchise?: number[];
  ppProducts?: boolean | null;
  isImProducts?: boolean | null;
  subDivisionProducts?: number[];
  subGroups?: number[];
  subSubGroups?: number[];
  typeProducts?: number[];
  teamProducts?: number[];
  directionProducts?: number[];
  groupsEconomist?: number[];
  idGroupMain?: number[];
  idProduct?: number[];
  seasonalityProducts?: number[];
  managerAuto?: number[];
}

export interface ProductRequestDto {
  filters?: ProductFilter;
  pagination: ProductPagination;
}
