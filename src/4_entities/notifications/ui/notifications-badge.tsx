import { ROUTES_PATH } from "@app/router/routes";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Bell } from "lucide-react";
import { Link } from "react-router";

const NotificationsBadge = () => {
  return (
    <Link to={ROUTES_PATH.NOTIFICATIONS}>
      <Button variant="outline">
        <Bell className="w-4 h-4" />
        <p className="hidden lg:block">Уведомления</p>
        <Badge>4</Badge>
      </Button>
    </Link>
  );
};

export default NotificationsBadge;
