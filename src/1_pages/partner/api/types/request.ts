import type {
  PartnerGraphGranularity,
  PartnerGraphMetric,
  PartnerMetric,
  PartnerRowFocusKind,
  PartnerTableGroup,
} from "./partner-enums";

export type PartnerFilterDate = {
  dateStart: string;
  dateEnd: string;
};

export type PartnerFilter = {
  filterDate: PartnerFilterDate;
  idProduct?: string[];
  idStore?: number[];
  innProducer?: number[];
  groups?: number[];
  subgroups?: number[];
  subsubgroups?: number[];
  groupsFranchise?: number[];
  directionProducts?: number[];
};

export type PartnerSort = {
  sort: "asc" | "desc";
  colId: string;
};

export type TablePartnerRequest = {
  values: PartnerMetric[] | string[];
  filter: PartnerFilter;
  group: PartnerTableGroup[] | string[];
  pagination: {
    limit: number;
    offset: number;
  };
  sort?: PartnerSort;
};

export type TableTotalPartnerRequest = {
  values: PartnerMetric[] | string[];
  filter: PartnerFilter;
};

export type GraphPartnerRowFocus = {
  kind?: PartnerRowFocusKind | string;
  id?: string;
};

export type GraphPartnerRequest = {
  filter: PartnerFilter;
  group: PartnerGraphGranularity;
  value?: PartnerGraphMetric | string;
  rowFocus?: GraphPartnerRowFocus;
};
