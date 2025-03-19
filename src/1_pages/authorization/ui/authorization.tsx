import { ThemeSwitcher } from "@features/theme-switcher/theme-switcher";
import { Logotype } from "@shared/ui/logotype";
import { Link } from "react-router";
import { AuthorizationCard } from "@widgets/authorization-card";
import { SidebarProvider } from "@shared/ui/sidebar";
export const Authorization = () => {
  return (
    <SidebarProvider>
      <div
        className="flex flex-col justify-between px-7 py-8 h-screen gap-6 items-center w-full bg-cover bg-center bg-no-repeat dark:bg-background/95 dark:bg-blend-overlay"
        style={{
          backgroundImage: "url('/public/auth-background.png')",
        }}
      >
        <div className="flex justify-between items-center w-full">
          <Link to={"/"}>
            <Logotype />
          </Link>
          <ThemeSwitcher />
        </div>
        <AuthorizationCard />
        <div className="not-sr-only" />
      </div>
    </SidebarProvider>
  );
};
