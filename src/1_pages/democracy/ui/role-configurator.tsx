import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";
import { Badge } from "@shared/ui/badge";
import { Edit, Save, X, Users, Settings } from "lucide-react";
import { UserRole, UserRoleConfig } from "@shared/types/roles";

interface RoleConfiguratorProps {
  roles: UserRole[];
  userRoleConfigs: UserRoleConfig[];
  onUpdateRoleWeight: (roleId: string, weight: number) => void;
  onAssignUserRole: (
    userId: string,
    roleId: string,
    customWeight?: number,
  ) => void;
  isLoading?: boolean;
}

export const RoleConfigurator: React.FC<RoleConfiguratorProps> = ({
  roles,
  userRoleConfigs,
  onUpdateRoleWeight,
  onAssignUserRole,
  isLoading = false,
}) => {
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<number>(0);
  const [newUserRole, setNewUserRole] = useState({
    userId: "",
    roleId: "",
    customWeight: "",
  });

  const handleEditRole = (role: UserRole) => {
    setEditingRole(role.id);
    setEditingWeight(role.voteMultiplier);
  };

  const handleSaveRole = (roleId: string) => {
    onUpdateRoleWeight(roleId, editingWeight);
    setEditingRole(null);
  };

  const handleCancelEdit = () => {
    setEditingRole(null);
  };

  const handleAssignRole = () => {
    if (!newUserRole.userId || !newUserRole.roleId) return;

    const customWeight = newUserRole.customWeight
      ? parseFloat(newUserRole.customWeight)
      : undefined;
    onAssignUserRole(newUserRole.userId, newUserRole.roleId, customWeight);

    setNewUserRole({
      userId: "",
      roleId: "",
      customWeight: "",
    });
  };

  const getUserRoleInfo = (userId: string) => {
    const config = userRoleConfigs.find((ur) => ur.userId === userId);
    if (!config) return null;

    const role = roles.find((r) => r.id === config.roleId);
    return {
      roleName: role?.name || "Неизвестная роль",
      weight: config.customVoteMultiplier || role?.voteMultiplier || 1,
    };
  };

  return (
    <div className="space-y-6">
      {/* Конфигурация ролей */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Конфигурация ролей
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Роль</TableHead>
                <TableHead>Описание</TableHead>
                <TableHead>Вес голоса</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {role.description || "Нет описания"}
                  </TableCell>
                  <TableCell>
                    {editingRole === role.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editingWeight}
                          onChange={(e) =>
                            setEditingWeight(parseFloat(e.target.value))
                          }
                          className="w-20"
                          min="0"
                          step="0.1"
                        />
                        <Button
                          size="sm"
                          onClick={() => handleSaveRole(role.id)}
                          disabled={isLoading}
                        >
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">
                          {role.voteMultiplier}x
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditRole(role)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {
                        userRoleConfigs.filter((ur) => ur.roleId === role.id)
                          .length
                      }{" "}
                      пользователей
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Назначение ролей пользователям */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Назначение ролей пользователям
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="userId">ID пользователя</Label>
                <Input
                  id="userId"
                  value={newUserRole.userId}
                  onChange={(e) =>
                    setNewUserRole((prev) => ({
                      ...prev,
                      userId: e.target.value,
                    }))
                  }
                  placeholder="user123"
                />
              </div>

              <div>
                <Label htmlFor="roleId">Роль</Label>
                <select
                  id="roleId"
                  value={newUserRole.roleId}
                  onChange={(e) =>
                    setNewUserRole((prev) => ({
                      ...prev,
                      roleId: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Выберите роль</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name} ({role.voteMultiplier}x)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="customWeight">
                  Кастомный вес (опционально)
                </Label>
                <Input
                  id="customWeight"
                  type="number"
                  value={newUserRole.customWeight}
                  onChange={(e) =>
                    setNewUserRole((prev) => ({
                      ...prev,
                      customWeight: e.target.value,
                    }))
                  }
                  placeholder="10"
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            <Button
              onClick={handleAssignRole}
              disabled={isLoading || !newUserRole.userId || !newUserRole.roleId}
              className="w-full"
            >
              Назначить роль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Список пользователей с ролями */}
      <Card>
        <CardHeader>
          <CardTitle>Пользователи и их роли</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID пользователя</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Вес голоса</TableHead>
                <TableHead>Дата назначения</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRoleConfigs.map((config) => {
                const roleInfo = getUserRoleInfo(config.userId);
                if (!roleInfo) return null;

                return (
                  <TableRow key={config.userId}>
                    <TableCell className="font-medium">
                      {config.userId}
                    </TableCell>
                    <TableCell>{roleInfo.roleName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{roleInfo.weight}x</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(config.assignedAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
