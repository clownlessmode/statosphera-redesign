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
import { useSession } from "@entities/session";
import { ROLES } from "@shared/constants/roles";
const Sidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const { session } = useSession();
  const { tab } = useTabStore();
  const data = {
    navMain: [
      {
        title: "Продажи",
        url:
          session?.role === ROLES.SERVICE_MANAGER
            ? ROUTES_PATH.DASHBOARD
            : `${ROUTES_PATH.SALES_DYNAMICS}?open=false&tab=${tab}`,
        icon: DollarSign,
        disabled: session?.role === ROLES.SERVICE_MANAGER,
      },
      {
        title: "Отчёты",
        url:
          session?.role === ROLES.SERVICE_MANAGER
            ? ROUTES_PATH.DASHBOARD
            : `${ROUTES_PATH.REPORT}?open=true&tab=${tab}`,
        icon: FileChartColumn,
        disabled: session?.role === ROLES.SERVICE_MANAGER,
      },
      {
        title: "Дайджесты",
        url: ROUTES_PATH.DIGESTS,
        icon: FileChartPieIcon,
      },
      {
        title: "Стандарты",
        url:
          session?.role === ROLES.SERVICE_MANAGER
            ? ROUTES_PATH.DASHBOARD
            : ROUTES_PATH.STANDARTS,
        icon: FileQuestion,
        disabled: session?.role === ROLES.SERVICE_MANAGER,
      },

      {
        title: "Справочник магазинов",
        url: ROUTES_PATH.STORES,
        icon: Store,
      },
      {
        title: "Номенклатура",
        url:
          session?.role === ROLES.SERVICE_MANAGER
            ? ROUTES_PATH.DASHBOARD
            : ROUTES_PATH.PRODUCTS,
        icon: PanelsTopLeft,
        disabled: session?.role === ROLES.SERVICE_MANAGER,
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
      {session && (
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
      )}

      {children}
    </>
  );
};

export default Sidebar;
