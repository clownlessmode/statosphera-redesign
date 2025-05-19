import { ROUTES_PATH } from "@app/router/routes";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router";
import { useNotifications } from "../model/api/controller";
const NotificationsBadge = () => {
  // const { count, countLoading } = useNotifications();

  return (
    <Link to={ROUTES_PATH.NOTIFICATIONS}>
      <Button variant="outline">
        <Bell className="w-4 h-4" />
        <p className="hidden lg:block">Уведомления</p>
        {/* {!!count && !countLoading && count > 0 && <Badge>{count}</Badge>} */}
      </Button>
    </Link>
  );
};

export default NotificationsBadge;
