import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Label } from "@shared/ui/label";
import { Textarea } from "@shared/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Badge } from "@shared/ui/badge";
import { Edit, Save, X, Plus, Trash2, Shield } from "lucide-react";
import { UserRole } from "@shared/types/roles";

interface RoleManagementProps {
  roles: UserRole[];
  onCreateRole: (data: {
    name: string;
    voteMultiplier: number;
    description?: string;
  }) => void;
  onDeleteRole: (id: string) => void;
  onUpdateRoleWeight: (roleId: string, weight: number) => void;
  isLoading?: boolean;
}

export const RoleManagement: React.FC<RoleManagementProps> = ({
  roles,
  onCreateRole,
  onDeleteRole,
  onUpdateRoleWeight,
  isLoading = false,
}) => {
  const [editingRole, setEditingRole] = useState<string | null>(null);
  const [editingWeight, setEditingWeight] = useState<number>(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    voteMultiplier: 1,
    description: "",
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

  const handleCreateRole = () => {
    if (!newRole.name.trim()) return;

    onCreateRole({
      name: newRole.name.trim(),
      voteMultiplier: newRole.voteMultiplier,
      description: newRole.description.trim() || undefined,
    });

    setNewRole({
      name: "",
      voteMultiplier: 1,
      description: "",
    });
    setIsCreateDialogOpen(false);
  };

  const handleDeleteRole = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить эту роль?")) {
      onDeleteRole(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Управление ролями</h2>
          <p className="text-muted-foreground">
            Создание, редактирование и удаление ролей системы
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Создать роль
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создание новой роли</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Название роли</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Введите название роли"
                />
              </div>
              <div>
                <Label htmlFor="voteMultiplier">Множитель голоса</Label>
                <Input
                  id="voteMultiplier"
                  type="number"
                  value={newRole.voteMultiplier}
                  onChange={(e) =>
                    setNewRole((prev) => ({
                      ...prev,
                      voteMultiplier: parseFloat(e.target.value) || 1,
                    }))
                  }
                  min="0.1"
                  step="0.1"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Описание роли (необязательно)"
                  rows={3}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button onClick={handleCreateRole}>Создать</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Список ролей
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
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
