// import { lazy } from "react";
import { RouteConfig } from "./types";
import { Sidebar } from "@widgets/sidebar";

// const Authorization = lazy(
//   () => import("@pages/authorization/ui/authorization")
// );
// const Dashboard = lazy(() => import("@pages/dashboard/ui/dashboard"));
// const Forbidden = lazy(() => import("@pages/forbidden/ui/forbidden"));
// const NotFound = lazy(() => import("@pages/not-found/ui/not-found"));

// const Notifications = lazy(
//   () => import("@pages/notifications/ui/notifications")
// );
// const Digests = lazy(() => import("@pages/digests/ui/digests"));
// const Lessons = lazy(() => import("@pages/lessons/ui/lessons"));
// const Roadmap = lazy(() => import("@pages/roadmap/ui/roadmap"));
// const Digest = lazy(() => import("@pages/digest/ui/digest"));
// const Stores = lazy(() => import("@pages/stores/ui/stores"));
// const Standarts = lazy(() => import("@pages/standarts/ui/standarts"));
// const Standart = lazy(() => import("@pages/standart/ui/standart"));
// const Grill = lazy(() => import("@pages/grill/ui/grill"));
// const Report = lazy(() => import("@pages/report/ui/report"));
// const SalesDynamics = lazy(
//   () => import("@pages/sales-dynamics/ui/sales-dynamics")
// );
// const Products = lazy(() => import("@pages/products/ui/products"));
// import { lazy } from "react";  // больше не нужен

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
import Products from "@pages/products/ui/products";
import { ROLES } from "@shared/constants/roles";

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
  REPORT: "/report",
  SALES_DYNAMICS: "/sales-dynamics",
  ROADMAP: "/roadmap",
  PRODUCTS: "/products",

  GRILL: "/grill",

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
    label: "Нет доступа",
  },
  {
    path: ROUTES_PATH.STORES,
    variant: "private",
    element: <Stores />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.REPORT,
    variant: "private",
    element: <Report />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.PRODUCTS,
    variant: "private",
    element: <Products />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.SALES_DYNAMICS,
    variant: "private",
    element: <SalesDynamics />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.GRILL,
    variant: "private",
    element: <Grill />,
    allowedRoles: [ROLES.PARTNER],
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
