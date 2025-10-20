import {
  Idea,
  Vote,
  CreateIdeaRequest,
  VoteRequest,
  RoleConfigRequest,
  UserRoleConfigRequest,
} from "../types";
import { UserRole, UserRoleConfig } from "@shared/types/roles";

// TODO: Заменить на реальные API вызовы
export const democracyService = {
  // Получение всех идей
  async getIdeas(): Promise<Idea[]> {
    // TODO: GET /api/democracy/ideas
    throw new Error("API не подключен");
  },

  // Получение идеи по ID
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getIdeaById(_id: string): Promise<Idea | null> {
    // TODO: GET /api/democracy/ideas/:id
    throw new Error("API не подключен");
  },

  // Создание новой идеи
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createIdea(_data: CreateIdeaRequest): Promise<Idea> {
    // TODO: POST /api/democracy/ideas
    throw new Error("API не подключен");
  },

  // Обновление идеи
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateIdea(_id: string, _data: Partial<Idea>): Promise<Idea> {
    // TODO: PUT /api/democracy/ideas/:id
    throw new Error("API не подключен");
  },

  // Удаление идеи
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteIdea(_id: string): Promise<void> {
    // TODO: DELETE /api/democracy/ideas/:id
    throw new Error("API не подключен");
  },

  // Получение голосов пользователя
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserVotes(_userId: string): Promise<Record<string, Vote>> {
    // TODO: GET /api/democracy/users/:userId/votes
    throw new Error("API не подключен");
  },

  // Голосование за идею
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async voteForIdea(_data: VoteRequest): Promise<Vote> {
    // TODO: POST /api/democracy/votes
    throw new Error("API не подключен");
  },

  // Отмена голоса
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async removeVote(_ideaId: string, _userId: string): Promise<void> {
    // TODO: DELETE /api/democracy/votes/:ideaId/:userId
    throw new Error("API не подключен");
  },

  // Получение статистики идей
  async getIdeasStats(): Promise<{
    totalIdeas: number;
    activeIdeas: number;
    implementedIdeas: number;
    totalVotes: number;
    categoryCounts: Record<string, number>;
    statusCounts: Record<string, number>;
  }> {
    // TODO: GET /api/democracy/ideas/stats
    throw new Error("API не подключен");
  },

  // Получение ролей для голосования
  async getVotingRoles(): Promise<UserRole[]> {
    // TODO: GET /api/democracy/voting-roles
    throw new Error("API не подключен");
  },

  // Получение конфигураций ролей пользователей
  async getUserVotingRoleConfigs(): Promise<UserRoleConfig[]> {
    // TODO: GET /api/democracy/user-voting-role-configs
    throw new Error("API не подключен");
  },

  // Обновление веса роли
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateVotingRoleWeight(_data: RoleConfigRequest): Promise<UserRole> {
    // TODO: PUT /api/democracy/voting-roles/:roleId/weight
    throw new Error("API не подключен");
  },

  // Назначение роли пользователю

  async assignUserVotingRole(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _data: UserRoleConfigRequest,
  ): Promise<UserRoleConfig> {
    // TODO: POST /api/democracy/user-voting-role-configs
    throw new Error("API не подключен");
  },

  // Получение множителя голоса пользователя
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getUserVoteMultiplier(_userId: string): Promise<number> {
    // TODO: GET /api/democracy/users/:userId/vote-multiplier
    throw new Error("API не подключен");
  },
};
