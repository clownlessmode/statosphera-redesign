import { VotingRole, UserVotingRoleConfig, User } from "@shared/types/roles";
import {
  CreateVotingRoleRequest,
  UpdateVotingRoleRequest,
  UserVotingRoleConfigRequest,
} from "@shared/types/roles";

// TODO: Заменить на реальные API вызовы
export const adminRolesService = {
  // Получение всех ролей для голосования
  async getVotingRoles(): Promise<VotingRole[]> {
    // TODO: GET /api/admin/voting-roles
    throw new Error("API не подключен");
  },

  // Получение роли по ID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getVotingRoleById(_id: string): Promise<VotingRole | null> {
    // TODO: GET /api/admin/voting-roles/:id
    throw new Error("API не подключен");
  },

  // Создание новой роли
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createVotingRole(_data: CreateVotingRoleRequest): Promise<VotingRole> {
    // TODO: POST /api/admin/voting-roles
    throw new Error("API не подключен");
  },

  // Обновление роли
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateVotingRole(_data: UpdateVotingRoleRequest): Promise<VotingRole> {
    // TODO: PUT /api/admin/voting-roles/:id
    throw new Error("API не подключен");
  },

  // Удаление роли
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteVotingRole(_id: string): Promise<void> {
    // TODO: DELETE /api/admin/voting-roles/:id
    throw new Error("API не подключен");
  },

  // Получение всех пользователей
  async getUsers(): Promise<User[]> {
    // TODO: GET /api/admin/users
    throw new Error("API не подключен");
  },

  // Получение конфигураций ролей пользователей
  async getUserVotingRoleConfigs(): Promise<UserVotingRoleConfig[]> {
    // TODO: GET /api/admin/user-voting-role-configs
    throw new Error("API не подключен");
  },

  // Назначение роли пользователю

  async assignUserVotingRole(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: UserVotingRoleConfigRequest,
  ): Promise<UserVotingRoleConfig> {
    // TODO: POST /api/admin/user-voting-role-configs
    throw new Error("API не подключен");
  },

  // Удаление роли у пользователя
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeUserVotingRole(_userId: string): Promise<void> {
    // TODO: DELETE /api/admin/user-voting-role-configs/:userId
    throw new Error("API не подключен");
  },

  // Получение статистики ролей
  async getVotingRolesStats(): Promise<{
    totalUsers: number;
    totalRoles: number;
    roleDistribution: Array<{
      roleId: string;
      roleName: string;
      count: number;
      percentage: number;
    }>;
  }> {
    // TODO: GET /api/admin/voting-roles/stats
    throw new Error("API не подключен");
  },

  // Получение множителя голоса пользователя
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserVoteMultiplier(_userId: string): Promise<number> {
    // TODO: GET /api/admin/users/:userId/vote-multiplier
    throw new Error("API не подключен");
  },
};
