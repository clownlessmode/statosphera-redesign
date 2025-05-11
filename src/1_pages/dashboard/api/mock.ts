import { GetWeeklyRevenueResponse } from "./types";

export const mockWeeklyRevenue: GetWeeklyRevenueResponse = {
  salesSevenDays: {
    label: "Выручка за последние 7 дней",
    data: [
      {
        day: "2025-05-04",
        proceeds: 617887,
        day_of_week: "Воскресенье",
      },
      {
        day: "2025-05-05",
        proceeds: 618815,
        day_of_week: "Понедельник",
      },
      {
        day: "2025-05-06",
        proceeds: 779058,
        day_of_week: "Вторник",
      },
      {
        day: "2025-05-07",
        proceeds: 1020978,
        day_of_week: "Среда",
      },
      {
        day: "2025-05-08",
        proceeds: 1129639,
        day_of_week: "Четверг",
      },
      {
        day: "2025-05-09",
        proceeds: 1100534,
        day_of_week: "Пятница",
      },
    ],
  },
  curentMonth: {
    label: "Выручка за текущий месяц",
    data: [
      {
        proceeds: 8080414,
        proceedsYoY: -2081621,
        proceedsYoYPercent: -20.5,
      },
    ],
  },
  curentCheck: {
    label: "Чеки за месяц",
    data: [
      {
        check: 10918,
        checkYoY: -3665,
        checkYoYPercent: -25.1,
      },
    ],
  },
  curentAvgCheck: {
    label: "Средний чек",
    data: [
      {
        avgCheck: 740,
        avgCheckYoY: 43.3,
        avgCheckYoYPercent: 6.2,
      },
    ],
  },
  curentMarzha: {
    label: "Маржа",
    data: [
      {
        marginPercent: 33.5,
      },
    ],
  },
  curentMarkup: {
    label: "Наценка",
    data: [
      {
        markupPercent: 50.5,
        profit: 2709789,
      },
    ],
  },
  curentWriteOff: {
    label: "Списания (показатель)",
    data: [
      {
        writeOffPercent: 2.7,
        writeOffYoY: -201695,
        writeOff: 217944,
        writeOffYoYPercent: -48.1,
      },
    ],
  },
  curentHouseHold: {
    label: "Списания (хозы)",
    data: [
      {
        householdGoods: 40107,
        householdGoodsPercent: 0.5,
        householdGoodsYoY: -60872,
        householdGoodsYoYPercent: -60.3,
      },
    ],
  },
  curentAppLoyal: {
    label: "Применение карт лояльности",
    data: null,
  },
  currentCardIm: {
    label: "Выручка интернет-магазина",
    data: [
      {
        proceedsIm: 20903,
        proceedsImYoY: -18903,
        proceedsImYoYPercent: -47.5,
      },
    ],
  },
  bestCardIm: {
    label: "Лидер интернет-продаж",
    data: [
      {
        idStore: 42002,
        storeName: "Кемерово, Таврическая ул, 37",
        proceedsIm: 11303,
      },
      {
        idStore: 42025,
        storeName: "Кемерово, Шахтеров пр, 36",
        proceedsIm: 1282,
      },
      {
        idStore: 42056,
        storeName: "Осинники, Победы ул, 32",
        proceedsIm: 8318,
      },
    ],
  },
  salesHours: {
    label: "Данные за сегодня (по часам)",
    data: {
      graph: [
        {
          name: "Сегодня",
          data: [
            [1, null],
            [7, null],
            [8, 10018.619999999999],
            [9, 37669.549999999996],
            [10, 64096.73000000001],
            [11, 82703.85999999999],
            [12, 97032.34],
            [13, 77112.75999999998],
            [14, 110226.12999999999],
            [15, 70559.98],
            [16, 53831.41000000002],
            [17, 71690.23000000001],
            [18, 39640.74999999999],
            [19, 98010.93],
            [20, 41003.58],
            [21, 2729.42],
          ],
        },
        {
          name: "Прошлая неделя",
          data: [
            [1, 433],
            [7, 388],
            [8, 7465.549999999999],
            [9, 23217.430000000004],
            [10, 45311.76],
            [11, 62425.17],
            [12, 58889.65000000001],
            [13, 85000.82],
            [14, 73765.70999999999],
            [15, 65619.53],
            [16, 33656.399999999994],
            [17, 46727.85],
            [18, 43823.689999999995],
            [19, 41114.19],
            [20, 27446.17],
            [21, 2602.27],
          ],
        },
      ],
      card1: {
        title: "Продажи сегодня",
        proceedsTotal: "856 326,29",
        weekAgoProceedsTotal: "617 887,19",
        proceedsWoWPercent: "38.59 %",
        negative: false,
      },
      card2: {
        title: "Чеки сегодня",
        proceedsTotal: "1 041",
        weekAgoProceedsTotal: "931",
        proceedsWoWPercent: "11.82 %",
        negative: false,
      },
    },
  },
  cardOneExe: {
    label: "Процент выполнения плана",
    data: [
      {
        planProceedsForecastPercent: 78.94,
        planCheckForecastPercent: 73.6,
        planAvgCheckForecastPercent: 106.2,
        planProceedsQcForecastPercent: null,
        planShareOfPaymentsQcForecastPercent: null,
      },
    ],
  },
  salesChannel: {
    label: "Распределение по каналам продаж",
    data: [
      {
        circle: [
          {
            value: 32,
            name: "Инвестиционная",
          },
          {
            value: 5,
            name: "ФРС",
          },
          {
            value: 99,
            name: "Аренда",
          },
        ],
      },
      {
        center: [
          {
            total: 136,
          },
        ],
      },
    ],
  },
  salesStructure: {
    label: "Структура продаж за 6 месяцев",
    data: {
      xAxis: ["Ноя", "Дек", "Янв", "Фев", "Мар", "Апр", "Май"],
      series: [
        {
          name: "Гриль",
          data: [27, 24, 25, 25, 26, 25, 23],
        },
        {
          name: "КП",
          data: [11, 11, 12, 12, 11, 10, 9],
        },
        {
          name: "МКП",
          data: [27, 29, 29, 27, 28, 29, 37],
        },
        {
          name: "Кулинарная Продукция",
          data: [13, 14, 12, 14, 13, 13, 10],
        },
        {
          name: "Сопутка+КM",
          data: [22, 22, 22, 22, 22, 22, 20],
        },
      ],
    },
  },
  topWriteOff: {
    label: "Топ по группам списания",
    data: {
      yAxis: [
        "120. Полуфабрикаты Рубленые",
        "150. Субпродукты Птицы Охлажденные",
        "Напитки",
        "060. Колбасы Ливерные, Кровяные, Паштеты, Зельцы",
        "Кондитерские Изделия",
        "140. Полуфабрикаты Из Мяса Птицы Охлажденные",
        "Молочная Продукция",
        "191. Продукция Цеха Готовых Блюд",
        "100. Шашлык",
        "200. Продукция Фрс",
      ],
      series: [
        {
          name: "Выручка",
          data: [
            "147265",
            "83920",
            "94635",
            "83764",
            "95305",
            "358754",
            "119651",
            "558180",
            "965865",
            "1422223",
          ],
        },
        {
          name: "Списания",
          data: [
            "2025",
            "2260",
            "3912",
            "4777",
            "7874",
            "8784",
            "16323",
            "30964",
            "31046",
            "58100",
          ],
        },
      ],
    },
  },
  leaderWriteOffs: {
    label: "Лидеры по списаниям",
    data: [
      {
        idStore: 24036,
        storeName: "Назарово, Арбузова ул, 106а",
        writeOffPercent: 30.5,
      },
      {
        idStore: 22015,
        storeName: "Барнаул, Строителей пр, 18/1",
        writeOffPercent: 26,
      },
      {
        idStore: 54017,
        storeName: "Новосибирск, Венская ул, 23/1",
        writeOffPercent: 19.4,
      },
      {
        idStore: 54011,
        storeName: "Новосибирск, Красный пр, 29/1",
        writeOffPercent: 18.4,
      },
      {
        idStore: 54021,
        storeName: "Новосибирск, Красный пр, 220",
        writeOffPercent: 17.8,
      },
      {
        idStore: 54018,
        storeName: "Новосибирск, Петухова ул, 12в",
        writeOffPercent: 17.2,
      },
      {
        idStore: 22011,
        storeName: "Барнаул, Балтийская ул, 65",
        writeOffPercent: 16.2,
      },
      {
        idStore: 42092,
        storeName: "Прокопьевск, Шахтеров пр, 14а",
        writeOffPercent: 13.4,
      },
      {
        idStore: 22013,
        storeName: "Барнаул, Павловский тракт ул, 291",
        writeOffPercent: 12.9,
      },
      {
        idStore: 54014,
        storeName: "Новосибирск, Немировича-Данченко ул, 144б",
        writeOffPercent: 11.3,
      },
    ],
  },
  antitopLoyalApp: {
    label: "Анти-топ по примнеению карт лояльности",
    data: null,
  },
};
