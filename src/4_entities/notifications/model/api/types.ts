export interface Notification {
  id: number;
  title: string;
  created_at: string;
  is_read: boolean;
  description: string;
  message: string;
  emotion: string;
  is_important: boolean;
  type?: number;
  user?: number;
}

export interface CreateNotificationData {
  user?: number;
  title: string;
  description: string;
  message: string;
  emotion: string;
  isSmportant: boolean;
  type: number;
}

export interface NotificationStats {
  total_count: number;
  read_count: number;
  unread_count: number;
}
