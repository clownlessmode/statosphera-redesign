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
  groups?: string[];
  exportFile?: boolean;
}
export interface getMainCardsRO {
  im_proceeds: {
    title: string;
    value: number;
  };
  online_percentage: {
    title: string;
    value: number;
  };
  total_orders: {
    title: string;
    value: number;
  };
  cancellation_percentage: {
    title: string;
    value: number;
  };
  closed_orders: {
    title: string;
    value: number;
  };
}

export interface getOrdinariesCardsRO {
  total_orders: {
    title: string;
    value: number;
  };
  completed_orders: {
    title: string;
    value: number;
  };
  cancellation_percentage: {
    title: string;
    value: number;
  };
}

export interface getPickupCardsRO {
  total_orders: {
    title: string;
    value: number;
  };
  completed_orders: {
    title: string;
    value: number;
  };
  cancellation_percentage: {
    title: string;
    value: number;
  };
}

export interface getOrderProcessingGraphRO {
  title: string;
  data: [string, number][];
}

export interface getProceedsGraphRO {
  title?: string;
  name?: string;
  data: [string, number][];
}

export interface getChannelsGraphRO {
  title: string;
  data: {
    count_orders: number;
    channel: string;
  }[];
}

export interface getChannelsAgeGraphRO {
  title: string;
  data: {
    channel: string;
    age_group: string;
    proceeds: number;
  }[];
}

export interface getStoreOrdinaryTableRO {
  top: {
    title: string;
    topStores: {
      id_store: number;
      store_name: string;
      count_orders: number;
    }[];
  };
  worst: {
    title: string;
    bottomStores: {
      id_store: number;
      store_name: string;
      count_orders: number;
    }[];
  };
}

export interface getStorePickupTableRO {
  top: {
    title: string;
    topStores: {
      id_store: number;
      store_name: string;
      count_orders: number;
    }[];
  };
  worst: {
    title: string;
    bottomStores: {
      id_store: number;
      store_name: string;
      count_orders: number;
    }[];
  };
}

export interface getTopNomenclatureRO {
  title: string;
  data: {
    id_product: number;
    product_name: string;
    count_sales: number;
    proceeds: number;
  }[];
}

export interface getPenetrationOfflineRO {
  title: string;
  data: {
    id_product: number;
    product_name: string;
    proceeds_offline: number;
    proceeds_online: number;
    online_penetration_percentage: number;
  }[];
}

export interface getWorstOnlineOfflineRO {
  title: string;
  data: {
    sub_sub_group_name: string;
    count_sales_online: number;
    proceeds_online: number;
    online_penetration_percentage: number;
  }[];
}

export interface getAntitopOrderCancellRO {
  title: string;
  data: {
    id_store: number;
    store_name: string;
    total_orders: number;
    cancelled_orders: number;
    cancellation_percentage: number;
  }[];
}

export interface getTopPaymentMethodRO {
  title: string;
  data: {
    payment_method: string;
    count_orders: number;
  }[];
}

export interface getShareIMRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  proceeds_im: number;
  proceeds_offline: number;
  share_im_percentage: number;
}

export interface getAvgCheckRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  avg_check: number;
}

export interface getOrdersCountAllRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  onlineCountOrders: number;
  ordinaryCountOrders: number;
  pickupCountOrders: number;
  kuperCountOrders: number;
  completedOnlineCountOrders: number;
  completedOrdinaryCountOrders: number;
  completedPickupCountOrders: number;
  completedKuperCountOrders: number;
}

export interface getAvgCheckCountRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  avgItemsPerCheck: number;
}

export interface getDiscretenessRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  uniqueCustomers: number;
  totalOrders: number;
  discreteness: number;
}

export interface getPercentCancellationAllRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  cancellationPercentage: number;
}

export interface getPercentCancellationPickupRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  cancellationPercentage: number;
}

export interface getPercentCancellationOrdinaryRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  cancellationPercentage: number;
}

export interface getDeliveryImCountRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  deliveryImCount: number;
}

export interface getIMTableRO {
  day?: string;
  week?: string;
  month?: string;
  quarter?: string;
  year?: string;
  onlineCountOrders: number;
  onlineProceeds: number;
  ordinaryCountOrders: number;
  ordinaryProceeds: number;
  pickupCountOrders: number;
  pickupProceeds: number;
  kuperCountOrders: number;
  kuperProceeds: number;
  closedOnlineCountOrders: number;
  closedOrdinaryCountOrders: number;
  closedPickupCountOrders: number;
  closedKuperCountOrders: number;
  shareIm: number;
  totalOrders: number;
  avgCheck: number;
  avgItemsPerCheck: number;
  cancellationPercentageAll: number;
  cancellationPercentageOrdinary: number;
  cancellationPercentagePickup: number;
  deliveryImCount: number;
  uniqueCustomers: number;
  uniqueCompletedCustomers: number;
}
