export interface Store {
  ipNightStore: string[];
  storeName: string;
  idStore: number;
  idPartner: number[]; // UInt32[]
  partners: string[]; // список имён партнёров
  idCity: number; // UInt32
  city: string;
  idRegion: number; // UInt32
  region: string;
  idWarehouse: number; // UInt32
  idLegalEntityReal: number; // UInt32
  storeCondition: string; // напр. "Действующие"
  channel: string;
  ageGroup: string;
  district: string;
  inn: number | string; // UInt64 может быть строкой из-за размера
  legalEntity: string;
  emailStore: string;
  personnelResponsible: string;
  tradingArea: number; // Float32
  totalArea: number; // Float32
  sublease: number; // Float32
  startDate: string; // Date в формате "YYYY-MM-DD"
  endDate: string; // Date в формате "YYYY-MM-DD"
  openingHours: string;
  phoneStore: string;
  shopOnAuto: boolean;
  deliveryIm: boolean;
  walkingDelivery: boolean;
  nightStore: boolean;
  grill: boolean;
  dopeki: boolean;
  bakehouse: boolean;
  brazier: boolean;
  camera: boolean;
  coffee: boolean;
  typeCoffee: string;
  ownershipCoffee: string;
  milkRefrigerator: boolean;
  discountTime: string;
  pizzaCm: number;
  pizzaDaysSchedule: string;
  pizzaHoursSchedule: string[]; // массив строк
  emailStoreManager: string;
  phoneManager: string;
  certificatePbStart: string; // DateTime "YYYY-MM-DD HH:mm:ss"
  certificatePbEnd: string; // DateTime
  maxPower: number;
  telegramChatStore: string;
  operatingMode: string;
  dateUpgrade: string[]; // массив строк (дат)
  formatStore: string;
  longitude: number;
  latitude: number;
  polygonExtended: number[][]; // массив массивов чисел [latitude, longitude]
  polygonFast: number[][]; // аналогично (в данном примере пустой)
  polygonOther: number[][]; // массив массивов чисел
}

export interface Coordinates {
  idStore: number;
  storeName: string;
  channel: string;
  longitude: number;
  latitude: number;
  polygonExtended: number[][];
  polygonFast: number[][];
  polygonOther: number[][];
}
