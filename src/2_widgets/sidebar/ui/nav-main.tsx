import { type LucideIcon } from "lucide-react";
import { Link } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
    children?: { title: string; url: string; icon?: LucideIcon }[];
  }[];
}) {
  const { toggleSidebar, state, setOpen } = useSidebar();
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
                <>
                  {state === "collapsed" &&
                  item.children &&
                  item.children.length > 0 ? (
                    <SidebarMenuButton
                      tooltip={item.title}
                      onClick={() => setOpen(true)}
                      className={cn(
                        "cursor-pointer",
                        item.disabled && "opacity-30 cursor-not-allowed",
                      )}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
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
                  {!item.disabled &&
                    state !== "collapsed" &&
                    item.children &&
                    item.children.length > 0 && (
                      <div className="overflow-hidden max-h-0 group-hover/menu-item:max-h-96 transition-all duration-600 ease-in-out">
                        <SidebarMenuSub>
                          {item.children.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <Link to={child.url}>
                                <SidebarMenuSubButton asChild>
                                  <span className="flex items-center gap-2">
                                    {child.icon && <child.icon />}
                                    <span>{child.title}</span>
                                  </span>
                                </SidebarMenuSubButton>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </div>
                    )}
                </>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
