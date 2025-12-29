export interface RequestDto {
  filters: {
    store: {
      idStore: number[];
      idCity: number[];
      idRegion: number[];
      idManager: number[];
      storeCondition: string[];
      ageGroup: string[];
      idLegalEntity: number[];
      channel: string[];
      district: number[];
    };
  };
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  group?: "day" | "week" | "month" | "quarter" | "year";
}

export interface TopNightStoreResponse {
  topProceedsNight: {
    idStore: number;
    store: string;
    proceedsNight: number;
  }[];
  topProceedsDay: {
    idStore: number;
    store: string;
    proceedsDay: number;
  }[];
  topPercentageProceedsNight: {
    idStore: number;
    store: string;
    percentageProceedsNight: number;
  }[];
}

export interface TopNomenclatureResponse {
  topProceedsNight: {
    product: string;
    proceedsNight: number;
  }[];
  antiTopProceedsNight: {
    product: string;
    proceedsNight: number;
  }[];
  topProceedsDay: {
    product: string;
    proceedsDay: number;
  }[];
  antiTopProceedsDay: {
    product: string;
    proceedsDay: number;
  }[];
  antiTopPercentageProceedsNight: {
    product: string;
    percentageProceedsNight: number;
  }[];
  antiTopPercentageProceedsDay: {
    product: string;
    percentageProceedsDay: number;
  }[];
}

export interface TopSubgroupsResponse {
  topProceedsNight: {
    subGroups: string;
    proceedsNight: number;
  }[];
  antiTopProceedsNight: {
    subGroups: string;
    proceedsNight: number;
  }[];
  topProceedsDay: {
    subGroups: string;
    proceedsDay: number;
  }[];
  antiTopProceedsDay: {
    subGroups: string;
    proceedsDay: number;
  }[];
  topPercentageProceedsNight: {
    subGroups: string;
    percentageProceedsNight: number;
  }[];
  antiTopPercentageProceedsDay: {
    subGroups: string;
    percentageProceedsDay: number;
  }[];
}

export interface NightSalesWeekdayResponse {
  sortProceedsNight: {
    dayName: string;
    dayOfWeek: number;
    proceedsNight: number;
  }[];
  sortProceedsDay: {
    dayName: string;
    dayOfWeek: number;
    proceedsDay: number;
  }[];
  sortPercentageProceedsNight: {
    dayName: string;
    dayOfWeek: number;
    percentageProceedsNight: number;
  }[];
}

export interface NightSalesWeekdayNomenclatureResponse {
  data: {
    dayOfWeek: number;
    dayName: string;
    topProceedsNight: {
      product: string;
      proceedsNight: number;
    }[];
  }[];
}

export interface LineGraphResponse {
  graph: {
    name: string;
    data: [string, number][];
  }[];
}

export interface BarGraphResponse {
  data: {
    categories: string[];
    series: {
      name: string;
      value: number[];
    }[];
  };
}

export interface AllCardResponse {
  avgCheckNight: number;
  uniqueNightStore: number;
  uniqueCardNumber: number;
  proceedsNight: number;
  percentageProceedsNight: number;
  profitNight: number;
  percentageProfitNight: number;
  uniqueCity: number;
  countUniqueSubGroups: number;
  countUniqueProducts: number;
  countUniqueCheck: number;
  avgLengthCheck: number;
}

export interface HeatmapNightStoresResponse {
  proceeds: {
    xAxis: string[];
    yAxis: string[];
    min: number;
    max: number;
    matrixData: [number, number, number][];
    datesDict: {
      [key: string]: string;
    };
  };
  profit: {
    xAxis: string[];
    yAxis: string[];
    min: number;
    max: number;
    matrixData: [number, number, number][];
    datesDict: {
      [key: string]: string;
    };
  };
  uniqueCheck: {
    xAxis: string[];
    yAxis: string[];
    min: number;
    max: number;
    matrixData: [number, number, number][];
    datesDict: {
      [key: string]: string;
    };
  };
  avgCheck: {
    xAxis: string[];
    yAxis: string[];
    min: number;
    max: number;
    matrixData: [number, number, number][];
    datesDict: {
      [key: string]: string;
    };
  };
  uniqueCardNumber: {
    xAxis: string[];
    yAxis: string[];
    min: number;
    max: number;
    matrixData: [number, number, number][];
    datesDict: {
      [key: string]: string;
    };
  };
}

export interface PartnersFilterResponse {
  nameManager: string;
  idManager: number[];
}
export interface RegionsFilterResponse {
  storeRegion: string;
  regionId: number;
}
export interface CitiesFilterResponse {
  storeCity: string;
  cityId: number;
}
export interface ShopsFilterResponse {
  storeName: string;
  idStore: number[];
}
