import { ROUTES_PATH } from "@app/router/routes";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router";
import { NOTIFICATIONS_MOCK } from "@shared/constants/mock/notifications-mock";
const NotificationsBadge = () => {
  const unreadNotifications = NOTIFICATIONS_MOCK.filter(
    (notification) => !notification.is_read
  );
  const unreadNotificationsCount = unreadNotifications.length;
  return (
    <Link to={ROUTES_PATH.NOTIFICATIONS}>
      <Button variant="outline">
        <Bell className="w-4 h-4" />
        <p className="hidden lg:block">Уведомления</p>
        <Badge>{unreadNotificationsCount}</Badge>
      </Button>
    </Link>
  );
};

export default NotificationsBadge;
