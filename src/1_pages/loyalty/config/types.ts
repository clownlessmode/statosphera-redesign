export interface AvarageCheckResponse {
  avgCheck: number;
  avgCheckLoyal: number;
  avgCheckNoLoyal: number | null;
  avgCheckDifferencePercent: number | null;
}

export interface RequestDto {
  store: {
    idStore: string[];
    idCity: string[];
    idRegion: string[];
    idManager: string[];
    storeCondition: string[];
    ageGroup: string[];
    idLegalEntity: string[];
    channel: string[];
    district: string[];
  };
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
}

export interface NoSales30DaysUserResponse {
  yes_30d: number;
  no_30d: number;
  total_users: number;
}

export interface BonusesResponse {
  bonusWriteOff: number;
  bonusAccrual: number;
  bonusWriteOffFromAccrualPercent: number;
}

export interface TopGroupResponse {
  subSubGroups: string;
  idSubSubGroups: number;
  countSales: number;
}

export interface TopProductRubResponse {
  product: string;
  id_product: number;
  countSales: number;
}
export interface TopStoreLoyalResponse {
  store: string;
  id_store: number;
  appLoyalPercent: number;
}
export interface GraphResponse {
  name: string;
  data: [string, number][];
}

export interface UniqueGraphResponse {
  graph: GraphResponse[];
}
export interface AppLoyalGraphResponse {
  graph: GraphResponse[];
}

export interface TopActionsResponse {
  discountType: string;
  discount: number;
}
