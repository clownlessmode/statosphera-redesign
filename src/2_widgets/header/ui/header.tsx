import { FC } from "react";

import { SidebarTrigger, useSidebar } from "@shared/ui/sidebar";
import { Feedback } from "@features/header/feedback";
import { ProfileBadge } from "@entities/session";
import { NotificationsBadge } from "@entities/notifications";
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
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1 sm:gap-2">
        {isMobile && <SidebarTrigger size="icon" />}
        {title && (
          <h1 className="font-bold leading-none md:text-xl text-md tracking-tight">
            {title}
          </h1>
        )}
        {actions?.left && actions.left}
      </div>
      {actions?.center && (
        <div className="flex flex-row items-center gap-1 sm:gap-2">
          {actions.center}
        </div>
      )}
      <div className="flex flex-row gap-1 sm:gap-2">
        {actions?.right && actions.right}
        <Feedback />
        <NotificationsBadge />
        <ProfileBadge />
      </div>
    </div>
  );
};

export default Header;
