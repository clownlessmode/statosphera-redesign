import { Authorization } from "@pages/authorization";
import { RouteConfig } from "./types";
import { Dashboard } from "@pages/dashboard";
import { Forbidden } from "@pages/forbidden";
import { NotFound } from "@pages/not-found";
import { Sidebar } from "@widgets/sidebar";
import { Notifications } from "@pages/notifications";
import { Digests } from "@pages/digests";
import { Lessons } from "@pages/lessons";

export const ROUTES_PATH = {
  // Авторизация
  LOGIN: "/login",

  // Основные страницы
  DASHBOARD: "/",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",

  // Тренировка
  LESSONS: "/lessons",
  TRAINING_HOME: "/training/home",
  TRAINING_GLOBAL: "/training/global",
  TRAINING_INCOME_STORE: "/training/income-store",
  INSTRUCTIONS_TRAINING: "/training/instructions",
  INFO_VISION_TRAINING: "/training/info-vision",

  // Дайджесты
  DIGESTS: "/digest",
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
  },

  // Основные страницы
  {
    path: ROUTES_PATH.DASHBOARD,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
    label: "Главная",
  },
  {
    path: ROUTES_PATH.DIGESTS,
    variant: "private",
    element: Digests(),
    layout: Sidebar,
    label: "Дайджесты",
  },
  {
    path: ROUTES_PATH.NOTIFICATIONS,
    variant: "private",
    element: Notifications(),
    layout: Sidebar,
    label: "Уведомления",
  },
  {
    path: ROUTES_PATH.LESSONS,
    variant: "private",
    element: Lessons(),
    layout: Sidebar,
    label: "Обучение",
  },
  {
    path: ROUTES_PATH.NOT_FOUND,
    variant: "public",
    element: NotFound(),
    layout: Sidebar,
    label: "Не найдено",
  },
  {
    path: ROUTES_PATH.FORBIDDEN,
    variant: "public",
    element: Forbidden(),
    layout: Sidebar,
    label: "Forbidden",
  },
];
