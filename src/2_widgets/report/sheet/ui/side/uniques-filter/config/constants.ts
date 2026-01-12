import { COLUMN_KEY } from "@shared/constants/table-columns";
import { sortGroups } from "@shared/lib/sort-groups";
import { useFiltersStore } from "@widgets/report/sheet/model/filters-store";
import {
  CreditCard,
  Landmark,
  Map,
  Receipt,
  Share2,
  ShoppingBag,
} from "lucide-react";

const all_unique = [
  {
    id: "storeUniqueGroup",
    label: "Магазины",
    value: "storeUniqueGroup",
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_STORE,
        label: "Магазины",
        value: COLUMN_KEY.UNIQUE_STORE,
        tooltip:
          "Количество уникальных магазинов, где были совершены покупки за выбранный период. Например: если покупали в 5 разных магазинах сети, значение будет 5",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LM,
        label: "Магазины PM",
        value: COLUMN_KEY.UNIQUE_STORE_LM,
        tooltip:
          "Количество уникальных магазинов, где были покупки в предыдущем месяце. Позволяет сравнить активность торговых точек",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_LY,
        label: "Магазины PY",
        value: COLUMN_KEY.UNIQUE_STORE_LY,
        tooltip:
          "Количество уникальных магазинов за аналогичный период прошлого года. Помогает оценить развитие сети в годовом сравнении",
      },
    ],
  },
  {
    id: "channelUniqueGroup",
    label: "Каналы",
    value: "channelUniqueGroup",
    icon: Share2,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL,
        label: "Каналы",
        value: COLUMN_KEY.UNIQUE_CHANNEL,
        tooltip:
          "Количество уникальных каналов продаж. Показывает разнообразие точек контакта с клиентами",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_LM,
        label: "Каналы PM",
        value: COLUMN_KEY.UNIQUE_CHANNEL_LM,
        tooltip:
          "Количество каналов продаж, использованных в предыдущем месяце. Полезно для анализа изменений в дистрибуции",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_LY,
        label: "Каналы PY",
        value: COLUMN_KEY.UNIQUE_CHANNEL_LY,
        tooltip:
          "Количество каналов продаж за аналогичный период прошлого года. Покажет, добавились ли новые способы покупок",
      },
    ],
  },
  {
    id: "regionUniqueGroup",
    label: "Регионы",
    value: "regionUniqueGroup",
    icon: Map,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_REGION,
        label: "Регионы",
        value: COLUMN_KEY.UNIQUE_REGION,
        tooltip:
          "Количество регионов, где были зафиксированы покупки. Отражает географический охват сети",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LM,
        label: "Регионы PM",
        value: COLUMN_KEY.UNIQUE_REGION_LM,
        tooltip:
          "Количество регионов с покупками в предыдущем месяце. Показывает стабильность регионального присутствия",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_LY,
        label: "Регионы PY",
        value: COLUMN_KEY.UNIQUE_REGION_LY,
        tooltip:
          "Количество регионов с покупками год назад. Помогает оценить расширение или сокращение географии продаж",
      },
    ],
  },
  {
    id: "cityUniqueGroup",
    label: "Города",
    value: "cityUniqueGroup",
    icon: Landmark,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CITY,
        label: "Города",
        value: COLUMN_KEY.UNIQUE_CITY,
        tooltip:
          "Количество городов, где совершались покупки. Например: если покупали в Кемерово, Новосибирске и Анжеро-Судженске - значение будет 3",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LM,
        label: "Города PM",
        value: COLUMN_KEY.UNIQUE_CITY_LM,
        tooltip:
          "Количество городов с покупками в прошлом месяце. Показывает активность в населенных пунктах",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_LY,
        label: "Города PY",
        value: COLUMN_KEY.UNIQUE_CITY_LY,
        tooltip:
          "Количество городов с покупками год назад. Демонстрирует динамику городского покрытия",
      },
    ],
  },
  {
    id: "cardNumberUniqueGroup",
    label: "Номера карт",
    value: "cardNumberUniqueGroup",
    icon: CreditCard,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER,
        label: "Номера карт",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER,
        tooltip:
          "Количество уникальных карт лояльности, использованных при оплате. Показывает, сколько разных клиентов воспользовались своими картами",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
        label: "Номера карт PM",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LM,
        tooltip:
          "Количество уникальных карт лояльности, применённых в предыдущем месяце. Отражает активность постоянных клиентов",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
        label: "Номера карт PY",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_LY,
        tooltip:
          "Количество уникальных карт лояльности за аналогичный период прошлого года. Позволяет оценить рост базы лояльных клиентов",
      },
    ],
  },
  {
    id: "checkUniqueGroup",
    label: "Чек",
    value: "checkUniqueGroup",
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHECK,
        label: "Чек",
        value: COLUMN_KEY.UNIQUE_CHECK,
        tooltip:
          "Количество уникальных чеков. Основной показатель активности покупок",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_LM,
        label: "Чек PM",
        value: COLUMN_KEY.UNIQUE_CHECK_LM,
        tooltip:
          "Количество чеков в предыдущем месяце. Позволяет анализировать месячную динамику продаж",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_LY,
        label: "Чек PY",
        value: COLUMN_KEY.UNIQUE_CHECK_LY,
        tooltip:
          "Количество чеков за аналогичный период прошлого года. Основной показатель для годового сравнения",
      },
    ],
  },
];

const unique_night_shops = [
  {
    id: "storeUniqueNightStoreGroup",
    label: "Магазины",
    value: "storeUniqueNightStoreGroup",
    icon: ShoppingBag,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_STORE_NS,
        label: "Магазины",
        value: COLUMN_KEY.UNIQUE_STORE_NS,
        tooltip:
          "Количество уникальных магазинов, где были совершены покупки за выбранный период. Например: если покупали в 5 разных магазинах сети, значение будет 5",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_NS_LM,
        label: "Магазины PM",
        value: COLUMN_KEY.UNIQUE_STORE_NS_LM,
        tooltip:
          "Количество уникальных магазинов, где были покупки в предыдущем месяце. Позволяет сравнить активность торговых точек",
      },
      {
        id: COLUMN_KEY.UNIQUE_STORE_NS_LY,
        label: "Магазины PY",
        value: COLUMN_KEY.UNIQUE_STORE_NS_LY,
        tooltip:
          "Количество уникальных магазинов за аналогичный период прошлого года. Помогает оценить развитие сети в годовом сравнении",
      },
    ],
  },
  {
    id: "channelUniqueGroup",
    label: "Каналы",
    value: "channelUniqueGroup",
    icon: Share2,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_NS,
        label: "Каналы",
        value: COLUMN_KEY.UNIQUE_CHANNEL_NS,
        tooltip:
          "Количество уникальных каналов продаж. Показывает разнообразие точек контакта с клиентами",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_NS_LM,
        label: "Каналы PM",
        value: COLUMN_KEY.UNIQUE_CHANNEL_NS_LM,
        tooltip:
          "Количество каналов продаж, использованных в предыдущем месяце. Полезно для анализа изменений в дистрибуции",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHANNEL_NS_LY,
        label: "Каналы PY",
        value: COLUMN_KEY.UNIQUE_CHANNEL_NS_LY,
        tooltip:
          "Количество каналов продаж за аналогичный период прошлого года. Покажет, добавились ли новые способы покупок",
      },
    ],
  },
  {
    id: "regionUniqueGroup",
    label: "Регионы",
    value: "regionUniqueGroup",
    icon: Map,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_REGION_NS,
        label: "Регионы",
        value: COLUMN_KEY.UNIQUE_REGION_NS,
        tooltip:
          "Количество регионов, где были зафиксированы покупки. Отражает географический охват сети",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_NS_LM,
        label: "Регионы PM",
        value: COLUMN_KEY.UNIQUE_REGION_NS_LM,
        tooltip:
          "Количество регионов с покупками в предыдущем месяце. Показывает стабильность регионального присутствия",
      },
      {
        id: COLUMN_KEY.UNIQUE_REGION_NS_LY,
        label: "Регионы PY",
        value: COLUMN_KEY.UNIQUE_REGION_NS_LY,
        tooltip:
          "Количество регионов с покупками год назад. Помогает оценить расширение или сокращение географии продаж",
      },
    ],
  },
  {
    id: "cityUniqueGroup",
    label: "Города",
    value: "cityUniqueGroup",
    icon: Landmark,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CITY_NS,
        label: "Города",
        value: COLUMN_KEY.UNIQUE_CITY_NS,
        tooltip:
          "Количество городов, где совершались покупки. Например: если покупали в Кемерово, Новосибирске и Анжеро-Судженске - значение будет 3",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_NS_LM,
        label: "Города PM",
        value: COLUMN_KEY.UNIQUE_CITY_NS_LM,
        tooltip:
          "Количество городов с покупками в прошлом месяце. Показывает активность в населенных пунктах",
      },
      {
        id: COLUMN_KEY.UNIQUE_CITY_NS_LY,
        label: "Города PY",
        value: COLUMN_KEY.UNIQUE_CITY_NS_LY,
        tooltip:
          "Количество городов с покупками год назад. Демонстрирует динамику городского покрытия",
      },
    ],
  },
  {
    id: "cardNumberUniqueGroupDay",
    label: "Дневные номера карт",
    value: "cardNumberUniqueGroupDay",
    icon: CreditCard,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY,
        label: "Дневные номера карт",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY,
        tooltip:
          "Количество уникальных карт лояльности, использованных при оплате. Показывает, сколько разных клиентов воспользовались своими картами",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LM,
        label: "Дневные номера карт PM",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LM,
        tooltip:
          "Количество уникальных карт лояльности, применённых в предыдущем месяце. Отражает активность постоянных клиентов",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LY,
        label: "Дневные номера карт PY",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_DAY_LY,
        tooltip:
          "Количество уникальных карт лояльности за аналогичный период прошлого года. Позволяет оценить рост базы лояльных клиентов",
      },
    ],
  },
  {
    id: "cardNumberUniqueGroupNight",
    label: "Ночные номера карт",
    value: "cardNumberUniqueGroupNight",
    icon: CreditCard,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT,
        label: "Ночные номера карт",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT,
        tooltip:
          "Количество уникальных карт лояльности, использованных при оплате. Показывает, сколько разных клиентов воспользовались своими картами",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LM,
        label: "Ночные номера карт PM",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LM,
        tooltip:
          "Количество уникальных карт лояльности, применённых в предыдущем месяце. Отражает активность постоянных клиентов",
      },
      {
        id: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LY,
        label: "Ночные номера карт PY",
        value: COLUMN_KEY.UNIQUE_CARD_NUMBER_NIGHT_LY,
        tooltip:
          "Количество уникальных карт лояльности за аналогичный период прошлого года. Позволяет оценить рост базы лояльных клиентов",
      },
    ],
  },
  {
    id: "checkUniqueGroupDay",
    label: "Дневные чеки",
    value: "checkUniqueGroupDay",
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHECK_DAY,
        label: "Дневные чеки",
        value: COLUMN_KEY.UNIQUE_CHECK_DAY,
        tooltip:
          "Количество уникальных чеков. Основной показатель активности покупок",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_DAY_LM,
        label: "Дневные чеки PM",
        value: COLUMN_KEY.UNIQUE_CHECK_DAY_LM,
        tooltip:
          "Количество чеков в предыдущем месяце. Позволяет анализировать месячную динамику продаж",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_DAY_LY,
        label: "Дневные чеки PY",
        value: COLUMN_KEY.UNIQUE_CHECK_DAY_LY,
        tooltip:
          "Количество чеков за аналогичный период прошлого года. Основной показатель для годового сравнения",
      },
    ],
  },
  {
    id: "checkUniqueGroupNight",
    label: "Ночные чеки",
    value: "checkUniqueGroupNight",
    icon: Receipt,
    children: [
      {
        id: COLUMN_KEY.UNIQUE_CHECK_NIGHT,
        label: "Ночные чеки",
        value: COLUMN_KEY.UNIQUE_CHECK_NIGHT,
        tooltip:
          "Количество уникальных чеков. Основной показатель активности покупок",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LM,
        label: "Ночные чеки PM",
        value: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LM,
        tooltip:
          "Количество чеков в предыдущем месяце. Позволяет анализировать месячную динамику продаж",
      },
      {
        id: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LY,
        label: "Ночные чеки PY",
        value: COLUMN_KEY.UNIQUE_CHECK_NIGHT_LY,
        tooltip:
          "Количество чеков за аналогичный период прошлого года. Основной показатель для годового сравнения",
      },
    ],
  },
];

interface IndicatorGroup {
  id: string;
  label: string;
  value: string;
  icon: any;
  children: {
    id: string;
    label: string;
    value: string;
    tooltip?: string;
  }[];
}

export function excludeIndicators(
  source: IndicatorGroup[],
  excludeList: string[],
): IndicatorGroup[] {
  return source
    .filter((group) => !excludeList.includes(group.id))
    .map((group) => {
      const filteredChildren = group.children.filter(
        (child) => !excludeList.includes(child.id),
      );

      if (filteredChildren.length === 0) {
        return undefined;
      }

      return {
        ...group,
        children: filteredChildren,
      };
    })
    .filter((group): group is IndicatorGroup => Boolean(group));
}

export const useUniqueValues = (type: "check" | "commerce") => {
  const { nightShops } = useFiltersStore();
  const filtered = sortGroups(all_unique);
  const check = excludeIndicators(filtered, []);
  const commerce = excludeIndicators(filtered, [
    "cardNumberUniqueGroup",
    "checkUniqueGroup",
  ]);

  if (type === "check" && nightShops) {
    return unique_night_shops;
  }
  if (type === "check") {
    return check;
  }
  return commerce;
};
