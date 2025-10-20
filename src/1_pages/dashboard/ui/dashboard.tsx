import { Header } from "@widgets/header";
import { useDashboardData } from "../api/controller";
import { lazy, Suspense, useMemo, ReactNode } from "react";

import { DashboardJoyride } from "./dashboard-joyride";
import WeeklyRevenueSkeleton from "@widgets/dashboard/weekly-revenue/ui/weekly-revenue-skeleton";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { DraggableWidget } from "@shared/ui/draggable-widget";
import { useDashboardLayout } from "@shared/hooks/use-dashboard-layout";
import MarginSkeleton from "@widgets/dashboard/margin/ui/margin-skeleton";
import MarkupSkeleton from "@widgets/dashboard/markup/ui/markup-skeleton";
import WriteOffIndicatorSkeleton from "@widgets/dashboard/write-offs-indicator/ui/write-offs-indicator-skeleton";
import ChannelRevenueSkeleton from "@widgets/dashboard/channel-revenue/ui/channel-revenue-skeleton";
import SalesStructureSkeleton from "@widgets/dashboard/sales-structure/sales-structure-skeleton";
import CurrentRevenueSkeleton from "@widgets/dashboard/current-revenue/current-revenue-skeleton";
import CurrentCheckSkeleton from "@widgets/dashboard/current-check/current-check-skeleton";
import AverageCheckSkeleton from "@widgets/dashboard/avarage-check/avarage-check-skeleton";
import TopWriteOffSkeleton from "@widgets/dashboard/top-writeoffs/top-writeoffs-skeleton";
import TodayCheckSkeleton from "@widgets/dashboard/today-check/today-check-skeleton";
import TodayRevenueSkeleton from "@widgets/dashboard/today-revenue/today-revenue-skeleton";
import AntiLoyalTopSkeleton from "@widgets/dashboard/anti-loyal-top/anti-loyal-top-skeleton";
import PlanPercentSkeleton from "@widgets/dashboard/plan-percent/plan-precent-skeleton";
import HoursRevenueSkeleton from "@widgets/dashboard/hours-revenue/hours-revenue-skeleton";
import LoyaltySkeleton from "@widgets/dashboard/loaylty/loyalty-skeleton";
import ImRevenueSkeleton from "@widgets/dashboard/im-revenue/im-revenue-skeleton";
import LeaderImSalesSkeleton from "@widgets/dashboard/leader-im-sales/leader-im-sales-skeleton";
import { Nps } from "@widgets/dashboard/nps";
import { ROLES } from "@shared/constants/roles";
import { useSession } from "@entities/session";
import { userMessages } from "./test";
import { FlyingHearts } from "@widgets/dashboard/flying-hearts";
import { CursorTrail } from "@widgets/dashboard/cursor-trail";
import { useEffectsSettings } from "@shared/hooks/use-effects-settings";
import { hasEffectsAccess } from "@shared/constants/effects-users";
const WeeklyRevenue = lazy(
  () => import("@widgets/dashboard/weekly-revenue/ui/weekly-revenue"),
);
const WriteOffIndicator = lazy(
  () =>
    import("@widgets/dashboard/write-offs-indicator/ui/write-offs-indicator"),
);
const WriteOffHouseholds = lazy(
  () =>
    import("@widgets/dashboard/write-offs-households/ui/write-off-households"),
);

const ChannelRevenue = lazy(
  () => import("@widgets/dashboard/channel-revenue/ui/channel-revenue"),
);
const SalesStructure = lazy(
  () => import("@widgets/dashboard/sales-structure/sales-structure"),
);
const CurrentRevenue = lazy(
  () => import("@widgets/dashboard/current-revenue/current-revenue"),
);
const CurrentCheck = lazy(
  () => import("@widgets/dashboard/current-check/current-check"),
);
const AverageCheck = lazy(
  () => import("@widgets/dashboard/avarage-check/avarage-check"),
);
const WriteoffsLeaders = lazy(
  () => import("@widgets/dashboard/writeoffs-leaders/writeoffs-leaders"),
);
const Loyalty = lazy(() => import("@widgets/dashboard/loaylty/loyalty"));
const ImRevenue = lazy(
  () => import("@widgets/dashboard/im-revenue/im-revenue"),
);
const LeaderImSales = lazy(
  () => import("@widgets/dashboard/leader-im-sales/leader-im-sales"),
);
const HoursRevenue = lazy(
  () => import("@widgets/dashboard/hours-revenue/hours-revenue"),
);
const PlanPercent = lazy(
  () => import("@widgets/dashboard/plan-percent/plan-percent"),
);
const TopWriteoffs = lazy(
  () => import("@widgets/dashboard/top-writeoffs/top-writeoffs"),
);
const AntiLoyalTop = lazy(
  () => import("@widgets/dashboard/anti-loyal-top/anti-loyal-top"),
);
const TodayRevenue = lazy(
  () => import("@widgets/dashboard/today-revenue/today-revenue"),
);
const TodayCheck = lazy(
  () => import("@widgets/dashboard/today-check/today-check"),
);

const Margin = lazy(() => import("@widgets/dashboard/margin/ui/margin"));
const Markup = lazy(() => import("@widgets/dashboard/markup/ui/markup"));
const Dashboard = () => {
  const { dashboard, isDashboardLoading } = useDashboardData();
  const { session } = useSession();
  const { settings: effectsSettings } = useEffectsSettings();

  // Проверяем, есть ли доступ к эффектам для текущего пользователя
  const userHasEffectsAccess = hasEffectsAccess(session?.idUser);

  // Проверяем, есть ли для текущего пользователя персональные фразы
  const userPhrases = session?.idUser
    ? userMessages[session.idUser]
    : undefined;
  const hasPersonalMessages =
    !!userPhrases &&
    userHasEffectsAccess &&
    effectsSettings.personalMessagesEnabled;

  const randomMessage = useMemo(() => {
    if (!userPhrases) return null;
    return userPhrases[Math.floor(Math.random() * userPhrases.length)];
  }, [userPhrases]); // Перевычисляем при смене пользователя

  // Определяем все виджеты с уникальными ID
  const allWidgets = [
    "weeklyRevenue",
    "nps",
    "channelRevenue",
    "stats",
    "salesStructure",
    "currentStats",
    "writeoffsLeaders",
    "loyaltyOrWriteOff",
    "hoursRevenue",
    "planPercent",
    "topWriteoffs",
    "todayStats",
    "antiLoyalTop",
  ];

  const { items: widgetOrder, setItems: setWidgetOrder } =
    useDashboardLayout(allWidgets);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setWidgetOrder((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Создаем маппинг виджетов
  const widgetsMap: Record<string, ReactNode> = {
    weeklyRevenue: (
      <div data-widget="weeklyRevenue" data-testid="widget-revenue">
        <Suspense fallback={<WeeklyRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.salesSevenDays ? (
            <WeeklyRevenue
              data={dashboard.salesSevenDays}
              isLoading={isDashboardLoading}
            />
          ) : (
            <WeeklyRevenueSkeleton />
          )}
        </Suspense>
      </div>
    ),
    nps: (
      <div data-widget="nps">
        <div data-testid="widget-nps">
          <Nps />
        </div>
      </div>
    ),
    channelRevenue: (
      <div data-widget="channelRevenue">
        <Suspense fallback={<ChannelRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.salesChannel ? (
            <ChannelRevenue
              isLoading={isDashboardLoading}
              data={dashboard.salesChannel}
            />
          ) : (
            <ChannelRevenueSkeleton />
          )}
        </Suspense>
      </div>
    ),
    stats: (
      <div data-widget="stats" className="flex flex-col gap-2 h-fit ">
        <div className="flex flex-row gap-2">
          <div
            data-widget="margin"
            data-testid="widget-margin"
            className="w-full h-full"
          >
            <Suspense fallback={<MarginSkeleton />}>
              {!isDashboardLoading && dashboard?.curentMarzha?.data?.[0] ? (
                <Margin
                  isLoading={isDashboardLoading}
                  data={dashboard.curentMarzha.data[0].marginPercent}
                />
              ) : (
                <MarginSkeleton />
              )}
            </Suspense>
          </div>
          <div
            data-widget="markup"
            data-testid="widget-markup"
            className="w-full h-full"
          >
            <Suspense fallback={<MarkupSkeleton />}>
              {!isDashboardLoading && dashboard?.curentMarkup?.data?.[0] ? (
                <Markup
                  isLoading={isDashboardLoading}
                  percent={dashboard.curentMarkup.data[0].markupPercent}
                  proceeds={dashboard.curentMarkup.data[0].profit}
                />
              ) : (
                <MarkupSkeleton />
              )}
            </Suspense>
          </div>
        </div>
        <div
          data-widget="writeOffIndicator"
          data-testid="widget-writeoff-indicator"
        >
          <Suspense fallback={<WriteOffIndicatorSkeleton />}>
            {!isDashboardLoading && dashboard?.curentWriteOff?.data?.[0] ? (
              <WriteOffIndicator
                negative={dashboard.curentWriteOff.data[0].negative}
                isLoading={isDashboardLoading}
                writeOff={dashboard.curentWriteOff.data[0].writeOff}
                writeOffPercent={
                  dashboard.curentWriteOff.data[0].writeOffPercent
                }
                writeOffYoY={dashboard.curentWriteOff.data[0].writeOffYoY}
                writeOffYoYPercent={
                  dashboard.curentWriteOff.data[0].writeOffYoYPercent
                }
              />
            ) : (
              <WriteOffIndicatorSkeleton />
            )}
          </Suspense>
        </div>
        {session?.role == ROLES.OFFICE_MM && (
          <div
            data-widget="loyalty"
            data-testid="widget-loyalty"
            className="h-full"
          >
            <Suspense fallback={<LoyaltySkeleton />}>
              {!isDashboardLoading && dashboard?.curentAppLoyal?.data?.[0] ? (
                <Loyalty
                  isLoading={isDashboardLoading}
                  appLoyalPercent={
                    dashboard.curentAppLoyal.data[0].appLoyalPercent
                  }
                  checkLoyal={dashboard.curentAppLoyal.data[0].checkLoyal}
                />
              ) : (
                <LoyaltySkeleton />
              )}
            </Suspense>
          </div>
        )}
        {session?.role !== ROLES.OFFICE_MM && (
          <Suspense fallback={<WriteOffIndicatorSkeleton />}>
            {!isDashboardLoading && dashboard?.curentHouseHold?.data?.[0] ? (
              <WriteOffHouseholds
                negative={dashboard.curentHouseHold.data[0].negative}
                isLoading={isDashboardLoading}
                householdGoods={
                  dashboard.curentHouseHold.data[0].householdGoods
                }
                householdGoodsPercent={
                  dashboard.curentHouseHold.data[0].householdGoodsPercent
                }
                householdGoodsYoY={
                  dashboard.curentHouseHold.data[0].householdGoodsYoY
                }
                householdGoodsYoYPercent={
                  dashboard.curentHouseHold.data[0].householdGoodsYoYPercent
                }
              />
            ) : (
              <WriteOffIndicatorSkeleton />
            )}
          </Suspense>
        )}
      </div>
    ),
    salesStructure: (
      <div data-widget="salesStructure" data-testid="widget-sales-structure">
        <Suspense fallback={<SalesStructureSkeleton />}>
          {!isDashboardLoading && dashboard?.salesStructure ? (
            <SalesStructure
              isLoading={isDashboardLoading}
              data={dashboard.salesStructure}
            />
          ) : (
            <SalesStructureSkeleton />
          )}
        </Suspense>
      </div>
    ),
    currentStats: (
      <div className="flex flex-col gap-2 h-full" data-testid="widget-orders">
        <Suspense fallback={<CurrentRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.curentMonth?.data?.[0] ? (
            <CurrentRevenue
              isLoading={isDashboardLoading}
              proceeds={dashboard.curentMonth.data[0].proceeds}
              proceedsYoY={dashboard.curentMonth.data[0].proceedsYoY}
              proceedsYoYPercent={
                dashboard.curentMonth.data[0].proceedsYoYPercent
              }
            />
          ) : (
            <CurrentRevenueSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<CurrentCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.curentCheck?.data?.[0] ? (
            <CurrentCheck
              negative={dashboard.curentCheck.data[0].negative}
              isLoading={isDashboardLoading}
              check={dashboard.curentCheck.data[0].check}
              checkYoY={dashboard.curentCheck.data[0].checkYoY}
              checkYoYPercent={dashboard.curentCheck.data[0].checkYoYPercent}
            />
          ) : (
            <CurrentCheckSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<AverageCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.curentAvgCheck?.data?.[0] ? (
            <AverageCheck
              negative={dashboard.curentAvgCheck.data[0].negative}
              isLoading={isDashboardLoading}
              avgCheck={dashboard.curentAvgCheck.data[0].avgCheck}
              avgCheckYoY={dashboard.curentAvgCheck.data[0].avgCheckYoY}
              avgCheckYoYPercent={
                dashboard.curentAvgCheck.data[0].avgCheckYoYPercent
              }
            />
          ) : (
            <AverageCheckSkeleton />
          )}
        </Suspense>
      </div>
    ),
    writeoffsLeaders: (
      <div
        data-widget="writeoffsLeaders"
        data-testid="widget-writeoffs-leaders"
      >
        <Suspense fallback={<TopWriteOffSkeleton />}>
          {!isDashboardLoading && dashboard?.leaderWriteOffs ? (
            <WriteoffsLeaders
              data={dashboard.leaderWriteOffs}
              isLoading={isDashboardLoading}
            />
          ) : (
            <TopWriteOffSkeleton />
          )}
        </Suspense>
      </div>
    ),
    loyaltyOrWriteOff:
      session?.role !== ROLES.OFFICE_MM ? (
        <div
          data-widget="loyaltyOrWriteOff"
          className="flex flex-col gap-2 h-full"
          data-testid="widget-customers"
        >
          <div
            data-widget="loyaltyCard"
            data-testid="widget-loyalty"
            className="h-full"
          >
            <Suspense fallback={<LoyaltySkeleton />}>
              {!isDashboardLoading && dashboard?.curentAppLoyal?.data?.[0] ? (
                <Loyalty
                  isLoading={isDashboardLoading}
                  appLoyalPercent={
                    dashboard.curentAppLoyal.data[0].appLoyalPercent
                  }
                  checkLoyal={dashboard.curentAppLoyal.data[0].checkLoyal}
                />
              ) : (
                <LoyaltySkeleton />
              )}
            </Suspense>
          </div>
          <div
            data-widget="imRevenue"
            data-testid="widget-im-revenue"
            className="h-full"
          >
            <Suspense fallback={<ImRevenueSkeleton />}>
              {!isDashboardLoading && dashboard?.currentCardIm?.data?.[0] ? (
                <ImRevenue
                  negative={dashboard.currentCardIm.data[0].negative}
                  isLoading={isDashboardLoading}
                  proceedsIm={dashboard.currentCardIm.data[0].proceedsIm}
                  proceedsImYoY={dashboard.currentCardIm.data[0].proceedsImYoY}
                  proceedsImYoYPercent={
                    dashboard.currentCardIm.data[0].proceedsImYoYPercent
                  }
                />
              ) : (
                <ImRevenueSkeleton />
              )}
            </Suspense>
          </div>
          <div
            data-widget="leaderImSales"
            data-testid="widget-leader-im-sales"
            className="h-full"
          >
            <Suspense fallback={<LeaderImSalesSkeleton />}>
              {!isDashboardLoading && dashboard?.bestCardIm?.data?.[0] ? (
                <LeaderImSales
                  isLoading={isDashboardLoading}
                  idStore={dashboard.bestCardIm.data[0].idStore}
                  proceedsIm={dashboard.bestCardIm.data[0].proceedsIm}
                  storeName={dashboard.bestCardIm.data[0].storeName}
                />
              ) : (
                <LeaderImSalesSkeleton />
              )}
            </Suspense>
          </div>
        </div>
      ) : null,
    hoursRevenue: (
      <div data-widget="hoursRevenue" data-testid="chart-widget">
        <Suspense fallback={<HoursRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.salesHours?.data?.graph ? (
            <HoursRevenue
              isLoading={isDashboardLoading}
              data={dashboard.salesHours.data.graph}
            />
          ) : (
            <HoursRevenueSkeleton />
          )}
        </Suspense>
      </div>
    ),
    planPercent:
      session?.role !== ROLES.OFFICE_MM ? (
        <div data-widget="planPercent" data-testid="widget-plan-percent">
          <Suspense fallback={<PlanPercentSkeleton />}>
            {!isDashboardLoading && dashboard?.cardOneExe?.data?.[0] ? (
              <PlanPercent
                isLoading={isDashboardLoading}
                planAvgCheckForecastPercent={
                  dashboard.cardOneExe.data[0].planAvgCheckForecastPercent
                }
                planCheckForecastPercent={
                  dashboard.cardOneExe.data[0].planCheckForecastPercent
                }
                planProceedsForecastPercent={
                  dashboard.cardOneExe.data[0].planProceedsForecastPercent
                }
                planProceedsQcForecastPercent={
                  dashboard.cardOneExe.data[0].planProceedsQcForecastPercent ||
                  null
                }
                planShareOfPaymentsQcForecastPercent={
                  dashboard.cardOneExe.data[0]
                    .planShareOfPaymentsQcForecastPercent || null
                }
              />
            ) : (
              <PlanPercentSkeleton />
            )}
          </Suspense>
        </div>
      ) : null,
    topWriteoffs: (
      <div data-widget="topWriteoffs" data-testid="widget-top-writeoffs">
        <Suspense fallback={<TopWriteOffSkeleton />}>
          {!isDashboardLoading && dashboard?.topWriteOff ? (
            <TopWriteoffs
              isLoading={isDashboardLoading}
              data={dashboard.topWriteOff}
            />
          ) : (
            <TopWriteOffSkeleton />
          )}
        </Suspense>
      </div>
    ),
    todayStats: (
      <div
        data-widget="todayStats"
        data-testid="widget-today-stats"
        className="flex flex-col gap-2 h-full"
      >
        <Suspense fallback={<TodayRevenueSkeleton />}>
          {!isDashboardLoading && dashboard?.salesHours?.data?.card1 ? (
            <TodayRevenue
              isLoading={isDashboardLoading}
              negative={dashboard.salesHours.data.card1.negative}
              proceedsTotal={dashboard.salesHours.data.card1.proceedsTotal}
              proceedsWoYPercent={
                dashboard.salesHours.data.card1.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard.salesHours.data.card1.weekAgoProceedsTotal
              }
            />
          ) : (
            <TodayRevenueSkeleton />
          )}
        </Suspense>
        <Suspense fallback={<TodayCheckSkeleton />}>
          {!isDashboardLoading && dashboard?.salesHours?.data?.card2 ? (
            <TodayCheck
              isLoading={isDashboardLoading}
              negative={dashboard.salesHours.data.card2.negative}
              proceedsTotal={dashboard.salesHours.data.card2.proceedsTotal}
              proceedsWoYPercent={
                dashboard.salesHours.data.card2.proceedsWoWPercent
              }
              weekAgoProceedsTotal={
                dashboard.salesHours.data.card2.weekAgoProceedsTotal
              }
            />
          ) : (
            <TodayCheckSkeleton />
          )}
        </Suspense>
      </div>
    ),
    antiLoyalTop: (
      <div data-widget="antiLoyalTop" data-testid="widget-anti-loyal-top">
        <Suspense fallback={<AntiLoyalTopSkeleton />}>
          {!isDashboardLoading && dashboard?.antitopLoyalApp?.data ? (
            <AntiLoyalTop
              isLoading={isDashboardLoading}
              data={dashboard.antitopLoyalApp.data as any}
            />
          ) : (
            <AntiLoyalTopSkeleton />
          )}
        </Suspense>
      </div>
    ),
  };

  return (
    <DashboardJoyride>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
          <div className="dashboard-header" data-testid="header">
            <Header title="Главная" />
          </div>
          {/* Анимации для пользователей с доступом к эффектам */}
          {userHasEffectsAccess && (
            <>
              <FlyingHearts userId={session?.idUser} />
              <CursorTrail userId={session?.idUser} />
            </>
          )}
          <SortableContext items={widgetOrder} strategy={rectSortingStrategy}>
            <div
              className="rounded-3xl h-full bg-background p-4 gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
              data-testid="widget-grid"
            >
              {hasPersonalMessages && (
                <div
                  className={`col-span-3 border-2 rounded-3xl p-10 font-black text-center text-balance flex justify-center items-center ${effectsSettings.personalMessagesStyle.fontSize}`}
                  style={{
                    backgroundColor:
                      effectsSettings.personalMessagesStyle.backgroundColor,
                    borderColor:
                      effectsSettings.personalMessagesStyle.borderColor,
                    color: effectsSettings.personalMessagesStyle.textColor,
                  }}
                >
                  {randomMessage}
                </div>
              )}
              {widgetOrder.map((widgetId) => {
                const widget = widgetsMap[widgetId];
                // Пропускаем виджеты которые null (зависят от роли)
                if (!widget) return null;

                return (
                  <DraggableWidget key={widgetId} id={widgetId}>
                    {widget}
                  </DraggableWidget>
                );
              })}
            </div>
          </SortableContext>
        </div>
      </DndContext>
    </DashboardJoyride>
  );
};

export default Dashboard;
