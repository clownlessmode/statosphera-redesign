import { Authorization } from "@pages/authorization";
import { RouteConfig } from "./types";
import { Dashboard } from "@pages/dashboard";
import { Forbidden } from "@pages/forbidden";
import { NotFound } from "@pages/not-found";
import { Sidebar } from "@widgets/sidebar";

export const ROUTES_PATH = {
  // Авторизация
  LOGIN: "/login",

  // Основные страницы
  HOME: "/",
  SETTINGS: "/settings",
  NOTIFICATION: "/notifications",

  // Тренировка
  TRAINING: "/training",
  TRAINING_HOME: "/training/home",
  TRAINING_GLOBAL: "/training/global",
  TRAINING_INCOME_STORE: "/training/income-store",
  INSTRUCTIONS_TRAINING: "/training/instructions",
  INFO_VISION_TRAINING: "/training/info-vision",

  // Дайджесты
  DIGEST: "/digest",
  DIGEST_ALL: "/digest/all",
  DIGEST_ANALITYCS: "/digest/analytics",
  DIGEST_FRANCHISE: "/digest/franchise",
  DIGEST_SD: "/digest/sd",
  DIGEST_GROUP: "/digest/group",

  // Магазины и доходы
  STORE_DIRECTORY: "/store-directory",
  INCOME_STORE: "/income/store",
  INCOME_TODAY: "/income/today",
  INCOME_FRC: "/income/frc",

  // Документы и отчеты
  INSTRUCTIONS: "/instructions",
  INFO_VISION: "/info-vision",
  ROADMAP: "/roadmap",

  // Анализ и рейтинги
  RATING_PARTNERS: "/rating-partners",
  ABC_ANALYSIS: "/abc",

  // Специальные разделы
  LOYALTY: "/loyalty",
  GRILL: "/grill",
  NOMENCLATURE: "/nomenclature",
  RD: "/rd",
  STAFF: "/staff",

  // Служебные страницы
  NOT_FOUND: "*",
  FORBIDDEN: "/forbidden",
} as const;

export const ROUTES: RouteConfig[] = [
  // Авторизация
  {
    path: ROUTES_PATH.LOGIN,
    variant: "auth",
    element: Authorization(),
    label: "Логин",
    group: "Авторизация",
  },

  // Основные страницы
  {
    path: ROUTES_PATH.HOME,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Главная",
    group: "Основные страницы",
  },
  {
    path: ROUTES_PATH.SETTINGS,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Настройки",
    group: "Основные страницы",
  },
  {
    path: ROUTES_PATH.NOTIFICATION,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Уведомления",
    group: "Основные страницы",
  },

  // Тренировка
  {
    path: ROUTES_PATH.TRAINING,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Обучение",
    group: "Тренировка",
  },
  {
    path: ROUTES_PATH.TRAINING_HOME,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Тренировка Главная страница",
    group: "Тренировка",
  },
  {
    path: ROUTES_PATH.TRAINING_GLOBAL,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Глобальное обучение",
    group: "Тренировка",
  },
  {
    path: ROUTES_PATH.TRAINING_INCOME_STORE,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Тренировка Динамика продаж",
    group: "Тренировка",
  },
  {
    path: ROUTES_PATH.INSTRUCTIONS_TRAINING,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Тренировка аудитов",
    group: "Тренировка",
  },
  {
    path: ROUTES_PATH.INFO_VISION_TRAINING,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Тренировка конструктор отчетов",
    group: "Тренировка",
  },

  // Дайджесты
  {
    path: ROUTES_PATH.DIGEST,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест",
    group: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST_ALL,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест",
    group: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST_ANALITYCS,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест аналитики",
    group: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST_FRANCHISE,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест франчайзи",
    group: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST_SD,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест СД",
    group: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST_GROUP,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Дайджест Группа компаний",
    group: "Дайджесты",
  },

  // Магазины и доходы
  {
    path: ROUTES_PATH.STORE_DIRECTORY,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Справочник магазинов",
    group: "Магазины и доходы",
  },
  {
    path: ROUTES_PATH.INCOME_STORE,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Динамика продаж",
    group: "Магазины и доходы",
  },

  {
    path: ROUTES_PATH.INCOME_TODAY,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Выручка сегодня",
    group: "Магазины и доходы",
  },
  {
    path: ROUTES_PATH.INCOME_FRC,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "ФРС",
    group: "Магазины и доходы",
  },

  // Документы и отчеты
  {
    path: ROUTES_PATH.INSTRUCTIONS,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Документы розничной сети",
    group: "Документы и отчеты",
  },
  {
    path: ROUTES_PATH.INFO_VISION,
    variant: "private",
    element: Dashboard(),

    layout: Sidebar,
    label: "Конструктор отчетов",
    group: "Документы и отчеты",
  },
  {
    path: ROUTES_PATH.ROADMAP,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "ROADMAP",
    group: "Документы и отчеты",
  },

  // Анализ и рейтинги
  {
    path: ROUTES_PATH.RATING_PARTNERS,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Рейтинг партнеров",
    group: "Анализ и рейтинги",
  },
  {
    path: ROUTES_PATH.ABC_ANALYSIS,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "ABC",
    group: "Анализ и рейтинги",
  },

  // Специальные разделы
  {
    path: ROUTES_PATH.LOYALTY,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Лояльность",
    group: "Специальные разделы",
  },
  {
    path: ROUTES_PATH.GRILL,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Гриль эксперимент",
    group: "Специальные разделы",
  },
  {
    path: ROUTES_PATH.NOMENCLATURE,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Номенклатура",
    group: "Специальные разделы",
  },
  {
    path: ROUTES_PATH.RD,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "RD",
    group: "Специальные разделы",
  },
  {
    path: ROUTES_PATH.STAFF,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Персонал",
    group: "Специальные разделы",
  },

  // Служебные страницы
  {
    path: ROUTES_PATH.NOT_FOUND,
    variant: "public",
    element: NotFound(),
    layout: Sidebar,
    label: "Не найдено",
    group: "Служебные страницы",
  },
  {
    path: ROUTES_PATH.FORBIDDEN,
    variant: "public",
    element: Forbidden(),
    layout: Sidebar,
    label: "Forbidden",
    group: "Служебные страницы",
  },
];
