export enum STORE_CHANNEL {
  FRS = "ФРС",
  INVEST = "Франшиза инвестиционная",
  RENT = "Франшиза в аренду",
  FOODTRUCK = "Фудтрак",
  MICROMARKET = "Микромаркет",
  WENDING = "Вендинг",
  SERVICES_STORE = "Служебный магазин ООО Волков",
  TRADING_NETWORK = "Отдел торговой сети",
}

export enum STORE_STATUS {
  OPEN = "Действующие",
  CLOSED = "ЗАКРЫТЫЕ",
}

export const STORE_STATUS_OPTIONS = [
  { label: "Открытый", value: STORE_STATUS.OPEN },
  { label: "Закрытый", value: STORE_STATUS.CLOSED },
];

export const STORE_CHANNEL_OPTIONS = [
  { label: "В аренду", value: STORE_CHANNEL.RENT },
  { label: "Инвестиционная", value: STORE_CHANNEL.INVEST },
  { label: "ФРС", value: STORE_CHANNEL.FRS },
  { label: "Фудтрак", value: STORE_CHANNEL.FOODTRUCK },
  { label: "Микромаркет", value: STORE_CHANNEL.MICROMARKET },
  { label: "Вендинг", value: STORE_CHANNEL.WENDING },
  {
    label: "Служебный магазин ООО Волков",
    value: STORE_CHANNEL.SERVICES_STORE,
  },
  { label: "Отдел торговой сети", value: STORE_CHANNEL.TRADING_NETWORK },
];
