export interface NpsGraphRequest {
  id_store: number[];
}

export interface NpsGraphResponse {
  date: string;
  nps_card: number;
}

export interface NpsSummaryResponse {
  // Структура для summary NPS
  total: number;
  positive: number;
  negative: number;
  neutral: number;
}

export interface NpsAllResponse {
  specific_store: Array<{
    nps_card: number;
  }>;
  all_stores: Array<{
    store: string;
    id_store: number;
    nps_card: number;
    nps_category: string;
  }>;
  region: Array<{
    region: string;
    id_region: string;
    nps_card: number;
  }>;
  city: Array<{
    city: string;
    id_city: string;
    nps_card: number;
  }>;
}
