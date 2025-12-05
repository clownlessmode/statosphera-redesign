import { ROUTES_PATH } from "@app/router/routes";
import { useSession } from "@entities/session";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@shared/ui/alert-dialog";
import { DropdownMenuShortcut } from "@shared/ui/dropdown-menu";

import { DropdownMenuItem } from "@shared/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
  children?: React.ReactNode; // Добавляем поддержку children
}

const Logout = ({ children }: Props) => {
  const { clearSession } = useSession();
  const navigate = useNavigate();
  const handleLogout = () => {
    clearSession();
    navigate(ROUTES_PATH.LOGIN);
  };

  const defaultTrigger = (
    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
      Выйти из системы
      <DropdownMenuShortcut>
        <LogOutIcon />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children || defaultTrigger}
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены, что хотите выйти?</AlertDialogTitle>
          <AlertDialogDescription>
            При выходе из системы ваша текущая сессия будет завершена, и вам
            потребуется повторно авторизоваться для продолжения работы.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Выйти</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Logout;
