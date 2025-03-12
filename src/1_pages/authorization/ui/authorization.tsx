import { FC } from "react";
import { ThemeSwitcher } from "@features/theme-switcher/theme-switcher";
import { Logotype } from "@shared/ui/logotype";
import { EmailAuthorization } from "@features/authorization/email-authorization";
import { Link } from "react-router";
import { RecoverPassword } from "@features/authorization/recover-password";
export const Authorization: FC = () => {
  return (
    <div className="flex flex-col justify-between px-7 py-8 h-screen gap-6 items-center w-full">
      <div className="flex justify-between items-center w-full">
        <Link to={"/"}>
          <Logotype />
        </Link>
        <ThemeSwitcher />
      </div>
      <div className="flex flex-col gap-7 max-w-xs w-full">
        <header className="flex flex-col gap-1 tracking-tight font-semibold text-2xl leading-none">
          <h1 className="text-accent">Анализируй. Исследуй</h1>
          <h1 className="text-muted-foreground">Используй Статосферу</h1>
        </header>
        <div className="flex flex-col gap-2">
          <EmailAuthorization />
          <RecoverPassword />
        </div>
      </div>
      <div className="not-sr-only" />
    </div>
  );
};
