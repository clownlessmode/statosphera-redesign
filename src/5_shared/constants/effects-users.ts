// Пользователи, для которых доступны эффекты и персональные сообщения
export const EFFECTS_USERS = [181, 2734] as const;

// Проверка, доступны ли эффекты для пользователя
export const hasEffectsAccess = (userId?: number): boolean => {
  return userId ? EFFECTS_USERS.includes(userId as any) : false;
};
