import { api } from "@shared/api/api";
import {
  CreateForExcelRequest,
  CreateProjectRequest,
  DEFAULT_PROJECT_SORT,
  type GetProjectsParams,
  type ProjectsRequest,
} from "./types/requests";
import { CreateProjectResponse, Graph, Projects } from "./types/response";

export class ProjectsService {
  static async getProjects(request: GetProjectsParams): Promise<Projects[]> {
    const { pagination, stage, priority, quarterFilter, isActive, sort } =
      request;
    const body: ProjectsRequest = {
      pagination,
      sort: sort ?? DEFAULT_PROJECT_SORT,
    };
    if (stage?.length) body.stage = stage;
    if (priority?.length) body.priority = priority;
    if (isActive) body.isActive = isActive;
    if (quarterFilter) body.quarterFilter = quarterFilter;

    const response = await api.post<Projects[]>("/projects/get-all", body);
    return response.data;
  }

  static async createForExcel(request: CreateForExcelRequest): Promise<void> {
    const formData = new FormData();
    formData.append("file", request.file);

    const response = await api.post<void>(
      "/projects/create-for-excel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  }

  static async createProject(
    request: CreateProjectRequest,
  ): Promise<CreateProjectResponse> {
    const response = await api.post<CreateProjectResponse>(
      "/projects",
      request,
    );
    return response.data;
  }

  static async getGraph(): Promise<Graph[]> {
    const response = await api.get<Graph[]>("/projects/graph");
    return response.data;
  }
}
