import { Logotype } from "@shared/ui/logotype";
import {
  BookOpenIcon,
  CameraIcon,
  ChartPie,
  ChevronLeft,
  ChevronRight,
  ClipboardListIcon,
  DatabaseIcon,
  DollarSign,
  FileChartColumn,
  FileChartPieIcon,
  FileCodeIcon,
  FileIcon,
  FileQuestion,
  FileTextIcon,
  Ham,
  MapIcon,
  PanelsTopLeft,
  SettingsIcon,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  UsersIcon,
} from "lucide-react";
import type { FC } from "react";
import { Link } from "react-router";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@shared/ui/sidebar";
import { NavMain } from "./nav-main";

import { NavSecondary } from "./nav-secondary";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Продажи",
      url: "#",
      icon: DollarSign,
    },
    {
      title: "Дайджесты",
      url: "#",
      icon: FileChartPieIcon,
    },
    {
      title: "Инструкции",
      url: "#",
      icon: FileQuestion,
    },
    {
      title: "Отчёты",
      url: "#",
      icon: FileChartColumn,
    },
    {
      title: "Номенклатура",
      url: "#",
      icon: PanelsTopLeft,
    },
    {
      title: "Гриль",
      url: "#",
      icon: Ham,
    },
    {
      title: "Справочник магазинов",
      url: "#",
      icon: Store,
    },
    {
      title: "Настройки",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Прибыль ФРС",
      url: "#",
      icon: ShoppingBag,
      disabled: true,
    },
    {
      title: "ABC анализ",
      url: "#",
      icon: ChartPie,
      disabled: true,
    },
    {
      title: "Персонал",
      url: "#",
      icon: UsersIcon,
      disabled: true,
    },
    {
      title: "R&D",
      url: "#",
      icon: SlidersHorizontal,
      disabled: true,
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: CameraIcon,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: FileTextIcon,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Обучение",
      url: "#",
      icon: BookOpenIcon,
    },
    {
      title: "Дорожка карта",
      url: "#",
      icon: MapIcon,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: DatabaseIcon,
    },
    {
      name: "Reports",
      url: "#",
      icon: ClipboardListIcon,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: FileIcon,
    },
  ],
};

const Sidebar = ({
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <SidebarComponent collapsible="icon" {...props}>
      <Link to="/" className="p-4">
        <Logotype />
      </Link>

      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarRail />

      <SidebarFooter>
        <SidebarMenu>
          <NavSecondary items={data.navSecondary} className="mt-auto" />

          <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
              <ChevronLeft />
              <p>Скрыть</p>
            </SidebarMenuButton>
            {isCollapsed ? (
              <ChevronRight className="ml-2 h-4 w-4" />
            ) : (
              <ChevronLeft className="ml-2 h-4 w-4" />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
