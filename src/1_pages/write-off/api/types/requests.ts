// Request types for Write-Off API

export interface WriteOffGraphRequest {
  filters: {
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
    product: {
      groupFranchise: string[];
      ppProducts: boolean | null;
      isImProducts: boolean | null;
      subDivisionProducts: string[];
      subGroups: string[];
      subSubGroups: string[];
      typeProducts: string[];
      teamProducts: string[];
      directionProducts: string[];
      groupsEconomist: string[];
      idGroupMain: string[];
      idProduct: string[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
    writeOff: {
      article: string[];
      household: boolean | null;
    };
  };
  filterDate: {
    filterDate: {
      dateStart: string;
      dateEnd: string;
    };
  };
  role: boolean;
  group: string;
  value: string;
  type: string; // Должно быть "write-off" (с дефисом)
  household: boolean;
}

export interface WriteOffTableRequest {
  filters: {
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
    product: {
      groupFranchise: string[];
      ppProducts: boolean | null;
      isImProducts: boolean | null;
      subDivisionProducts: string[];
      subGroups: string[];
      subSubGroups: string[];
      typeProducts: string[];
      teamProducts: string[];
      directionProducts: string[];
      groupsEconomist: string[];
      idGroupMain: string[];
      idProduct: string[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
    check?: {
      tabNumber: number[];
      containsBankQr: boolean | null;
      paymentClass: "Безналичный" | "Наличный" | null;
      shift: number[];
      cashBox: number[];
      checkNumber: number[];
      numberfield: number[];
      type: ("Продажа" | "Возврат")[];
    };
    loyal?: {
      isLoyal: boolean | null;
      cardNumber: string[];
      sex: "M" | "Ж" | null;
      guidDiscount: string[];
      guidBonus: string[];
      ageStart: number | null;
      ageEnd: number | null;
      groupAge: string[];
    };
    onlineStore?: {
      isIm: boolean | null;
      imTypeOrder: string[];
      imDeliveryMethod: string[];
      imPaymentMethod: string[];
      imStatusOrder: string[];
      imReceiveInterval: string[];
      imPromo: string[];
    };
  };
  filterDate: {
    filterDate: {
      dateStart: string;
      dateEnd: string;
    };
  };
  limitOffset: {
    limit: number;
    offset: number;
  };
  role: boolean;
  group: string[];
  type: string;
  household: boolean;
}

export interface WriteOffTotalRequest {
  filters: {
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
    product: {
      groupFranchise: string[];
      ppProducts: boolean | null;
      isImProducts: boolean | null;
      subDivisionProducts: string[];
      subGroups: string[];
      subSubGroups: string[];
      typeProducts: string[];
      teamProducts: string[];
      directionProducts: string[];
      groupsEconomist: string[];
      idGroupMain: string[];
      idProduct: string[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
    check?: {
      tabNumber: number[];
      containsBankQr: boolean | null;
      paymentClass: "Безналичный" | "Наличный" | null;
      shift: number[];
      cashBox: number[];
      checkNumber: number[];
      numberfield: number[];
      type: ("Продажа" | "Возврат")[];
    };
    loyal?: {
      isLoyal: boolean | null;
      cardNumber: string[];
      sex: "M" | "Ж" | null;
      guidDiscount: string[];
      guidBonus: string[];
      ageStart: number | null;
      ageEnd: number | null;
      groupAge: string[];
    };
    onlineStore?: {
      isIm: boolean | null;
      imTypeOrder: string[];
      imDeliveryMethod: string[];
      imPaymentMethod: string[];
      imStatusOrder: string[];
      imReceiveInterval: string[];
      imPromo: string[];
    };
  };
  filterDate: {
    dateStart: string;
    dateEnd: string;
  };
  limit: number;
  offset: number;
  role: boolean;
  group: string[];
  type: string;
  household: boolean;
}

export interface WriteOffReasonsRequest {
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
      district: string[];
    };
    product: {
      groupFranchise: string[];
      ppProducts: boolean | null;
      isImProducts: boolean | null;
      subDivisionProducts: string[];
      subGroups: string[];
      subSubGroups: string[];
      typeProducts: string[];
      teamProducts: string[];
      directionProducts: string[];
      groupsEconomist: string[];
      idGroupMain: number[];
      idProduct: number[];
      seasonalityProducts: string[];
      managerAuto: string[];
    };
  };
  filterDate: {
    filterDate: {
      dateStart: string;
      dateEnd: string;
    };
  };
  role: boolean;
  storeId: (number | null)[];
  household: boolean;
}
