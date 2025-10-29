import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { BarChart3, Users, Shield, TrendingUp } from "lucide-react";
import { UserRole, UserRoleConfig, User } from "@shared/types/roles";
import { adminRolesController } from "../api";

interface RolesStatsProps {
  roles: UserRole[];
  users: User[];
  userRoleConfigs: UserRoleConfig[];
}

export const RolesStats: React.FC<RolesStatsProps> = ({
  roles,
  users,
  userRoleConfigs,
}) => {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalRoles: number;
    roleDistribution: Array<{
      roleId: string;
      roleName: string;
      count: number;
      percentage: number;
    }>;
  } | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await adminRolesController.getVotingRolesStats();
        setStats(statsData);
      } catch (error) {
        console.error("Ошибка загрузки статистики:", error);
      }
    };

    loadStats();
  }, [roles, users, userRoleConfigs]);

  const getRoleUsageStats = () => {
    return roles.map((role) => ({
      roleId: role.id,
      roleName: role.name,
      count: userRoleConfigs.filter((ur) => ur.roleId === role.id).length,
      percentage:
        users.length > 0
          ? Math.round(
              (userRoleConfigs.filter((ur) => ur.roleId === role.id).length /
                users.length) *
                100,
            )
          : 0,
    }));
  };

  const roleUsageStats = getRoleUsageStats();

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-lg">Загрузка статистики...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Статистика ролей</h2>
        <p className="text-muted-foreground">
          Общая информация о системе ролей
        </p>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего ролей</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRoles}</div>
            <p className="text-xs text-muted-foreground">Ролей в системе</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Всего пользователей
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Пользователей в системе
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Активных ролей
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.roleDistribution.filter((r) => r.count > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Ролей с назначениями
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Популярная роль
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {
                stats.roleDistribution.reduce(
                  (max, role) => (role.count > max.count ? role : max),
                  { count: 0, roleName: "Нет данных" },
                ).roleName
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Наиболее используемая
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Детальная статистика по ролям */}
      <Card>
        <CardHeader>
          <CardTitle>Использование ролей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roleUsageStats.map((stat) => (
              <div key={stat.roleId} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{stat.roleName}</span>
                    <Badge variant="outline">{stat.count} пользователей</Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {stat.percentage}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Таблица с детальной информацией */}
      <Card>
        <CardHeader>
          <CardTitle>Детальная статистика</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Роль</th>
                  <th className="text-left py-2">Пользователей</th>
                  <th className="text-left py-2">Процент</th>
                  <th className="text-left py-2">Вес голоса</th>
                </tr>
              </thead>
              <tbody>
                {roleUsageStats.map((stat) => {
                  const role = roles.find((r) => r.id === stat.roleId);
                  return (
                    <tr key={stat.roleId} className="border-b">
                      <td className="py-2 font-medium">{stat.roleName}</td>
                      <td className="py-2">{stat.count}</td>
                      <td className="py-2">{stat.percentage}%</td>
                      <td className="py-2">
                        <Badge variant="secondary">
                          {role?.voteMultiplier}x
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
