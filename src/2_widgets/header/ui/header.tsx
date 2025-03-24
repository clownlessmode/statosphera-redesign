import { Bell } from "lucide-react";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";

import { FC } from "react";

import { SidebarTrigger, useSidebar } from "@shared/ui/sidebar";
import { Feedback } from "@features/header/feedback";
import { ProfileBadge } from "@entities/session";
import { NotificationsBadge } from "@entities/notifications";
interface Props {
  title?: string;
  actions?: React.ReactNode;
}
const Header: FC<Props> = ({ title, actions }) => {
  const { isMobile } = useSidebar();
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1">
        {isMobile && (
          <Button variant="ghost" size="icon">
            <SidebarTrigger />
          </Button>
        )}
        {title && <h1 className="text-xl font-bold">{title}</h1>}
      </div>
      {actions && actions}
      <div className="flex flex-row gap-2">
        <Feedback />
        <NotificationsBadge />
        <ProfileBadge />
      </div>
    </div>
  );
};

export default Header;
