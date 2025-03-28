import { Logotype } from "@shared/ui/logotype";
import {
  BookOpenIcon,
  ChartPie,
  DollarSign,
  FileChartColumn,
  FileChartPieIcon,
  FileQuestion,
  Ham,
  MapIcon,
  PanelsTopLeft,
  SettingsIcon,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  UsersIcon,
} from "lucide-react";
import { Link } from "react-router";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarMenu,
  SidebarRail,
  useSidebar,
} from "@shared/ui/sidebar";
import { NavMain } from "./nav-main";

import { NavSecondary } from "./nav-secondary";
import { ROUTES_PATH } from "@app/router/routes";

const Sidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const data = {
    navMain: [
      {
        title: "Продажи",
        url: "#",
        icon: DollarSign,
      },
      {
        title: "Дайджесты",
        url: ROUTES_PATH.DIGESTS,
        icon: FileChartPieIcon,
      },
      {
        title: "Стандарты",
        url: ROUTES_PATH.STANDARTS,
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
        url: ROUTES_PATH.STORES,
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

    navSecondary: [
      {
        title: "Обучение",
        url: ROUTES_PATH.LESSONS,
        icon: BookOpenIcon,
      },
      {
        title: "Дорожка карта",
        url: ROUTES_PATH.ROADMAP,
        icon: MapIcon,
        disabled: true,
      },
    ],
  };
  const { toggleSidebar, state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <>
      <SidebarComponent collapsible="icon" {...props}>
        <Link to="/" className="py-2 pl-2">
          <Logotype size={isCollapsed ? "sm" : "md"} />
        </Link>
        <SidebarContent>
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarRail />
        <SidebarMenu>
          <NavSecondary
            items={data.navSecondary}
            isCollapsed={isCollapsed}
            toggleSidebar={toggleSidebar}
            className="mt-auto"
          />
        </SidebarMenu>
      </SidebarComponent>

      {children}
    </>
  );
};

export default Sidebar;
