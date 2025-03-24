import type * as React from "react";
import { ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/ui/sidebar";
import { ThemeSwitcher } from "@features/theme-switcher/theme-switcher";
import { Link } from "react-router";

export function NavSecondary({
  items,
  isCollapsed,
  toggleSidebar,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
  isCollapsed: boolean;
  toggleSidebar: () => void;
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map(
            (item: { title: string; url: string; icon: LucideIcon }) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link to={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <ThemeSwitcher size="sm" />
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem onClick={toggleSidebar}>
            <SidebarMenuButton>
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
              <p>Скрыть</p>{" "}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
