import { Button } from "@shared/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { User } from "lucide-react";
import { useSession } from "..";
import formatShortName from "@shared/lib/format-short-name";
import { Separator } from "@shared/ui/separator";
import { ROUTES_PATH } from "@app/router/routes";
import { Link } from "react-router";
import { Logout } from "@features/authorization/log-out";
const ProfileBadge = () => {
  const { session } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <User />
          <p className="hidden lg:block">
            {formatShortName(session?.userName)}
          </p>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="block lg:hidden">
          <p>
            {formatShortName(session?.userName)}
            <Separator className="w-full mt-2" />
          </p>
        </DropdownMenuLabel>
        <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link to={ROUTES_PATH.NOTIFICATIONS}>
            <DropdownMenuItem>Уведомления</DropdownMenuItem>
          </Link>
          <DropdownMenuItem disabled>Профиль</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Безопасность</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>Смена пароля</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBadge;
