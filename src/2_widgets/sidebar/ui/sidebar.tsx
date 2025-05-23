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
import { useTabStore } from "@widgets/report/sheet/model/url-store";
const Sidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const { tab } = useTabStore();
  const data = {
    navMain: [
      {
        title: "Продажи",
        url: `${ROUTES_PATH.SALES_DYNAMICS}?open=false&tab=${tab}`,
        icon: DollarSign,
      },
      {
        title: "Отчёты",
        url: `${ROUTES_PATH.REPORT}?open=true&tab=${tab}`,
        icon: FileChartColumn,
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
        title: "Справочник магазинов",
        url: ROUTES_PATH.STORES,
        icon: Store,
      },
      {
        title: "Номенклатура",
        url: "#", //ROUTES_PATH.PRODUCTS,
        icon: PanelsTopLeft,
        disabled: true,
      },
      {
        title: "Гриль",
        url: "#", //ROUTES_PATH.GRILL,
        icon: Ham,
        disabled: true,
      },

      {
        title: "Настройки",
        url: "#",
        icon: SettingsIcon,
        disabled: true,
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
        disabled: true,
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
