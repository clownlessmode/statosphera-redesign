import { adminRolesService } from "./service";
import {
  CreateVotingRoleRequest,
  UpdateVotingRoleRequest,
  UserVotingRoleConfigRequest,
} from "@shared/types/roles";

export const adminRolesController = {
  // Получить все роли голосования
  getVotingRoles: () => adminRolesService.getVotingRoles(),

  // Получить роль голосования по ID
  getVotingRoleById: (id: string) => adminRolesService.getVotingRoleById(id),

  // Создать новую роль голосования
  createVotingRole: (data: CreateVotingRoleRequest) =>
    adminRolesService.createVotingRole(data),

  // Обновить роль голосования
  updateVotingRole: (data: UpdateVotingRoleRequest) =>
    adminRolesService.updateVotingRole(data),

  // Удалить роль голосования
  deleteVotingRole: (id: string) => adminRolesService.deleteVotingRole(id),

  // Получить всех пользователей
  getUsers: () => adminRolesService.getUsers(),

  // Получить конфигурацию ролей голосования пользователей
  getUserVotingRoleConfigs: () => adminRolesService.getUserVotingRoleConfigs(),

  // Обновить множитель роли голосования
  updateVotingRoleWeight: (roleId: string, weight: number) =>
    adminRolesService.updateVotingRole({
      id: roleId,
      voteMultiplier: weight,
    }),

  // Назначить роль голосования пользователю
  assignUserVotingRole: (data: UserVotingRoleConfigRequest) =>
    adminRolesService.assignUserVotingRole(data),

  // Удалить роль голосования у пользователя
  removeUserVotingRole: (userId: string) =>
    adminRolesService.removeUserVotingRole(userId),

  // Получить статистику ролей голосования
  getVotingRolesStats: () => adminRolesService.getVotingRolesStats(),

  // Получить множитель голоса пользователя
  getUserVoteMultiplier: (userId: string) =>
    adminRolesService.getUserVoteMultiplier(userId),
};
