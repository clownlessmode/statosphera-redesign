import { FC, ReactNode } from "react";
import { Navigate } from "react-router";
import { RouteVariant } from "./types";
import { ROUTES_PATH } from "./routes";
import { useSession } from "@entities/session";

interface RouteGuardProps {
  variant: RouteVariant;
  allowedRoles?: string[];
  allowedUsers?: number[];
  children: ReactNode;
}

const RouteGuard: FC<RouteGuardProps> = ({
  variant,
  allowedRoles,
  allowedUsers,
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
      return <Navigate to={ROUTES_PATH.LOGIN} replace />;
    }
    // Если для маршрута вообще не заданы ограничения, разрешаем доступ
    if (!allowedRoles && !allowedUsers) {
      return <>{children}</>;
    }
    // По умолчанию считаем, что доступа нет, пока не докажем обратное
    let hasAccess = false;
    // Проверяем, есть ли у пользователя доступ по роли
    if (allowedRoles && allowedRoles.includes(userRole)) {
      hasAccess = true;
    }
    // Проверяем, есть ли у пользователя доступ по ID
    if (!hasAccess && allowedUsers && allowedUsers.includes(session.idUser)) {
      hasAccess = true;
    }
    // Если после всех проверок доступ есть - показываем страницу, иначе - запрещаем
    if (hasAccess) {
      return <>{children}</>;
    } else {
      return <Navigate to={ROUTES_PATH.FORBIDDEN} replace />;
    }
  }

  return null;
};

export default RouteGuard;
