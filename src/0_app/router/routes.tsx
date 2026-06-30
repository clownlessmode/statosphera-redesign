import React from "react";
import { RouteConfig } from "./types";

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
import { AdminDigests } from "@pages/admin/admin-digests";
import { AdminRolesPage } from "@pages/admin/admin-roles";
import { Summary } from "@pages/summary";
import { TV } from "@pages/tv";
import { Rfm } from "@pages/rfm/ui/rfm";
import { Settings } from "@pages/settings";
import { DemocracyPage } from "@pages/democracy";
import { IM } from "@pages/im";
import { Monitoring } from "@pages/monitoring";
import { Unload } from "@pages/unload";
import { IMReport } from "@pages/im-report";
import { FarmerProfile } from "@pages/farmer/profile";
import { FarmerAnalytics } from "@pages/farmer/analytics";
import { Farmers } from "@pages/farmers";
import { Forest } from "@pages/forest";
import { NightStores } from "@pages/night-stores";
import { Review } from "@pages/reviews";
import { Attendance } from "@pages/attendance";
import { Projects } from "@pages/projects";
import { ProjectPage } from "@pages/projects/ui/project-page/project-page";
import { Testtt } from "@pages/testtt/api/night-entries";
import { AdminMailing } from "@pages/admin/admin-mailing";
// import { Partner } from "@pages/partner";

// Ленивый импорт Sidebar для избежания циклических зависимостей
const Sidebar = React.lazy(() =>
  import("@widgets/sidebar").then((module) => ({ default: module.Sidebar })),
);

const FeedbackPage = React.lazy(() =>
  import("@pages/feedback").then((module) => ({ default: module.Feedback })),
);

export const ROUTES_PATH = {
  TESTTT: "/testtt",
  IM_REPORT: "/im/report",
  MESSAGES: "/messages",
  TV: "/tv",
  // Авторизация
  LOGIN: "/login",

  // Основные страницы
  DASHBOARD: "/",
  SETTINGS: "/settings",
  NOTIFICATIONS: "/notifications",
  DEMOCRACY: "/democracy",
  FEEDBACK: "/feedback",

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
  ADMIN_MAILING: "/admin/mailing",
  ADMIN_PERMISSIONS: "/admin/permissions",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_LOGS: "/admin/logs",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_DIGESTS: "/admin/digests",
  MONITORING: "/monitoring",
  // Магазины и доходы
  STORES: "/stores",
  REPORT: "/report",
  SALES_DYNAMICS: "/sales-dynamics",
  ROADMAP: "/roadmap",
  PRODUCTS: "/products",
  LOYALTY: "/loyalty",
  RFM: "/rfm",
  UNLOAD: "/unload",
  GRILL: "/grill",
  IM: "/im",

  // Фермеры
  FARMER: "/farmer",
  FARMERS: "/farmers",
  ANALYTICS: "/analytics",
  CHAT: "/chat",

  // Профиль
  PROFILE: "/profile",
  FOREST: "/forest",

  // Списания
  WRITE_OFF: "/write-off",

  // Сводная таблица
  SUMMARY: "/summary",

  // Партнеры
  // PARTNERS: "/partners",

  //Отзывы
  REVIEWS: "/reviews",
  ATTENDANCE: "/attendance",
  // Служебные страницы
  NOT_FOUND: "*",
  FORBIDDEN: "/forbidden",

  NIGHT_STORES: "/night-stores",
  PROJECTS: "/projects",
  PROJECT: "/projects/:id",
} as const;

export const ROUTES: RouteConfig[] = [
  {
    path: ROUTES_PATH.TV,
    variant: "private",
    element: <TV />,
    label: "TV",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.IM,
    variant: "private",
    element: <IM />,
    label: "Интернет-магазин",
    layout: Sidebar,
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.ADMIN_NOTIFICATIONS,
    variant: "private",
    allowedRoles: [ROLES.ADMIN],
    allowedUsers: [156],
    element: <AdminNotifications />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.IM_REPORT,
    variant: "private",
    element: <IMReport />,
    label: "Отчет ИМ",
    layout: Sidebar,
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.ADMIN_DIGESTS,
    variant: "private",
    allowedRoles: [ROLES.ADMIN],
    allowedUsers: [59, 156, 2837, 2813],
    element: <AdminDigests />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.ADMIN_MAILING,
    variant: "private",
    allowedUsers: [2819],
    element: <AdminMailing />,
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.ADMIN_ROLES,
    variant: "private",
    allowedRoles: [ROLES.ADMIN],
    element: <AdminRolesPage />,
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
      ...Object.values(ROLES).filter(
        (role) =>
          role !== ROLES.SERVICE_MANAGER &&
          role !== ROLES.FARMER &&
          role !== ROLES.FOREST,
      ),
    ],
    element: <Dashboard />,
    layout: Sidebar,
    label: "Главная",
  },
  {
    path: ROUTES_PATH.SETTINGS,
    variant: "private",
    element: <Settings />,
    layout: Sidebar,
    label: "Настройки",
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
    path: ROUTES_PATH.DEMOCRACY,
    variant: "private",
    element: <DemocracyPage />,
    layout: Sidebar,
    label: "Предложения",
  },
  {
    path: ROUTES_PATH.FEEDBACK,
    variant: "private",
    element: <FeedbackPage />,
    layout: Sidebar,
    label: "Обратная связь",
  },
  {
    path: ROUTES_PATH.LESSONS,
    variant: "private",
    element: <Lessons />,
    layout: Sidebar,
    label: "Обучение",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.ROADMAP,
    variant: "private",
    element: <Roadmap />,
    layout: Sidebar,
    label: "Роадмап",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
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
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.WRITE_OFF,
    variant: "private",
    element: <WriteOff />,
    layout: Sidebar,
    label: "Списания",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.SUMMARY,
    variant: "private",
    element: <Summary />,
    layout: Sidebar,
    label: "Парные продажи",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.REPORT,
    variant: "private",
    element: <Report />,
    layout: Sidebar,
    label: "Отчеты",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.PRODUCTS,
    variant: "private",
    element: <Products />,
    layout: Sidebar,
    label: "Продукты",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.SALES_DYNAMICS,
    variant: "private",
    element: <SalesDynamics />,
    layout: Sidebar,
    label: "Динамика продаж",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.MONITORING,
    variant: "private",
    element: <Monitoring />,
    layout: Sidebar,
    label: "Мониторинг сетей",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.GRILL,
    variant: "private",
    element: <Grill />,
    layout: Sidebar,
    allowedRoles: [ROLES.ADMIN],
    label: "Гриль",
  },
  {
    path: ROUTES_PATH.STANDARTS,
    variant: "private",
    element: <Standarts />,
    layout: Sidebar,
    label: "Стандарты",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.STANDART,
    variant: "private",
    element: <Standart />,
    layout: Sidebar,
    label: "Стандарт",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.LOYALTY,
    variant: "private",
    element: <Loyalty />,
    layout: Sidebar,
    label: "Лояльность",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.RFM,
    variant: "private",
    element: <Rfm />,
    layout: Sidebar,
    label: "РФМ",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.UNLOAD,
    variant: "private",
    element: <Unload />,
    layout: Sidebar,
    label: "Выгрузка",
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
  },
  {
    path: ROUTES_PATH.FARMER,
    variant: "private",
    element: <FarmerProfile />,
    allowedRoles: [ROLES.ADMIN, ROLES.FARMER],
    layout: Sidebar,
    label: "Профиль фермера",
  },
  {
    path: ROUTES_PATH.ANALYTICS,
    variant: "private",
    element: <FarmerAnalytics />,
    allowedRoles: [ROLES.ADMIN, ROLES.FARMER],
    layout: Sidebar,
    label: "Аналитика фермера",
  },
  //{
  //  path: ROUTES_PATH.CHAT,
  //  variant: "private",
  //  element: <FarmerChat />,
  //  allowedRoles: [ROLES.ADMIN, ROLES.FARMER],
  //  layout: Sidebar,
  //  label: "Чаты",
  //},
  {
    path: ROUTES_PATH.FARMERS,
    variant: "private",
    element: <Farmers />,
    allowedRoles: [ROLES.ADMIN, ROLES.FARMER_MANAGER],
    layout: Sidebar,
    label: "Фермеры",
  },
  {
    path: ROUTES_PATH.FOREST,
    variant: "private",
    element: <Forest />,
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.MANAGER_STORE && role !== ROLES.FARMER,
      ),
    ],
    layout: Sidebar,
    label: "Проект Лес",
  },
  {
    path: ROUTES_PATH.NIGHT_STORES,
    variant: "private",
    element: <NightStores />,
    allowedRoles: [
      ...Object.values(ROLES).filter(
        (role) => role !== ROLES.FARMER && role !== ROLES.FOREST,
      ),
    ],
    layout: Sidebar,
    label: "Ночные магазины",
  },
  {
    path: ROUTES_PATH.REVIEWS,
    variant: "private",
    element: <Review />,
    layout: Sidebar,
    label: "Отзывы",
    allowedUsers: [
      2739, 101, 2812, 2869, 2870, 124, 10, 192, 2871, 2872, 2873, 2874,
    ],
    allowedRoles: [ROLES.ADMIN],
  },
  {
    path: ROUTES_PATH.ATTENDANCE,
    variant: "private",
    element: <Attendance />,
    layout: Sidebar,
    label: "Посещаемость",
    allowedRoles: [ROLES.ADMIN],
    allowedUsers: [191, 101],
  },
  {
    path: ROUTES_PATH.TESTTT,
    variant: "private",
    element: <Testtt />,
    layout: Sidebar,
    label: "Ночные посещения",
  },
  {
    path: ROUTES_PATH.PROJECT,
    variant: "private",
    element: <ProjectPage />,
    layout: Sidebar,
    label: "Проект",
  },
  {
    path: ROUTES_PATH.PROJECTS,
    variant: "public",
    element: <Projects />,
    layout: Sidebar,
    label: "Проекты",
  },
  // {
  //   path: ROUTES_PATH.PARTNERS,
  //   variant: "private",
  //   element: <Partner />,
  //   layout: Sidebar,
  //   label: "Партнеры",
  // },
  // {
  //   path: ROUTES_PATH.ADMIN_STORES,
  //   variant: "private",
  //   element: <AdminStores />,
  //   allowedRoles: [ROLES.ADMIN],
  //   layout: Sidebar,
  // },
];
