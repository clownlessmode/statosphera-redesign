export type PartnerTableRow = Record<string, string | number | boolean | null>;

export type TablePartnerResponse = {
  items: PartnerTableRow[];
  hasMore: boolean;
};

export type TableTotalPartnerResponse = PartnerTableRow | null;

export type GraphPartnerPoint = {
  period: string;
  currentValue: number;
  prevYearValue: number;
};

export type GraphPartnerResponse = GraphPartnerPoint[];
