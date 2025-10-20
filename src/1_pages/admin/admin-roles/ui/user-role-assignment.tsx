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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Badge } from "@shared/ui/badge";
import { Users, UserPlus, Trash2 } from "lucide-react";
import { UserRole, UserRoleConfig, User } from "@shared/types/roles";

interface UserRoleAssignmentProps {
  roles: UserRole[];
  users: User[];
  userRoleConfigs: UserRoleConfig[];
  onAssignUserRole: (
    userId: string,
    roleId: string,
    customWeight?: number,
  ) => void;
  onRemoveUserRole: (userId: string) => void;
  isLoading?: boolean;
}

export const UserRoleAssignment: React.FC<UserRoleAssignmentProps> = ({
  roles,
  users,
  userRoleConfigs,
  onAssignUserRole,
  onRemoveUserRole,
  isLoading = false,
}) => {
  const [newUserRole, setNewUserRole] = useState({
    userId: "",
    roleId: "",
    customWeight: "",
  });

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

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || userId;
  };

  const getUserEmail = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user?.email || "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Назначение ролей</h2>
        <p className="text-muted-foreground">
          Назначение ролей пользователям системы
        </p>
      </div>

      {/* Форма назначения роли */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Назначить роль пользователю
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="userId">Пользователь</Label>
                <Select
                  value={newUserRole.userId}
                  onValueChange={(value) =>
                    setNewUserRole((prev) => ({ ...prev, userId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="roleId">Роль</Label>
                <Select
                  value={newUserRole.roleId}
                  onValueChange={(value) =>
                    setNewUserRole((prev) => ({ ...prev, roleId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name} ({role.voteMultiplier}x)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Пользователи и их роли
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Пользователь</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Вес голоса</TableHead>
                <TableHead>Дата назначения</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userRoleConfigs.map((config) => {
                const roleInfo = getUserRoleInfo(config.userId);
                if (!roleInfo) return null;

                return (
                  <TableRow key={config.userId}>
                    <TableCell className="font-medium">
                      {getUserName(config.userId)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {getUserEmail(config.userId)}
                    </TableCell>
                    <TableCell>{roleInfo.roleName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{roleInfo.weight}x</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(config.assignedAt).toLocaleDateString("ru-RU")}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onRemoveUserRole(config.userId)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
