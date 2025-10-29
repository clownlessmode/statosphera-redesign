export interface Idea {
  /** Уникальный ID идеи */
  id: string;
  /** Заголовок идеи */
  title: string;
  /** Описание идеи */
  description: string;
  /** Автор идеи */
  authorId: string;
  /** Имя автора */
  authorName: string;
  /** Дата создания */
  createdAt: string;
  /** Дата последнего обновления */
  updatedAt: string;
  /** Общий рейтинг идеи (сумма всех голосов с учетом весов) */
  totalRating: number;
  /** Количество лайков */
  likesCount: number;
  /** Количество дизлайков */
  dislikesCount: number;
  /** Статус идеи */
  status: IdeaStatus;
}

export type IdeaStatus =
  | "active" // Активная идея
  | "implemented" // Реализованная
  | "rejected" // Отклоненная
  | "archived"; // Архивированная

export type IdeaCategory =
  | "feature" // Новая функция
  | "improvement" // Улучшение существующей функции
  | "design" // Изменения дизайна
  | "performance" // Оптимизация производительности
  | "other"; // Другое

export interface Vote {
  /** Уникальный ID голоса */
  id: string;
  /** ID идеи */
  ideaId: string;
  /** ID пользователя */
  userId: string;
  /** Тип голоса */
  type: VoteType;
  /** Вес голоса (учитывает роль пользователя) */
  weight: number;
  /** Дата голосования */
  createdAt: string;
}

export type VoteType = "like" | "dislike";

export interface CreateIdeaRequest {
  title: string;
  description: string;
}

export interface VoteRequest {
  ideaId: string;
  type: VoteType;
  userId: string;
}

// Реэкспорт типов ролей из shared
export type {
  UserRole,
  UserRoleConfig,
  RoleConfigRequest,
  UserRoleConfigRequest,
} from "@shared/types/roles";
