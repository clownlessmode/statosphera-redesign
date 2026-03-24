import { api } from "@shared/api/api";
import { ProjectsRequest } from "./types/requests";
import { Projects } from "./types/response";

export class ProjectsService {
  static async getProjects(request: ProjectsRequest): Promise<Projects[]> {
    const response = await api.post<Projects[]>("/projects/get-all", request);
    return response.data;
  }
}
