import { RouteConfig } from "./types";
import { Sidebar } from "@widgets/sidebar";

import Authorization from "@pages/authorization/ui/authorization";
import Dashboard from "@pages/dashboard/ui/dashboard";
import Forbidden from "@pages/forbidden/ui/forbidden";
import NotFound from "@pages/not-found/ui/not-found";

import Notifications from "@pages/notifications/ui/notifications";
import Digests from "@pages/digests/ui/digests";
import Lessons from "@pages/lessons/ui/lessons";
import Roadmap from "@pages/roadmap/ui/roadmap";
import Digest from "@pages/digest/ui/digest";
import Stores from "@pages/stores/ui/stores";
import Standarts from "@pages/standarts/ui/standarts";
import Standart from "@pages/standart/ui/standart";
import Grill from "@pages/grill/ui/grill";
import Report from "@pages/report/ui/report";
import SalesDynamics from "@pages/sales-dynamics/ui/sales-dynamics";
import { ROLES } from "@shared/constants/roles";
import { Products } from "@pages/products";
import { WriteOff } from "@pages/write-off/ui/write-off";
import { Loyalty } from "@pages/loyalty";

import { AdminNotifications } from "@pages/admin/admin-notifications";
import { Summary } from "@pages/summary";
import { AdminTerminalPage } from "@pages/admin/admin-terminal";
import { TV } from "@pages/tv";
// import { WriteOff } from "@pages/write-off";

export const ROUTES_PATH = {
  MESSAGES: "/messages",
  TV: "/tv",
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

  //Админ панель
  ADMIN_STORES: "/admin/stores",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_USERS: "/admin/users",
  ADMIN_ROLES: "/admin/roles",
  ADMIN_PERMISSIONS: "/admin/permissions",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_LOGS: "/admin/logs",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_TERMINAL: "/admin/terminal",

  // Магазины и доходы
  STORES: "/stores",
  REPORT: "/report",
  SALES_DYNAMICS: "/sales-dynamics",
  ROADMAP: "/roadmap",
  PRODUCTS: "/products",
  LOYALTY: "/loyalty",
  GRILL: "/grill",

  // Списания
  WRITE_OFF: "/write-off",

  // Сводная таблица
  SUMMARY: "/summary",

  // Служебные страницы
  NOT_FOUND: "*",
  FORBIDDEN: "/forbidden",
} as const;

export const ROUTES: RouteConfig[] = [
  {
    path: ROUTES_PATH.TV,
    variant: "private",
    element: <TV />,
    label: "TV",
  },
  {
    path: ROUTES_PATH.ADMIN_NOTIFICATIONS,
    variant: "private",
    allowedRoles: [ROLES.ADMIN],
    element: <AdminNotifications />,
    layout: Sidebar,
  },
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
    allowedRoles: [
      ...Object.values(ROLES).filter((role) => role !== ROLES.SERVICE_MANAGER),
    ],
    element: <Dashboard />,
    layout: Sidebar,
    label: "Главная",
  },
  {
    path: ROUTES_PATH.DIGESTS,
    variant: "public",
    element: <Digests />,
    layout: Sidebar,
    label: "Дайджесты",
  },
  {
    path: ROUTES_PATH.DIGEST,
    variant: "public",
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
    label: "Нет доступа",
  },
  {
    path: ROUTES_PATH.STORES,
    variant: "private",
    element: <Stores />,
    layout: Sidebar,
    label: "Магазины",
  },
  {
    path: ROUTES_PATH.WRITE_OFF,
    variant: "private",
    element: <WriteOff />,
    layout: Sidebar,
    label: "Списания",
  },
  {
    path: ROUTES_PATH.SUMMARY,
    variant: "private",
    element: <Summary />,
    layout: Sidebar,
    label: "Парные продажи",
  },
  {
    path: ROUTES_PATH.REPORT,
    variant: "private",
    element: <Report />,
    layout: Sidebar,
    label: "Отчеты",
  },
  {
    path: ROUTES_PATH.PRODUCTS,
    variant: "private",
    element: <Products />,
    layout: Sidebar,
    label: "Продукты",
  },
  {
    path: ROUTES_PATH.SALES_DYNAMICS,
    variant: "private",
    element: <SalesDynamics />,
    layout: Sidebar,
    label: "Динамика продаж",
  },
  {
    path: ROUTES_PATH.GRILL,
    variant: "private",
    element: <Grill />,
    allowedRoles: [ROLES.ADMIN],
    layout: Sidebar,
    label: "Гриль",
  },
  {
    path: ROUTES_PATH.STANDARTS,
    variant: "private",
    element: <Standarts />,
    layout: Sidebar,
    label: "Стандарты",
  },
  {
    path: ROUTES_PATH.STANDART,
    variant: "private",
    element: <Standart />,
    layout: Sidebar,
    label: "Стандарт",
  },
  {
    path: ROUTES_PATH.LOYALTY,
    variant: "private",
    element: <Loyalty />,
    layout: Sidebar,
    label: "Лояльность",
  },
  {
    path: ROUTES_PATH.ADMIN_TERMINAL,
    variant: "private",
    element: <AdminTerminalPage />,
    layout: Sidebar,
    label: "Терминал",
  },
  // {
  //   path: ROUTES_PATH.ADMIN_STORES,
  //   variant: "private",
  //   element: <AdminStores />,
  //   allowedRoles: [ROLES.ADMIN],
  //   layout: Sidebar,
  // },
];
