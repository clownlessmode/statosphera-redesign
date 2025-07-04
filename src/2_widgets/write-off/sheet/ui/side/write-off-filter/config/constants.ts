export enum ARTICLE_WRITE_OFF {
  LOSSES = "ПОТЕРИ",
  EMPLOYEE_MEALS = "Питание сотрудников",
  TASTINGS = "Дегустации",
  CUSTOMER_GIFT = "Подарок покупателю (сервисная фишка)",
  THEFTS = "Кражи",
  MARKETING = "МАРКЕТИНГ (блогеры, фотосессии)",
  HOUSEHOLD_GOODS = "Хозяйственные товары",
}

export const HOUSEHOLD_GOODS_FILTER = [
  {
    label: "Да",
    value: true,
  },
  {
    label: "Нет",
    value: false,
  },
];

export const WRITE_OFF_ARTICLES = [
  { value: ARTICLE_WRITE_OFF.LOSSES, label: "Потери" },
  { value: ARTICLE_WRITE_OFF.EMPLOYEE_MEALS, label: "Питание сотрудников" },
  { value: ARTICLE_WRITE_OFF.TASTINGS, label: "Дегустации" },
  {
    value: ARTICLE_WRITE_OFF.CUSTOMER_GIFT,
    label: "Подарок покупателю (сервисная фишка)",
  },
  { value: ARTICLE_WRITE_OFF.THEFTS, label: "Кражи" },
  {
    value: ARTICLE_WRITE_OFF.MARKETING,
    label: "Маркетинг (блогеры, фотосессии)",
  },
  { value: ARTICLE_WRITE_OFF.HOUSEHOLD_GOODS, label: "Хозяйственные товары" },
];
