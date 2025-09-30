import { ChevronDown, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shared/ui/dropdown-menu";
import { useTheme } from "@app/providers/theme-provider";
import { useIsMobile } from "@shared/hooks/use-mobile";

// Маппинг технических названий на человекочитаемые
const themeLabels: Record<string, string> = {
  light: "Светлая",
  dark: "Тёмная",
};

interface ThemeSwitcherProps {
  size?: "sm" | "lg";
}

export function ThemeSwitcher({ size = "lg" }: ThemeSwitcherProps) {
  const { setTheme, theme } = useTheme();
  const [themeTitle, setThemeTitle] = useState<string>("");

  useEffect(() => {
    setThemeTitle(themeLabels[theme] || "");
  }, [theme]);

  const isMobile = useIsMobile();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {size === "lg" ? (
          <Button variant="ghost" className="bg-background">
            <div className="relative size-4 transition-300">
              <Sun className="size-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
              <Moon className="size-4 rotate-90 scale-0 transition-all absolute dark:rotate-0 dark:scale-100" />
            </div>
            {isMobile ? <span>Тема</span> : <span>{themeTitle} тема</span>}
            <div className="relative size-4">
              <ChevronDown className="size-4 transition-all absolute" />
            </div>
          </Button>
        ) : (
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="relative size-4 transition-300">
              <Sun className="size-4 rotate-0 scale-100 transition-all absolute dark:-rotate-90 dark:scale-0" />
              <Moon className="size-4 rotate-90 scale-0 transition-all absolute dark:rotate-0 dark:scale-100" />
            </div>
            {isMobile ? <span>Тема</span> : <span>{themeTitle} тема</span>}
            <div className="relative size-4">
              <ChevronDown className="size-4 transition-all absolute" />
            </div>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-[165px]">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
          }}
        >
          Светлая
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
          }}
        >
          Тёмная
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
