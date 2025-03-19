import { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { RouteVariant } from "./types";
import { ROUTES_PATH } from "./routes";
import { useSession } from "@entities/session";

interface RouteGuardProps {
  variant: RouteVariant;
  allowedRoles?: string[];
  children: ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({
  variant,
  allowedRoles,
  children,
}) => {
  const { session } = useSession();
  const isAuthenticated = !!session;
  const userRole = session?.role ? session.role : "guest";
  if (variant === "public") {
    return <>{children}</>;
  }

  if (variant === "auth") {
    return !isAuthenticated ? (
      children
    ) : (
      <Navigate to={ROUTES_PATH.DASHBOARD} replace />
    );
  }

  if (variant === "private") {
    if (!isAuthenticated) {
      return <Navigate to={ROUTES_PATH.SIGN_IN} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole ?? "")) {
      return <Navigate to={ROUTES_PATH.FORBIDDEN} replace />;
    }

    return <>{children}</>;
  }

  return null;
};

export default RouteGuard;
