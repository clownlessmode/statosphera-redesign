import {
  Bell,
  ChevronDown,
  LogOut,
  MessageSquareWarning,
  User,
} from "lucide-react";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { FC } from "react";

import { SidebarTrigger, useSidebar } from "@shared/ui/sidebar";
import { Feedback } from "@features/header/feedback";
interface Props {
  title: string;
}
const Header: FC<Props> = ({ title }) => {
  const { isMobile } = useSidebar();
  return (
    <div className="flex flex-row justify-between items-center gap-2">
      <div className="flex flex-row items-center gap-1">
        {isMobile && (
          <Button variant="ghost" size="icon">
            <SidebarTrigger />
          </Button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="flex flex-row gap-2">
        <Feedback />
        <Button variant="outline">
          <Bell className="w-4 h-4" />
          <p className="hidden lg:block">Уведомления</p>
          <Badge>4</Badge>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <User />
              <p className="hidden lg:block">Виталий Лебедев</p>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Профиль</DropdownMenuItem>
              <DropdownMenuItem>Уведомления</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Безопасность</DropdownMenuLabel>
            <DropdownMenuGroup>
              <DropdownMenuItem>Смена пароля</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Выйти из системы
              <DropdownMenuShortcut>
                <LogOut />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
