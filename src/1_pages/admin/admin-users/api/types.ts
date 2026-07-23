export interface AdminUser {
  id_user: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  locked: boolean;
  id_store: number[];
}

export interface AdminUsersResponse {
  items: AdminUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
