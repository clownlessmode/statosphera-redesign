export interface VotingRole {
  /** Уникальный ID роли для голосования */
  id: string;
  /** Название роли */
  name: string;
  /** Множитель голоса для этой роли при голосовании за идеи */
  voteMultiplier: number;
  /** Описание роли */
  description?: string;
}

export interface UserVotingRoleConfig {
  /** ID пользователя */
  userId: string;
  /** ID роли для голосования */
  roleId: string;
  /** Кастомный множитель голоса для этого пользователя (переопределяет множитель роли) */
  customVoteMultiplier?: number;
  /** Дата назначения роли */
  assignedAt: string;
}

export interface CreateVotingRoleRequest {
  name: string;
  voteMultiplier: number;
  description?: string;
}

export interface UpdateVotingRoleRequest {
  id: string;
  name?: string;
  voteMultiplier?: number;
  description?: string;
}

export interface VotingRoleConfigRequest {
  roleId: string;
  voteMultiplier: number;
}

export interface UserVotingRoleConfigRequest {
  userId: string;
  roleId: string;
  customVoteMultiplier?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Оставляем старые типы для обратной совместимости, но помечаем как deprecated
/** @deprecated Используйте VotingRole вместо UserRole */
export type UserRole = VotingRole;
/** @deprecated Используйте UserVotingRoleConfig вместо UserRoleConfig */
export type UserRoleConfig = UserVotingRoleConfig;
/** @deprecated Используйте CreateVotingRoleRequest вместо CreateRoleRequest */
export type CreateRoleRequest = CreateVotingRoleRequest;
/** @deprecated Используйте UpdateVotingRoleRequest вместо UpdateRoleRequest */
export type UpdateRoleRequest = UpdateVotingRoleRequest;
/** @deprecated Используйте VotingRoleConfigRequest вместо RoleConfigRequest */
export type RoleConfigRequest = VotingRoleConfigRequest;
/** @deprecated Используйте UserVotingRoleConfigRequest вместо UserRoleConfigRequest */
export type UserRoleConfigRequest = UserVotingRoleConfigRequest;
