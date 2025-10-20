import { useState, useEffect } from "react";
import { Header } from "@widgets/header";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Badge } from "@shared/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { Users, Shield } from "lucide-react";
import { adminRolesController } from "../api";
import { UserRole, UserRoleConfig, User } from "@shared/types/roles";
import { RoleManagement } from "./role-management";
import { UserRoleAssignment } from "./user-role-assignment";

export const AdminRolesPage = () => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userRoleConfigs, setUserRoleConfigs] = useState<UserRoleConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("roles");

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [rolesData, usersData, configsData] = await Promise.all([
        adminRolesController.getVotingRoles(),
        adminRolesController.getUsers(),
        adminRolesController.getUserVotingRoleConfigs(),
      ]);

      setRoles(rolesData);
      setUsers(usersData);
      setUserRoleConfigs(configsData);
    } catch (error) {
      console.error("Ошибка загрузки данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRole = async (data: {
    name: string;
    voteMultiplier: number;
    description?: string;
  }) => {
    try {
      const newRole = await adminRolesController.createVotingRole(data);
      setRoles((prev) => [...prev, newRole]);
    } catch (error) {
      console.error("Ошибка создания роли:", error);
    }
  };

  const handleDeleteRole = async (id: string) => {
    try {
      await adminRolesController.deleteVotingRole(id);
      setRoles((prev) => prev.filter((role) => role.id !== id));
    } catch (error) {
      console.error("Ошибка удаления роли:", error);
    }
  };

  const handleUpdateRoleWeight = async (roleId: string, weight: number) => {
    try {
      const updatedRole = await adminRolesController.updateVotingRole({
        id: roleId,
        voteMultiplier: weight,
      });
      setRoles((prev) =>
        prev.map((role) => (role.id === roleId ? updatedRole : role)),
      );
    } catch (error) {
      console.error("Ошибка обновления веса роли:", error);
    }
  };

  const handleAssignUserRole = async (
    userId: string,
    roleId: string,
    customWeight?: number,
  ) => {
    try {
      const newConfig = await adminRolesController.assignUserVotingRole({
        userId,
        roleId,
        customVoteMultiplier: customWeight,
      });
      setUserRoleConfigs((prev) => {
        const existingIndex = prev.findIndex(
          (config) => config.userId === userId,
        );
        if (existingIndex !== -1) {
          const updated = [...prev];
          updated[existingIndex] = newConfig;
          return updated;
        }
        return [...prev, newConfig];
      });
    } catch (error) {
      console.error("Ошибка назначения роли:", error);
    }
  };

  const handleRemoveUserRole = async (userId: string) => {
    try {
      await adminRolesController.removeUserVotingRole(userId);
      setUserRoleConfigs((prev) =>
        prev.filter((config) => config.userId !== userId),
      );
    } catch (error) {
      console.error("Ошибка удаления роли у пользователя:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
        <Header title="Управление ролями" />
        <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-1 w-full bg-background overflow-y-auto">
          <div className="flex items-center justify-center h-64 w-full">
            <div className="text-lg">Загрузка...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Роли для голосования за идеи"
        actions={{
          right: (
            <Badge variant="outline" className="text-sm">
              {roles.length} ролей, {users.length} пользователей
            </Badge>
          ),
        }}
      />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full flex flex-1 w-full bg-background overflow-y-auto">
        <div className="w-full space-y-6">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Настройка ролей для голосования за идеи и назначение множителей
              голосов пользователям
            </p>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="roles" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Роли голосования
              </TabsTrigger>
              <TabsTrigger
                value="assignment"
                className="flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                Назначения ролей
              </TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="space-y-4">
              <RoleManagement
                roles={roles}
                onCreateRole={handleCreateRole}
                onDeleteRole={handleDeleteRole}
                onUpdateRoleWeight={handleUpdateRoleWeight}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="assignment" className="space-y-4">
              <UserRoleAssignment
                roles={roles}
                users={users}
                userRoleConfigs={userRoleConfigs}
                onAssignUserRole={handleAssignUserRole}
                onRemoveUserRole={handleRemoveUserRole}
                isLoading={isLoading}
              />
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика ролей</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Статистика будет доступна после подключения к серверу
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки системы ролей голосования</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Здесь будут дополнительные настройки системы ролей
                    голосования за идеи
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
