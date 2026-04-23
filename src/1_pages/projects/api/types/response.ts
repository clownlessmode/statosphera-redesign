export type Projects = {
  id: number;
  excel_import_id: number;
  name: string;
  responsible_name: string;
  team_info: string;
  client_name: string;
  pm_name: string;
  stage: string;
  start_date: string;
  end_date: string;
  priority: string;
  task_groups_count?: number;
  doc_groups_count?: number;
};

export type UsersResponse = {
  id_user: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
};

/** Ответ GET /projects/:id — может содержать служебные поля. */
export type ProjectDetail = Projects & {
  created_at?: string;
  updated_at?: string;
  access_users?: number[];
};

export type CreateProjectResponse = {
  id: number;
  excel_import_id: number;
  name: string;
  responsible_name: string;
  team_info: string;
  client_name: string;
  pm_name: string;
  stage: string;
  start_date: string;
  end_date: string;
  priority: string;
  created_at: string;
  updated_at: string;
  access_users: number[];
};

export type UpdateProjectResponse = {
  id: number;
  excel_import_id: number;
  name: string;
  responsible_name: string;
  team_info: string;
  client_name: string;
  pm_name: string;
  stage: string;
  start_date: string;
  end_date: string;
  priority: string;
  created_at: string;
  updated_at: string;
  access_users: number[];
};

export type Graph = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  stage: string;
  priority?: string;
};

export type TaskGroup = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  tasks_count: number;
  access_users?: number[];
};

export type TaskAssignee = {
  id_user: number;
  name: string;
};

export type Task = {
  id: number;
  name: string;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
  updated_at: string;
  assignees?: TaskAssignee[];
  access_users?: number[];
};

export type DocGroup = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  documents_count: number;
  access_users?: number[];
};

export type Document = {
  id: number;
  group_id: number;
  name: string;
  description: string;
  url: string;
  created_at: string;
  uploaded_by_id: number;
  uploaded_by_name: string;
  uploaded_by_last_name: string;
  access_users?: number[];
};

export type CreateTaskGroupResponse = {
  id: number;
  project_id: number;
  name: string;
  description: string;
  access_users: number[];
};

export type CreateTaskResponse = {
  id: number;
  group_id: number;
  name: string;
  description: string;
  status: string;
  due_date: string;
  created_at: string;
  assignees: number[];
  access_users: number[];
};

export type CreateDocumentGroupResponse = {
  id: number;
  project_id: number;
  name: string;
  description: string;
  access_users: number[];
};

export type CreateDocumentResponse = {
  id: number;
  group_id: number;
  name: string;
  description: string;
  url: string;
  uploaded_by: number;
  created_at: string;
};
