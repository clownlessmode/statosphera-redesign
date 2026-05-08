import { Logotype } from "@shared/ui/logotype";
import {
  BookOpenIcon,
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
  ChartColumn,
  //  MessageCircle,
  Tractor,
  Moon,
  ChartLine,
  ChartBarStacked,
  TreePine,
  MessageCircle,
  PersonStanding,
  BellPlus,
  Shield,
  FilePen,
  File,
  DoorOpen,
  Lightbulb,
  MailWarning,
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
import { useFarmer } from "@entities/farmer/api/controller";
import { useCallback } from "react";

const Sidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof SidebarComponent>) => {
  const { session } = useSession();
  const isMobile = useIsMobile();
  const { profileStatus } = useFarmer(session?.idUser, session?.role);
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
      ...(!isMobile
        ? [
            {
              title: "Отчёты",
              url:
                session?.role === ROLES.SERVICE_MANAGER
                  ? ROUTES_PATH.DASHBOARD
                  : `${ROUTES_PATH.REPORT}?open=true&tab=${tab}`,
              icon: FileChartColumn,
              children: [
                {
                  title: "Основные",
                  url:
                    session?.role === ROLES.SERVICE_MANAGER
                      ? ROUTES_PATH.DASHBOARD
                      : `${ROUTES_PATH.REPORT}?open=true&tab=${tab}`,
                  disabled: session?.role === ROLES.SERVICE_MANAGER,
                },
                {
                  title: "Списания",
                  url: `${ROUTES_PATH.WRITE_OFF}?tab=${tabWriteOff}&open=true`,
                },
                { title: "Парные продажи", url: ROUTES_PATH.SUMMARY },
                {
                  title: "Проект Лес",
                  url: ROUTES_PATH.FOREST,
                  disabled: session?.role === ROLES.MANAGER_STORE,
                },
              ],
            },
          ]
        : [
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
              title: "Списания",
              url: `${ROUTES_PATH.WRITE_OFF}?tab=${tabWriteOff}&open=true`,
              icon: ChartLine,
            },
            {
              title: "Парные продажи",
              url: ROUTES_PATH.SUMMARY,
              icon: ChartBarStacked,
            },
            {
              title: "Проект Лес",
              url: ROUTES_PATH.FOREST,
              icon: TreePine,
              disabled: session?.role === ROLES.MANAGER_STORE,
            },
          ]),

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
        title: "Отзывы",
        url: ROUTES_PATH.REVIEWS,
        icon: MessageCircle,
        disabled:
          session?.role !== ROLES.ADMIN &&
          ![
            2739, 101, 2812, 2869, 2870, 124, 10, 192, 2871, 2872, 2873, 2874,
          ].includes(session?.idUser ?? -1),
      },
      {
        title: "Посещаемость",
        url: ROUTES_PATH.ATTENDANCE,
        icon: PersonStanding,
        disabled:
          session?.role !== ROLES.ADMIN &&
          ![101, 191].includes(session?.idUser ?? -1),
      },
      {
        title: "Тест",
        url: ROUTES_PATH.TESTTT,
        icon: DoorOpen,
      },
      {
        title: "Проекты",
        url: ROUTES_PATH.PROJECTS,
        icon: File,
        disabled:
          session?.role !== ROLES.ADMIN &&
          ![2875, 2808, 2879].includes(session?.idUser ?? -1),
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
        title: "Ночные магазины",
        url: ROUTES_PATH.NIGHT_STORES,
        icon: Moon,
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
        allowedRoles: [ROLES.ADMIN],
        icon: Lightbulb,
      },
      {
        title: "Обратная связь",
        url: ROUTES_PATH.FEEDBACK,
        icon: MailWarning,
      },
      {
        title: "Фермеры",
        url: ROUTES_PATH.FARMERS,
        icon: Tractor,
        disabled:
          session?.role !== ROLES.FARMER_MANAGER &&
          session?.role !== ROLES.ADMIN,
      },
      ...(!isMobile
        ? [
            {
              title: "Админ панель",
              url: ROUTES_PATH.ADMIN_DIGESTS,
              icon: SettingsIcon,
              disabled:
                session?.role !== ROLES.ADMIN &&
                ![59, 156].includes(session?.idUser ?? -1),
              children: [
                {
                  title: "Дайджесты",
                  url: ROUTES_PATH.ADMIN_DIGESTS,
                  disabled:
                    session?.role !== ROLES.ADMIN &&
                    ![59, 156].includes(session?.idUser ?? -1),
                },
                {
                  title: "Уведомления",
                  url: ROUTES_PATH.ADMIN_NOTIFICATIONS,
                  disabled:
                    session?.role !== ROLES.ADMIN &&
                    ![156].includes(session?.idUser ?? -1),
                },
                {
                  title: "Роли голосования",
                  url: ROUTES_PATH.ADMIN_ROLES,
                  disabled: session?.role !== ROLES.ADMIN,
                },
              ],
            },
          ]
        : [
            {
              title: "Дайджесты (админ)",
              url: ROUTES_PATH.ADMIN_DIGESTS,
              icon: FilePen,
              disabled:
                session?.role !== ROLES.ADMIN &&
                ![59, 156].includes(session?.idUser ?? -1),
            },
            {
              title: "Уведомления (админ)",
              url: ROUTES_PATH.ADMIN_NOTIFICATIONS,
              icon: BellPlus,
              disabled:
                session?.role !== ROLES.ADMIN &&
                ![156].includes(session?.idUser ?? -1),
            },
            {
              title: "Роли голосования",
              url: ROUTES_PATH.ADMIN_ROLES,
              icon: Shield,
              disabled: session?.role !== ROLES.ADMIN,
            },
          ]),
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

  const dataExternalUser = {
    navMain: [
      {
        title: "Аналитика",
        url: ROUTES_PATH.ANALYTICS,
        icon: ChartColumn,
        disabled: session?.role !== ROLES.FARMER,
      },
      {
        title: "Проект Лес",
        url: ROUTES_PATH.FOREST,
        icon: TreePine,
        disabled: session?.role !== ROLES.FOREST,
      },
      //{
      //  title: "Чаты",
      //  url: "#",
      //  icon: MessageCircle,
      //  disabled: session?.role !== ROLES.FARMER,
      //},
      {
        title: "Дайджесты",
        url: ROUTES_PATH.DIGESTS,
        icon: FileChartPieIcon,
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
  const isCollapsed = state === "collapsed";

  const isExternalUser =
    session?.role === ROLES.FARMER || session?.role === ROLES.FOREST;

  const getNavMainItems = useCallback(() => {
    if (session?.role === ROLES.ADMIN) {
      return data.navMain;
    }

    if (isExternalUser) {
      return dataExternalUser.navMain.filter(
        (item) => item.disabled === false || item.disabled === undefined,
      );
    }

    return data.navMain.filter(
      (item) => item.disabled === false || item.disabled === undefined,
    );
  }, [session?.role, isMobile]);

  const getNavSecondaryItems = useCallback(() => {
    if (session?.role === ROLES.ADMIN) {
      return data.navSecondary;
    }

    if (isExternalUser) {
      return dataExternalUser.navSecondary.filter(
        (item) => item.disabled === false || item.disabled === undefined,
      );
    }

    return data.navSecondary.filter(
      (item) => item.disabled === false || item.disabled === undefined,
    );
  }, [session?.role, isMobile]);

  return (
    <>
      {session &&
        ((session?.role === ROLES.FARMER && profileStatus) ||
          session?.role !== ROLES.FARMER) && (
          <SidebarComponent collapsible="icon" {...props}>
            {isMobile && !isExternalUser && (
              <Link onClick={toggleSidebar} to="/" className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </Link>
            )}
            {isMobile && isExternalUser && (
              <div onClick={toggleSidebar} className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </div>
            )}
            {!isMobile && !isExternalUser && (
              <Link to="/" className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </Link>
            )}
            {!isMobile && isExternalUser && (
              <div className="py-2 pl-2">
                <Logotype size={isCollapsed ? "sm" : "md"} />
              </div>
            )}
            <SidebarContent>
              <NavMain items={getNavMainItems()} />
            </SidebarContent>
            <SidebarRail />
            <SidebarMenu>
              <NavSecondary
                items={getNavSecondaryItems()}
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
