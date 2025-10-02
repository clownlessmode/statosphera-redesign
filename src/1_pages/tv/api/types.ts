export type GetNightShopsResponse = {
  antiTopstoreProceed: AntiTopstoreProceed;
  countStoreRegion: CountStoreRegion;
  lastMonthProceed: LastMonthProceed;
  monthProceed: MonthProceed;
  proceedPerMonth: ProceedPerMonth;
  topProductProfit: TopProductProfit;
  topStoreProceed: TopStoreProceed;
  yearsProceed: YearsProceed;
};

export type AntiTopstoreProceed = {
  idStore: number;
  storeName: string;
  proceeds: number;
}[];

export type CountStoreRegion = {
  center: {
    total: number;
  }[];
  circle: {
    value: number;
    name: string;
  }[];
}[];

export type LastMonthProceed = {
  dataCurrent: {
    label: string;
    proceedCurrent: number;
  };
  dataPast: {
    label: string;
    proceedCurrent: number;
  };
  dynamic: {
    isSalesGrowing: boolean;
    numbers: number;
  };
};

export type MonthProceed = {
  dataCurrent: {
    label: string;
    proceedCurrent: number;
  };
  dataPast: {
    label: string;
    proceedCurrent: number;
  };
  dynamic: {
    isSalesGrowing: boolean;
    numbers: number;
  };
};

export type ProceedPerMonth = {
  graph: {
    name: string;
    data: [string, number][];
  }[];
};

export type TopProductProfit = {
  profit: number;
  productName: string;
}[];

export type TopStoreProceed = {
  idStore: number;
  proceeds: number;
  storeName: string;
}[];

export type YearsProceed = {
  dataCurrent: {
    label: string;
    proceedCurrent: number;
  };
  dataPast: {
    label: string;
    proceedCurrent: number;
  };
  dynamic: {
    isSalesGrowing: boolean;
    numbers: number;
  };
};
