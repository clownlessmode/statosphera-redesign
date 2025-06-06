export type GetWeeklyRevenueResponse = {
  salesSevenDays: SalesSevenDays;
  curentMonth: YoYBlock;
  curentCheck: YoYBlock;
  curentAvgCheck: YoYBlock;
  curentMarzha: YoYBlock;
  curentMarkup: YoYBlock;
  curentWriteOff: YoYBlock;
  curentHouseHold: YoYBlock;
  curentAppLoyal: YoYBlock;
  currentCardIm: YoYBlock;
  bestCardIm: BestCardIm;
  salesHours: SalesHours;
  cardOneExe: CardOneExe;
  salesChannel: SalesChannel;
  salesStructure: SalesStructure;
  topWriteOff: TopWriteOff;
  leaderWriteOffs: LeaderWriteOffs;
  antitopLoyalApp: YoYBlock;
};

export type SalesSevenDays = {
  label: string;
  data: {
    day: string;
    proceeds: number;
    day_of_week: string;
  }[];
};

export type YoYBlock = {
  label: string;
  data:
    | {
        proceeds?: number;
        proceedsYoY?: number;
        proceedsYoYPercent?: number;
        check?: number;
        checkYoY?: number;
        checkYoYPercent?: number;
        avgCheck?: number;
        avgCheckYoY?: number;
        avgCheckYoYPercent?: number;
        marginPercent?: number;
        markupPercent?: number;
        profit?: number;
        writeOff?: number;
        writeOffYoY?: number;
        writeOffPercent?: number;
        writeOffYoYPercent?: number;
        householdGoods?: number;
        householdGoodsPercent?: number;
        householdGoodsYoY?: number;
        householdGoodsYoYPercent?: number;
        proceedsIm?: number;
        proceedsImYoY?: number;
        proceedsImYoYPercent?: number;
        appLoyalPercent?: number;
        checkLoyal?: number;
        negative?: boolean;
      }[]
    | null;
};

export type BestCardIm = {
  label: string;
  data: {
    idStore: number;
    storeName: string;
    proceedsIm: number;
  }[];
};

export type SalesHours = {
  label: string;
  data: {
    graph: {
      name: string;
      data: [number, number | null][];
    }[];
    card1: {
      title: string;
      proceedsTotal: string;
      weekAgoProceedsTotal: string;
      proceedsWoWPercent: string;
      negative: boolean;
    };
    card2: {
      title: string;
      proceedsTotal: string;
      weekAgoProceedsTotal: string;
      proceedsWoWPercent: string;
      negative: boolean;
    };
  };
};

export type CardOneExe = {
  label: string;
  data: {
    planProceedsForecastPercent: number;
    planCheckForecastPercent: number;
    planAvgCheckForecastPercent: number;
    planProceedsQcForecastPercent: number | null;
    planShareOfPaymentsQcForecastPercent: number | null;
  }[];
};

export type SalesChannel = {
  label: string;
  data: [
    {
      circle: {
        value: number;
        name: string;
      }[];
    },
    {
      center: {
        total: number;
      }[];
    },
  ];
};

export type SalesStructure = {
  label: string;
  data: {
    xAxis: string[];
    series: {
      name: string;
      data: number[];
    }[];
  };
};

export type TopWriteOff = {
  label: string;
  data: {
    yAxis: string[];
    series: {
      name: string;
      data: string[];
    }[];
  };
};

export type LeaderWriteOffs = {
  label: string;
  data: {
    idStore: number;
    storeName: string;
    writeOffPercent: number;
  }[];
};
