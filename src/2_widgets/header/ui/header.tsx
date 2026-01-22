import { FC } from "react";

import { SidebarTrigger, useSidebar } from "@shared/ui/sidebar";
import { Feedback } from "@features/header/feedback";
import { ProfileBadge, useSession } from "@entities/session";
import { NotificationsBadge } from "@entities/notifications";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { LogIn, LogOut } from "lucide-react";
import { useFarmer } from "@entities/farmer/api/controller";
import { ROLES } from "@shared/constants/roles";
import Logout from "@features/authorization/log-out/ui/logout";
import { cn } from "@shared/lib/utils";

interface Props {
  title?: string;
  actions?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
  isAdmin?: boolean;
}

const Header: FC<Props> = ({ title, actions, isAdmin }) => {
  const { isMobile } = useSidebar();
  const { session } = useSession();
  const { profileStatus } = useFarmer(session?.idUser);
  return (
    <>
      {isAdmin && (
        <div
          className="h-2 -mt-2 -ml-2 w-[calc(100vw)] shadow-md"
          style={{
            background:
              "repeating-linear-gradient(45deg, var(--background) 0, var(--background) 10px, var(--secondary-foreground) 10px, var(--secondary-foreground) 20px)",
            backgroundBlendMode: "normal",
            opacity: 1,
          }}
        />
      )}
      <div className="flex flex-row justify-between items-center gap-2">
        <div className="flex flex-row items-center gap-1 sm:gap-2">
          {session && (
            <>
              {" "}
              {isMobile &&
                ((session?.role === ROLES.FARMER && profileStatus) ||
                  session?.role !== ROLES.FARMER) && (
                  <SidebarTrigger size="icon" />
                )}
            </>
          )}
          {title && (
            <h1
              className={cn(
                "font-bold leading-none md:text-xl text-md tracking-tight",
                session?.role === ROLES.FARMER && !profileStatus && "px-4",
              )}
            >
              {title}
            </h1>
          )}
          {session && <>{actions?.left && actions.left}</>}
        </div>
        {session && (
          <>
            {actions?.center && (
              <div className="flex flex-row items-center gap-1 sm:gap-2">
                {actions.center}
              </div>
            )}
          </>
        )}
        {session ? (
          <>
            <div className="flex flex-row gap-1 sm:gap-2">
              {actions?.right && actions.right}
              <Feedback />
              {((session?.role === ROLES.FARMER && profileStatus) ||
                session?.role !== ROLES.FARMER) && <NotificationsBadge />}
              {((session?.role === ROLES.FARMER && profileStatus) ||
                session?.role !== ROLES.FARMER) && <ProfileBadge />}
              {session?.role === ROLES.FARMER && !profileStatus && (
                <Logout>
                  <Button variant="outline">
                    <LogOut className="h-4 w-4" />
                    {!isMobile ? "Выйти из системы" : "Выйти"}
                  </Button>
                </Logout>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-row gap-1 sm:gap-2">
            <Feedback />
            <Link to={ROUTES_PATH.LOGIN}>
              <Button>
                Войти в Статосферу <LogIn />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
