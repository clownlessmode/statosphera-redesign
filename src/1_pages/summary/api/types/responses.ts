export interface SummaryCardResponse {
  id_product: number;
  product_name: string;
  checkCount: number;
  avgCheck: number;
  totalProceeds: number;
  selectedProceeds: number;
}

// Добавьте этот новый интерфейс
export interface SummaryComparisonCardsResponse {
  total: SummaryCardResponse[];
}

export interface SummaryTableResponse {
  tbl: SummaryTableData[];
  totalRows: number;
}

export type SummaryGraphResponse = Array<SummaryTotalGraph>;

export interface SummaryTableData {
  id_product: number;
  product_name: string;
  checkCount: number;
  proceeds: number;
  countSales: number;
  // Дополнительные поля для группировки/фильтрации
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  city?: string;
  region?: string;
  store?: string;
  channel?: string;
  ageGroup?: string;
  storeCondition?: string;
  legalEntity?: string;
  nameManager?: string;
  formatStore?: string;
  groupsFranchise?: string;
  group?: string;
  subGroups?: string;
  directionProducts?: string;
  subSubGroups?: string;
  typeProducts?: string;
  seasonalityProducts?: string;
  managerAuto?: string;
  groupsEconomist?: string;
}

export interface SummaryTotalResponse {
  totalCheckCount: number;
  totalProceeds: number;
  avgCheck: number;
}

export interface SummaryTotalGraph {
  id_product: number;
  product_name: string;
  checkCount: number;
  proceeds: number;
}

export interface SummaryNomenklaturaResponse {
  idProduct: number;
  productName: string;
}
