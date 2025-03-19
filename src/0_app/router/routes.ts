import { Authorization } from "@pages/authorization";
import { RouteConfig } from "./types";
import { Dashboard } from "@pages/dashboard";
import { Forbidden } from "@pages/forbidden";
import { NotFound } from "@pages/not-found";
import { Sidebar } from "@widgets/sidebar";

export const ROUTES_PATH = {
  SIGN_IN: "/auth",
  DASHBOARD: "/",
  FORBIDDEN: "/forbidden",
  NOT_FOUND: "*",
} as const;

export const ROUTES: RouteConfig[] = [
  {
    path: ROUTES_PATH.SIGN_IN,
    variant: "auth",
    element: Authorization(),
  },
  {
    path: ROUTES_PATH.DASHBOARD,
    variant: "private",
    element: Dashboard(),
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.FORBIDDEN,
    variant: "private",
    element: Forbidden(),
    layout: Sidebar,
  },
  {
    path: ROUTES_PATH.NOT_FOUND,
    variant: "public",
    element: NotFound(),
    layout: Sidebar,
  },
];
