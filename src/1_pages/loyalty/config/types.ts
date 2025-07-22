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

export interface LoyalCard2Response {
  uniqueCardNumber: 269510;
  uniqueCheckLoyal: 776779;
  uniqueCheck: 1404511;
  appLoyalPercent: 55.3;
  bonusWriteOff: 15709236;
  bonusAccrual: 10944168;
  frequencySalesLoyal: 2.9;
  proceedsAdditionalLoyal: 318189279;
  proceedsAdditionalLoyalPercent: 36.7;
  proceeds: 867600179;
  proceedsLoyal: 549410899;
}

export interface AgeGroupsGraphResponse {
  xAxis: string[];
  legend: string[];
  series: GraphResponse[];
}
export interface AgeCircleGraphResponse {
  circle: {
    value: number;
    name: string;
  }[];
  center: {
    total: number;
  }[];
}
