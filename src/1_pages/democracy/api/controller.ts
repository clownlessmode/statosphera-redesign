import { democracyService } from "./service";
import {
  CreateIdeaRequest,
  VoteRequest,
  RoleConfigRequest,
  UserRoleConfigRequest,
} from "../types";

export const democracyController = {
  // Получить все идеи
  getIdeas: () => democracyService.getIdeas(),

  // Получить идею по ID
  getIdeaById: (id: string) => democracyService.getIdeaById(id),

  // Создать новую идею
  createIdea: (data: CreateIdeaRequest) => democracyService.createIdea(data),

  // Проголосовать за идею
  voteForIdea: (data: VoteRequest) => democracyService.voteForIdea(data),

  // Получить голоса пользователя
  getUserVotes: (userId: string) => democracyService.getUserVotes(userId),

  // Получить роли для голосования
  getVotingRoles: () => democracyService.getVotingRoles(),

  // Получить конфигурацию ролей голосования пользователей
  getUserVotingRoleConfigs: () => democracyService.getUserVotingRoleConfigs(),

  // Обновить множитель роли голосования
  updateVotingRoleWeight: (data: RoleConfigRequest) =>
    democracyService.updateVotingRoleWeight(data),

  // Назначить роль голосования пользователю
  assignUserVotingRole: (data: UserRoleConfigRequest) =>
    democracyService.assignUserVotingRole(data),

  // Получить статистику идей
  getIdeasStats: () => democracyService.getIdeasStats(),
};
