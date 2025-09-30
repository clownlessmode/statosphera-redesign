import { type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/ui/sidebar";
import { cn } from "@shared/lib/utils";
import { useIsMobile } from "@shared/hooks/use-mobile";

export function NavMain({
  items,
}: {
  items: {
    disabled?: boolean;
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              {isMobile ? (
                <Link onClick={toggleSidebar} to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "cursor-pointer",
                      item.disabled && "opacity-30 cursor-not-allowed",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              ) : (
                <Link to={item.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      "cursor-pointer",
                      item.disabled && "opacity-30 cursor-not-allowed",
                    )}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </Link>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
