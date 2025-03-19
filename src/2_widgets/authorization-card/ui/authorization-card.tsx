import { EmailAuthorization } from "@features/authorization/email-authorization";
import { RecoverPassword } from "@features/authorization/recover-password";
import type { FC } from "react";

const AuthorizationCard: FC = () => {
  return (
    <div className="flex flex-col gap-7 max-w-xs w-full rounded-lg bg-background sm:max-w-sm p-6 shadow-lg">
      <header className="flex flex-col gap-1 tracking-tight font-semibold text-2xl leading-none">
        <h1 className="text-accent">Анализируй. Исследуй</h1>
        <h1 className="text-muted-foreground">Используй Статосферу</h1>
      </header>
      <div className="flex flex-col gap-2">
        <EmailAuthorization />
        <RecoverPassword />
      </div>
    </div>
  );
};

export default AuthorizationCard;
