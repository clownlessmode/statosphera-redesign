import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { Send, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { useAdminNotifications } from "@entities/notifications";
import { cn } from "@shared/lib/utils";

export const NotificationStats = () => {
  const { stats, isStatsLoading } = useAdminNotifications();

  if (isStatsLoading) {
    return (
      <div className="flex flex-row w-full justify-between gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-2" />
              <div className="h-3 w-20 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Всего уведомлений",
      value: stats?.total_count || 0,
      icon: Send,
      color: "text-blue-600",
    },
    {
      title: "Прочитано",
      value: stats?.read_count || 0,
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Непрочитано",
      value: stats?.unread_count || 0,
      icon: EyeOff,
      color: "text-orange-600",
    },
    {
      title: "Процент прочтения",
      value: stats?.total_count
        ? Math.round((stats.read_count / stats.total_count) * 100)
        : 0,
      icon: AlertTriangle,
      color: "text-purple-600",
      suffix: "%",
    },
  ];

  return (
    <div className="flex flex-row w-full justify-between gap-4">
      {statsData.map((stat) => (
        <Card key={stat.title} className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={cn("h-4 w-4", stat.color)} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stat.value.toLocaleString()}
              {stat.suffix || ""}
            </div>
            <div className="flex items-center gap-2 mt-1">
              {stat.title === "Процент прочтения" && (
                <Badge
                  variant={
                    stat.value >= 80
                      ? "default"
                      : stat.value >= 60
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {stat.value >= 80
                    ? "Отлично"
                    : stat.value >= 60
                      ? "Хорошо"
                      : "Низко"}
                </Badge>
              )}
              {stat.title === "Непрочитано" && stat.value > 0 && (
                <Badge variant="destructive" className="text-xs">
                  Требует внимания
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
