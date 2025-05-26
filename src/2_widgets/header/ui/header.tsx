import { FC } from "react";

import { SidebarTrigger, useSidebar } from "@shared/ui/sidebar";
import { Feedback } from "@features/header/feedback";
import { ProfileBadge, useSession } from "@entities/session";
import { NotificationsBadge } from "@entities/notifications";
import { Link } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";
import { Button } from "@shared/ui/button";
import { LogIn } from "lucide-react";
interface Props {
  title?: string;
  actions?: {
    left?: React.ReactNode;
    center?: React.ReactNode;
    right?: React.ReactNode;
  };
}
const Header: FC<Props> = ({ title, actions }) => {
  const { isMobile } = useSidebar();
  const { session } = useSession();
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        {session && <> {isMobile && <SidebarTrigger size="icon" />}</>}
        {title && (
          <h1 className="font-bold leading-none md:text-xl text-md tracking-tight">
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
            <NotificationsBadge />
            <ProfileBadge />
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
  );
};

export default Header;
