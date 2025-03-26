import { AlertType } from "@entities/alert-type/model/api/dto/ro";

export interface Notification {
  id: number;
  is_read: boolean;
  is_important: boolean;
  alert_type: AlertType;
  user: number;
  title: string;
  description: string;
  message: string;
  emotion: string;
  read_at: string;
  updated_at: string;
}
