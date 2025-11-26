import { Logotype } from "@shared/ui/logotype";
import {
  BookOpenIcon,
  ChartBarStacked,
  ChartLine,
  DollarSign,
  FileChartColumn,
  FileChartPieIcon,
  Globe,
  // FileQuestion,
  Ham,
  Heart,
  MapIcon,
  PanelsTopLeft,
  SettingsIcon,
  ShoppingBag,
  SlidersHorizontal,
  Store,
  Vote,
  ChartColumn,
  MessageCircle,
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
import { useSession } from "@entities/session";

import { ROLES } from "@shared/constants/roles";
import { useTabStore } from "@widgets/report/sheet/model/url-store";
import { useTabStore as useTabStoreWriteOff } from "@widgets/write-off/sheet/model/url-store";
import { useIsMobile } from "@shared/hooks/use-mobile";

const Sidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const { session } = useSession();
  const { tab } = useTabStore();
  const { tab: tabWriteOff } = useTabStoreWriteOff();
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
      // {
      //   title: "Стандарты",
      //   url:
      //     session?.role === ROLES.SERVICE_MANAGER
      //       ? ROUTES_PATH.DASHBOARD
      //       : ROUTES_PATH.STANDARTS,
      //   icon: FileQuestion,
      //   disabled: session?.role === ROLES.SERVICE_MANAGER,
      // },

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
        title: "Лояльность",
        url: ROUTES_PATH.LOYALTY,
        icon: Heart,
      },
      {
        title: "Списания",
        url: `${ROUTES_PATH.WRITE_OFF}?tab=${tabWriteOff}&open=true`,
        icon: ChartLine,
      },
      // Поменять роль
      {
        title: "Парные продажи",
        url: ROUTES_PATH.SUMMARY,
        icon: ChartBarStacked,
      },
      {
        title: "Интернет-магазин",
        url: ROUTES_PATH.IM,
        icon: ShoppingBag,
        disabled: false,
      },
      {
        title: "Мониторинг сетей",
        url: ROUTES_PATH.MONITORING,
        icon: Globe,
      },
      {
        title: "Гриль",
        url: ROUTES_PATH.GRILL,
        disabled: true,
        icon: Ham,
      },
      {
        title: "Предложения",
        url: ROUTES_PATH.DEMOCRACY,
        disabled: true,
        allowedRoles: [ROLES.ADMIN],
        icon: Vote,
      },

      {
        title: "Админ панель",
        url: ROUTES_PATH.ADMIN_DIGESTS,
        icon: SettingsIcon,
        disabled: session?.role !== ROLES.ADMIN,
        children: [
          { title: "Дайджесты", url: ROUTES_PATH.ADMIN_DIGESTS },
          { title: "Уведомления", url: ROUTES_PATH.ADMIN_NOTIFICATIONS },
          { title: "Роли голосования", url: ROUTES_PATH.ADMIN_ROLES },
        ],
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
        disabled: false,
      },
      {
        title: "Дорожка карта",
        url: ROUTES_PATH.ROADMAP,
        icon: MapIcon,
        disabled: true,
      },
      {
        title: "Настройки",
        url: ROUTES_PATH.SETTINGS,
        icon: SettingsIcon,
        disabled: false,
      },
    ],
  };

  const dataFarmer = {
    navMain: [
      {
        title: "Аналитика",
        url: ROUTES_PATH.ANALYTICS,
        allowedRoles: [ROLES.ADMIN],
        icon: ChartColumn,
      },
      {
        title: "Чаты",
        url: ROUTES_PATH.CHAT,
        icon: MessageCircle,
      },
    ],

    navSecondary: [
      {
        title: "Настройки",
        url: ROUTES_PATH.SETTINGS,
        icon: SettingsIcon,
        disabled: false,
      },
    ],
  };

  const { toggleSidebar, state } = useSidebar();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed";

  return (
    <>
      {session && (
        <SidebarComponent collapsible="icon" {...props}>
          {isMobile ? (
            session?.role !== ROLES.FARMER ? (
              <Link onClick={toggleSidebar} to="/" className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </Link>
            ) : (
              <div onClick={toggleSidebar} className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </div>
            )
          ) : session?.role !== ROLES.FARMER ? (
            <Link to="/" className="py-2 pl-2">
              <Logotype size={isCollapsed ? "sm" : "md"} />
            </Link>
          ) : (
            <div className="py-2 pl-2">
              <Logotype size={isCollapsed ? "sm" : "md"} />
            </div>
          )}
          <SidebarContent>
            <NavMain
              items={
                session?.role === ROLES.FARMER
                  ? dataFarmer.navMain
                  : data.navMain
              }
            />
          </SidebarContent>
          <SidebarRail />
          <SidebarMenu>
            <NavSecondary
              items={
                session?.role === ROLES.FARMER
                  ? dataFarmer.navSecondary
                  : data.navSecondary
              }
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
