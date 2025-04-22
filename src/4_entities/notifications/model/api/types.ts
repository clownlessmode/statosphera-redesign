export interface Notification {
  id: number;
  title: string;
  created_at: string;
  is_read: boolean;
  description: string;
  message: string;
  emotion: string;
  is_important: boolean;
}
