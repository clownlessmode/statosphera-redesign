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
  data: SummaryTableData;
  // totalRows: number;
}

export interface SummaryTableData {
  id_product: number;
  product_name: string;
  checkCount: number;
  relatedProceeds: number;
  relatedSold: number;
}

export interface SummaryTotalResponse {
  totalCheckCount: number;
  totalProceeds: number;
  avgCheck: number;
}

export interface SummaryTotalGraph {
  product_name: string;
  checkCount: number;
}

export interface SummaryNomenklaturaResponse {
  idProduct: number;
  productName: string;
}
