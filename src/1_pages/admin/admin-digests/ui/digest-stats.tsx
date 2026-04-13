import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { FileText, Eye, EyeOff, AlertTriangle, Tractor } from "lucide-react";
import { useDigests } from "@entities/digests";
import { cn } from "@shared/lib/utils";

export const DigestStats = () => {
  const { digests, isDigestsLoading } = useDigests();

  if (isDigestsLoading) {
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

  const typeCounts =
    digests?.reduce(
      (acc, digest) => {
        acc[digest.type] = (acc[digest.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    ) || {};

  const statsData = [
    {
      title: "Всего дайджестов",
      value: digests?.length || 0,
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Аналитика",
      value: typeCounts.analytics || 0,
      icon: Eye,
      color: "text-green-600",
    },
    {
      title: "Совет директоров",
      value: typeCounts.director || 0,
      icon: EyeOff,
      color: "text-orange-600",
    },
    {
      title: "Группа компаний",
      value: typeCounts.groupCompany || 0,
      icon: AlertTriangle,
      color: "text-purple-600",
    },
    {
      title: "Фермеры",
      value: typeCounts.farmers || 0,
      icon: Tractor,
      color: "text-pink-600",
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
            </div>
            <div className="flex items-center gap-2 mt-1">
              {stat.value > 0 && (
                <Badge variant="default" className="text-xs">
                  Активно
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
