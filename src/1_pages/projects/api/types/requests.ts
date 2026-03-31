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
};

export type GraphRequest = {
  stage?: StageProject[];
  priority?: PriorityProject[];
};
