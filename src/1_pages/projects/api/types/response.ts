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
};

export type Graph = {
  id: number;
  name: string;
  start_date: string;
  end_date: string;
  stage: string;
  priority?: string;
};
