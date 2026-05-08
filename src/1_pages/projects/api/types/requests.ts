import type { PriorityProject, StageProject } from "./project-filters";

export enum ProjectColumn {
  END_DATE = "end_date",
  START_DATE = "start_date",
  CREATED_AT = "created_at",
}

export type ProjectSort = {
  sort: "asc" | "desc";
  colId: ProjectColumn;
};

export const DEFAULT_PROJECT_SORT: ProjectSort = {
  sort: "desc",
  colId: ProjectColumn.CREATED_AT,
};

export type QuarterFilter = {
  year: number;
  quarter: number;
};

export type ProjectsFilters = {
  stage?: StageProject[];
  priority?: PriorityProject[];
  quarterFilter?: QuarterFilter;
  isActive?: boolean;
  sort?: ProjectSort;
  pm_name?: string;
  responsible_name?: string;
  start_date?: string;
  end_date?: string;
};

export type ProjectsRequest = ProjectsFilters & {
  pagination: {
    limit: number;
    offset: number;
  };
  sort: ProjectSort;
};

export type GetProjectsParams = Omit<ProjectsRequest, "sort"> & {
  sort?: ProjectSort;
};

export type CreateForExcelRequest = {
  file: File;
};

export type CreateProjectRequest = {
  name: string;
  responsible_name: string;
  team_info: string;
  client_name: string;
  pm_name: string;
  stage: string;
  start_date: string;
  end_date: string;
  priority: string;
  access_users?: number[];
};

export type GraphRequest = {
  stage?: StageProject[];
  priority?: PriorityProject[];
};

export type CreateTaskGroupRequest = {
  name: string;
  description: string;
  access_users: number[];
};

export type CreateTaskRequest = {
  name: string;
  description: string;
  access_users: number[];
  assignees: number[];
  status: string;
  due_date: string;
};

export type CreateDocumentGroupRequest = {
  name: string;
  description: string;
  access_users: number[];
};

export type UpdateDocumentGroupRequest = {
  name?: string;
  description?: string;
  access_users?: number[];
};

export type UpdateDocumentRequest = {
  name?: string;
  description?: string;
  access_users?: number[];
};

export type CreateDocumentRequest = {
  name: string;
  description: string;
  access_users: number[];
  file: File;
};

export type UpdateProjectRequest = CreateProjectRequest;

export type CreateDescriptionRequest = {
  description: string;
};

export type PmNameRequest = {
  name?: string;
};

export type ResponsibleNameRequest = {
  name?: string;
};
