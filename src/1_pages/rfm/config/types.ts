export interface RequestDto {
  period: "M-0" | "M-3" | "M-6" | "M-6 -> M-3" | "M-3 -> M0" | "M-6 -> M0";
  rfmList: number[];
}

export interface NameSegmentResponse {
  rfmCode: number;
  rfmName: string;
}

export interface FirstCalculationResponse {
  categories: string[];
  series: {
    name: string;
    value: number[];
  }[];
  text: string[];
}

type SecondCalculation = [string | number, number, string, string | null];

export type SecondCalculationResponse = SecondCalculation[][];

export interface ThirdCalculationResponse {
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

export interface FourthCalculationResponse {
  headers: string[];
  dataSourceList: {
    name: string;
    data: (string | number)[][];
  }[];
}

export interface FifthCalculationResponse {
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

export interface SixthCalculationResponse {
  legendData: string[];
  radarIndicator: {
    name: string;
    max: number;
  }[];
  seriesData: {
    type: string;
    radarIndex: 0;
    data: {
      name: string;
      value: number[];
    }[];
  }[];
}

export interface SeventhCalculationResponse {
  data: {
    name: string;
    children: {
      name: string;
      children: {
        name: string;
        value: number;
        count: number;
        profit: number;
      }[];
    }[];
  }[];
}

export interface EighthCalculationResponse {
  categories: string[];
  series: {
    name: string;
    value: number[];
  }[];
}

export interface NinthCalculationResponse {
  optionId: string;
  data: {
    name: string;
    value: number;
    groupId: string;
    childGroupId: string;
  }[];
}

export interface TenthCalculationResponse {
  segments: string[];
  series: {
    name: string;
    type: string;
    stack: string;
    data: number[];
  }[];
  legend: {
    data: string[];
    left: string;
  };
}

export interface EleventhCalculationResponse {
  categories: string[];
  series: {
    name: string;
    value: number[];
  }[];
}

export interface TwelfthCalculationResponse {
  segments: string[];
  series: {
    name: string;
    type: string;
    stack: string;
    data: number[];
  }[];
  legend: {
    data: string[];
    left: string;
  };
}

export interface ThirteenthCalculationResponse {
  segments: string[];
  series: {
    name: string;
    type: string;
    stack: string;
    data: number[];
  }[];
  legend: {
    data: string[];
    left: string;
  };
}

export interface FourteenCalculationResponse {
  data: {
    name: string;
  }[];
  links: {
    source: string;
    target: string;
    value: number;
  }[];
}

export interface FifteenCalculationResponse {
  xAxis: string[];
  yAxis: string[];
  matrixData: number[][];
}

export interface SixteenCalculationResponse {
  segmentCode: string;
  segment: string;
  period: string;
  countClient: number;
  proceedAll: number;
  countNightClient: number;
  countMMClient: number;
  proceedAvgCheck: number;
  countClientInWarningZone: number;
  avgPeriodPerSales: number;
  checkZones: {
    name: string;
    count: number;
    percent: number;
  }[];
  storeZones: {
    name: string;
    count: number;
    percent: number;
  }[];
  mainCountStorePerClient: string;
  accountAges: {
    name: string;
    count: number;
    percent: number;
  }[];
  genders: {
    name: string;
    count: number;
    percent: number;
  }[];
  clientAges: {
    name: string;
    count: number;
    percent: number;
  }[];
  bonuses: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  proceedIM: number;
  proceedPercentIM: number;
  orderMethods: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  deliveryMethods: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  productGroups: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  weekDays: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  timeDays: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  regions: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  cities: {
    name: string;
    proceed: number;
    percent: number;
  }[];
  stores: {
    name: string;
    proceed: number;
    percent: number;
  }[];
}
