import { cn } from "@shared/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@shared/ui/sidebar";
import { TabsTrigger } from "@shared/ui/tabs";
import { LucideIcon } from "lucide-react";

import type { FC } from "react";
interface Props {
  data: NavItem[];
}
interface NavItem {
  title: string;
  icon: LucideIcon;
}
const NavItems: FC<Props> = ({ data }) => {
  return (
    <SidebarGroup className="relative flex w-full min-w-0 flex-col p-0  m-0 mt-1">
      <SidebarGroupContent className="flex flex-col gap-2 min-h-0 flex-1 overflow-auto group-data-[collapsible=icon]:overflow-hidden">
        <SidebarMenu className="flex w-full min-w-0 flex-col gap-1">
          {data.map((item) => (
            <SidebarMenuItem key={item.title}>
              <TabsTrigger value={item.title} asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn(
                    "cursor-pointer group shadow-none! data-[state=active]:bg-muted/50 data-[state=active]:text-foreground justify-start"
                  )}
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "text-muted-foreground transition-all group-hover:text-foreground",
                        "group-data-[state=active]:text-primary"
                      )}
                    />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </TabsTrigger>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default NavItems;
