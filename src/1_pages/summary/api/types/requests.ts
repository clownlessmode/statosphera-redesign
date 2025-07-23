export interface BaseSummaryRequest {
  filters: {
    store: {
      idStore: number[];
      idCity: number[];
      idRegion: number[];
      idManager: number[];
      storeCondition: string[];
      ageGroup: string[];
      idLegalEntity: number[];
      channel: string[];
      district: string[];
    };
    product: {
      groupFranchise: number[];
      ppProducts: boolean | null;
      subDivisionProducts: number[];
      subGroups: number[];
      subSubGroups: number[];
      typeProducts: number[];
      teamProducts: number[];
      directionProducts: number[];
      groupsEconomist: number[];
      groupsMain: number[];
      idGroupMain: number[];
      idProduct: number[];
      seasonalityProducts: number[];
      managerAuto: number[];
    };
  };
  dateStart: string;
  dateEnd: string;
  idProduct: number[];
  role: boolean;
}

export interface SummaryCardRequest extends BaseSummaryRequest {
  limit: number;
  offset: number;
}

export interface SummaryTableRequest {
  dateStart: string;
  dateEnd: string;
  idProduct: number[];
  group: string[];
  sort?: {
    sort: "asc" | "desc";
    colId: string[];
  };
  role: boolean;
  limit: number;
  offset: number;
}

export interface SummaryGraphRequest {
  dateStart: string;
  dateEnd: string;
  idProduct: number[];
  group: string[];
  role: boolean;
}

export type SummaryTotalRequest = BaseSummaryRequest;
