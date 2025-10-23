export interface RequestDto {
  period: string;
  rfmList: number[];
  sex: string[];
  age: string[];
}

export interface NameSegmentResponse {
  rfmCode: number;
  rfmName: string;
}

interface AllGistogram {
  categories: string[];
  series: {
    name: string;
    value: number[];
  }[];
}

export interface AllGistogramResponse {
  allDataCount: AllGistogram;
  allDataProceed: AllGistogram;
  allDataProfit: AllGistogram;
  actionDataCount: AllGistogram;
  actionDataProceed: AllGistogram;
  actionDataProfit: AllGistogram;
  imDataCount: AllGistogram;
  imDataProceed: AllGistogram;
  imDataProfit: AllGistogram;
  avgDataCount: AllGistogram;
  avgDataProceed: AllGistogram;
  avgDataProfit: AllGistogram;
  avgDayCountPerClient: AllGistogram;
  countUniqClient: AllGistogram;
  countInDanger: AllGistogram;
}

export interface DrilldownRfmDayWeekTimeResponse {
  data: [string | number, number, string, string | null][][];
  text?: string[];
}

export interface TreemapTopGroupProductResponse {
  childrenProceed: {
    name: string;
    value: number;
    children?: {
      name: string;
      value: number;
    }[];
  }[];
  childrenProfit: {
    name: string;
    value: number;
    children: {
      name: string;
      value: number;
    }[];
  }[];
}

export interface TreemapTopBonusesResponse {
  childrenProceed: {
    name: string;
    value: number;
    children: {
      name: string;
      value: number;
    }[];
  }[];
  childrenProfit: {
    name: string;
    value: number;
    children: {
      name: string;
      value: number;
    }[];
  }[];
}

export interface RadarCountUniqGroupAndProductResponse {
  CountUniqGroup: {
    legend: {
      data: string[];
    };
    radar: {
      indicator: {
        name: string;
      }[];
    };
    series: {
      type: string;
      data: {
        value: number[];
        name: string;
      }[];
    }[];
  };
  CountUniqProduct: {
    legend: {
      data: string[];
    };
    radar: {
      indicator: {
        name: string;
      }[];
    };
    series: {
      type: string;
      data: {
        value: number[];
        name: string;
      }[];
    }[];
  };
}

export interface TreemapRfmOrderDeliveryResponse {
  childrenProceed: {
    name: string;
    value: number;
    children: {
      name: string;
      value: number;
    }[];
  }[];
}

export interface DrilldownRfmRegionCityStoreResponse {
  data: [string | number, number, string, string | null][][];
}

export interface SankeyMigrationClientPerSegmentsResponse {
  nodes: {
    name: string;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
}

export interface HeatmapMigrationPerSegmentResponse {
  xAxis: string[];
  yAxis: string[];
  matrixData: number[][];
}

export interface MainDataSegmentResponse {
  segmentCode: number;
  segment: string;
  period: string;
  countClient: number;
  proceedAll: number;
  countNightClient: number;
  proceedNightClient: number;
  profitNightClient: number;
  countMMClient: number;
  profitMMClient: number;
  proceedMMClient: number;
  proceedAvgCheck: number;
  countClientInWarningZone: number;
  avgPeriodPerSales: number;
  mainCountCheckPerClient: string;
  mainCountCheckPerClientPercent: number;
  mainCountStorePerClient: string;
  mainCountStorePerClientPercent: number;
  mainLifeAccoutPeriod: string;
  mainLifeAccoutPeriodPercent: number;
  mainGender: string;
  mainGenderPercent: number;
  mainLifeClientPeriod: string;
  mainLifeClientPercent: number;
  mainBonus: string;
  proceedPercentMainBonus: number;
  proceedIM: number;
  proceedPercentIM: number;
  mainOrderMethod: string;
  proceedPersentIMMainOrderMethod: number;
  mainOrderDelivery: string;
  proceedPersentIMMainOrderDelivery: number;
  mainGroupProduct: string;
  proceedPercentMainGroupProduct: number;
  mainWeekDay: string;
  proseedPercentMainWeekDay: number;
  mainTimeDay: string;
  proseedPercentMainTimeDay: number;
  mainRegion: string;
  proseedPercentMainRegion: number;
  mainCity: string;
  proseedPercentMainCity: number;
  mainStore: string;
  proseedPercentMainStore: number;
}

interface AllDataCount {
  name: string;
  count: number;
  percent: number;
}

interface AllDataProceed {
  name: string;
  proceed: number;
  percent: number;
}

export interface MainAllDataSegmentResponse {
  segmentCode: 111;
  checkZones: AllDataCount[];
  storeZones: AllDataCount[];
  accountAges: AllDataCount[];
  genders: AllDataCount[];
  clientAges: AllDataCount[];
  bonuses: AllDataCount[];
  orderMethods: AllDataProceed[];
  deliveryMethods: AllDataProceed[];
  productGroups: AllDataProceed[];
  weekDays: AllDataProceed[];
  timeDays: AllDataProceed[];
  stores: AllDataProceed[];
  regions: AllDataProceed[];
  cities: AllDataProceed[];
}

export interface SeventeenCalculationResponse {
  firstSegment: MainDataSegmentResponse[];
  secondSegment: MainDataSegmentResponse[];
}
