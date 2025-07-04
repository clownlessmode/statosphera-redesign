import StatusBadge from "@shared/ui/status-badge";
import {
  Phone,
  MapPin,
  Calendar,
  ShoppingCart,
  Coffee,
  Building,
} from "lucide-react";

export const storeSections = [
  {
    icon: <MapPin />,
    title: "Адрес и расположение",
    keys: [
      { key: "region", label: "Регион" },
      { key: "city", label: "Город" },
      { key: "district", label: "Район" },
      { key: "ipNightStore", label: "IP ночного магазина" },
      { key: "formatStore", label: "Формат магазина" },
    ],
  },
  {
    icon: <Phone />,
    title: "Контактная информация",
    keys: [
      { key: "phoneStore", label: "Телефон" },
      { key: "emailStore", label: "Почта" },
      { key: "personnelResponsible", label: "Ответственный сотрудник" },
      { key: "phoneManager", label: "Телефон менеджера" },
      { key: "emailStoreManager", label: "Почта менеджера" },
      { key: "telegramChatStore", label: "Телеграм чат" },
    ],
  },
  {
    icon: <Calendar />,
    title: "Даты и статус",
    keys: [
      {
        key: "storeCondition",
        label: "Статус",
        render: (val: string) => (
          <StatusBadge
            status={val}
            positiveValues={["действующие", "открытые", "ОТКРЫТЫЕ"]}
            negativeValues={["закрытые", "неактивные", "ЗАКРЫТЫЕ"]}
          />
        ),
      },
      { key: "ageGroup", label: "Возраст" },
      { key: "startDate", label: "Дата открытия", format: true },
      { key: "endDate", label: "Дата последней продажи", format: true },
      { key: "certificatePbStart", label: "Начало сертификата", format: true },
      { key: "certificatePbEnd", label: "Окончание сертификата", format: true },
      {
        key: "dateUpgrade",
        label: "Даты обновления",
        render: (val: string[]) => val?.join(", ") || "-",
      },
    ],
  },
  {
    icon: <ShoppingCart />,
    title: "Информация о кассах",
    keys: [
      { key: "countCachBox", label: "Количество касс" },
      { key: "countCachBoxKso", label: "Количество касс КСО" },
      { key: "countCachBoxGibrid", label: "Количество касс гибрид" },
      { key: "maxPower", label: "Максимальная мощность" },
      {
        key: "shopOnAuto",
        label: "Магазин на автозапуск",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
    ],
  },
  {
    icon: <Coffee />,
    title: "Дополнительные услуги",
    keys: [
      {
        key: "nightStore",
        label: "Ночной магазин",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "coffee",
        label: "Кофе",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      { key: "typeCoffee", label: "Тип кофе" },
      { key: "ownershipCoffee", label: "Владение кофе" },
      {
        key: "milkRefrigerator",
        label: "Холодильник для молока",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "deliveryIm",
        label: "Доставка",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "walkingDelivery",
        label: "Пешая доставка",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "grill",
        label: "Гриль",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "dopeki",
        label: "Допек",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "bakehouse",
        label: "Пекарня",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "brazier",
        label: "Мангал",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
      {
        key: "camera",
        label: "Камера",
        render: (v: boolean) => (v ? "Да" : "Нет"),
      },
    ],
  },
  {
    icon: <Building />,
    title: "Юридическая информация",
    keys: [
      { key: "legalEntity", label: "Юр. лицо" },
      { key: "idLegalEntityReal", label: "ID юр. лица" },
      { key: "sublease", label: "Субаренда" },
      { key: "inn", label: "ИНН" },
      { key: "idStore", label: "ID магазина" },
      {
        key: "idPartner",
        label: "ID партнёров",
        render: (val: number[]) => val?.join(", ") || "-",
      },
      {
        key: "partners",
        label: "Партнёры",
        render: (val: string[]) => (val?.length ? val.join(", ") : "-"),
      },
      { key: "idCity", label: "ID города" },
      { key: "idRegion", label: "ID региона" },
      { key: "idWarehouse", label: "ID склада" },
      { key: "channel", label: "Канал продаж" },
      { key: "tradingArea", label: "Торговая площадь" },
      { key: "totalArea", label: "Общая площадь" },
      { key: "openingHours", label: "Часы работы" },
      { key: "discountTime", label: "Время скидок" },
      { key: "pizzaCm", label: "Размер пиццы (см)" },
      { key: "pizzaDaysSchedule", label: "Дни расписания пиццы" },
      {
        key: "pizzaHoursSchedule",
        label: "Часы расписания пиццы",
        render: (val: string[]) => val?.join(", ") || "-",
      },
      { key: "operatingMode", label: "Режим работы" },
    ],
  },
];
