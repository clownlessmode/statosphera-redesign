import { Authorization } from "@pages/authorization";
import { RouteConfig } from "./types";
import { Dashboard } from "@pages/dashboard";
import { Forbidden } from "@pages/forbidden";
import { NotFound } from "@pages/not-found";
import { Sidebar } from "@widgets/sidebar";
import { Notifications } from "@pages/notifications";
import { Digests } from "@pages/digests";
import { Lessons } from "@pages/lessons";
import { Roadmap } from "@pages/roadmap";
import { Digest } from "@pages/digest";
import { Stores } from "@pages/stores";
import { Standarts } from "@pages/standarts";
import { Standart } from "@pages/standart";
export const ROUTES_PATH = {
  // Авторизация
  LOGIN: "/login",

  // Основные страницы
  DASHBOARD: "/",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",

  // Тренировка
  LESSONS: "/lessons",

  // Дайджесты
  DIGESTS: "/digests",
  DIGEST: "/digests/:id",

  // Стандарты
  STANDARTS: "/standarts",
  STANDART: "/standarts/:id",

  // Магазины и доходы
  STORES: "/stores",

  ROADMAP: "/roadmap",

  // Служебные страницы
  NOT_FOUND: "*",
  FORBIDDEN: "/forbidden",
} as const;

export const ROUTES: RouteConfig[] = [
  // Авторизация
  {
    path: ROUTES_PATH.LOGIN,
    variant: "auth",
    element: <Authorization />,
    label: "Логин",
  },

  // Основные страницы
  {
    path: ROUTES_PATH.DASHBOARD,
    variant: "private",
    element: <Dashboard />,
    layout: Sidebar,
    label: "Главная",
  },
  {
    path: ROUTES_PATH.DIGESTS,
    variant: "private",
    element: <Digests />,
    layout: Sidebar,
    label: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST,
    variant: "private",
    element: <Digest />,
    layout: Sidebar,
    label: "Дайджест",
  },
  {
    path: ROUTES_PATH.NOTIFICATIONS,
    variant: "private",
    element: <Notifications />,
    layout: Sidebar,
    label: "Уведомления",
  },
  {
    path: ROUTES_PATH.LESSONS,
    variant: "private",
    element: <Lessons />,
    layout: Sidebar,
    label: "Обучение",
  },
  {
    path: ROUTES_PATH.ROADMAP,
    variant: "private",
    element: <Roadmap />,
    layout: Sidebar,
    label: "Роадмап",
  },
  {
    path: ROUTES_PATH.NOT_FOUND,
    variant: "public",
    element: <NotFound />,
    layout: Sidebar,
    label: "Не найдено",
  },
  {
    path: ROUTES_PATH.FORBIDDEN,
    variant: "public",
    element: <Forbidden />,
    layout: Sidebar,
    label: "Forbidden",
  },
  {
    path: ROUTES_PATH.STORES,
    variant: "private",
    element: <Stores />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.STANDARTS,
    variant: "private",
    element: <Standarts />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.STANDART,
    variant: "private",
    element: <Standart />,
    layout: Sidebar,
  },
];
