import { api } from "@shared/api/api";
import {
  CreateDocumentGroupRequest,
  UpdateDocumentGroupRequest,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  CreateForExcelRequest,
  CreateProjectRequest,
  CreateTaskGroupRequest,
  CreateTaskRequest,
  DEFAULT_PROJECT_SORT,
  GraphRequest,
  type GetProjectsParams,
  type ProjectsRequest,
  UpdateProjectRequest,
} from "./types/requests";
import {
  CreateDocumentGroupResponse,
  CreateDocumentResponse,
  CreateProjectResponse,
  CreateTaskGroupResponse,
  CreateTaskResponse,
  DocGroup,
  Document,
  Graph,
  ProjectDetail,
  Projects,
  Task,
  TaskGroup,
  UpdateProjectResponse,
  UsersResponse,
} from "./types/response";

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

  static async getProjectById(id: number): Promise<ProjectDetail> {
    const response = await api.get<ProjectDetail>(`/projects/${id}`);
    return response.data;
  }

  static async getUsers(): Promise<UsersResponse[]> {
    const response = await api.get<UsersResponse[]>("projects/users");
    return response.data;
  }

  static async getGraph(request: GraphRequest): Promise<Graph[]> {
    const { stage, priority } = request;
    const body: GraphRequest = {};
    if (stage?.length) body.stage = stage;
    if (priority?.length) body.priority = priority;

    const response = await api.post<Graph[]>("/projects/graph", body);
    return response.data;
  }

  static async updateProject(
    request: UpdateProjectRequest,
    id: number,
  ): Promise<UpdateProjectResponse> {
    const response = await api.patch<UpdateProjectResponse>(
      `/projects/${id}`,
      request,
    );
    return response.data;
  }

  static async deleteProject(id: number): Promise<void> {
    const response = await api.delete<void>(`/projects/${id}`);
    return response.data;
  }
}

export class TaskGroupsService {
  static async getTaskGroups(id_project: number): Promise<TaskGroup[]> {
    const response = await api.get<TaskGroup[]>(
      `/projects/task-groups/${id_project}`,
    );
    return response.data;
  }

  static async createTaskGroup(
    request: CreateTaskGroupRequest,
    project_id: number,
  ): Promise<CreateTaskGroupResponse> {
    const response = await api.post<CreateTaskGroupResponse>(
      `/projects/${project_id}/task-groups/create`,
      request,
    );
    return response.data;
  }

  static async createTask(
    request: CreateTaskRequest,
    project_id: number,
    group_id: number,
  ): Promise<CreateTaskResponse> {
    const response = await api.post<CreateTaskResponse>(
      `/projects/${project_id}/task/${group_id}/create`,
      request,
    );
    return response.data;
  }
}

export class DocGroupsService {
  static async getDocGroups(id_project: number): Promise<DocGroup[]> {
    const response = await api.get<DocGroup[]>(
      `/projects/doc-groups/${id_project}`,
    );
    return response.data;
  }

  static async createDocumentGroup(
    request: CreateDocumentGroupRequest,
    project_id: number,
  ): Promise<CreateDocumentGroupResponse> {
    const response = await api.post<CreateDocumentGroupResponse>(
      `/projects/${project_id}/doc-groups/create`,
      request,
    );
    return response.data;
  }

  static async updateDocumentGroup(
    request: UpdateDocumentGroupRequest,
    project_id: number,
    group_id: number,
  ): Promise<void> {
    const response = await api.post<void>(
      `/projects/doc-groups/${project_id}/${group_id}/update`,
      request,
    );
    return response.data;
  }

  static async createDocument(
    request: CreateDocumentRequest,
    project_id: number,
    group_id: number,
  ): Promise<CreateDocumentResponse> {
    const formData = new FormData();
    formData.append("file", request.file);
    formData.append("name", request.name);
    formData.append("description", request.description);
    formData.append("access_users", JSON.stringify(request.access_users));
    const response = await api.post<CreateDocumentResponse>(
      `/projects/${project_id}/doc/${group_id}/create`,
      formData,
    );
    return response.data;
  }

  static async deleteDocumentGroup(
    id_project: number,
    group_id: number,
  ): Promise<void> {
    const response = await api.delete<void>(
      `/projects/doc-groups/${id_project}/${group_id}/delete`,
    );
    return response.data;
  }
}

export class TasksService {
  static async getTasks(id_project: number, group_id: number): Promise<Task[]> {
    const response = await api.get<Task[]>(
      `/projects/${id_project}/task-groups/${group_id}/tasks`,
    );
    return response.data;
  }
}

export class DocumentsService {
  static async getDocuments(
    id_project: number,
    group_id: number,
  ): Promise<Document[]> {
    const response = await api.get<Document[]>(
      `/projects/${id_project}/doc-groups/${group_id}/docs`,
    );
    return response.data;
  }

  static async deleteDocument(
    id_project: number,
    group_id: number,
    id_document: number,
  ): Promise<void> {
    const response = await api.delete<void>(
      `/projects/doc/${id_project}/${group_id}/${id_document}/delete`,
    );
    return response.data;
  }

  static async updateDocument(
    request: UpdateDocumentRequest,
    id_project: number,
    group_id: number,
    id_document: number,
  ): Promise<void> {
    const response = await api.post<void>(
      `/projects/doc/${id_project}/${group_id}/${id_document}/update`,
      request,
    );
    return response.data;
  }
}
