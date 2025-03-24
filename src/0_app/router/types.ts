import type { ComponentType } from "react";
import type { RouteProps as ReactRouterRouteProps } from "react-router";
import { ROUTES_PATH } from "./routes";
export type RouteVariant = "public" | "private" | "auth";

export type RouteConfig = ReactRouterRouteProps & {
  path: (typeof ROUTES_PATH)[keyof typeof ROUTES_PATH];
  layout?: ComponentType<any>;
  variant: RouteVariant;
  allowedRoles?: string[];
  label?: string;
  group?: string;
};
