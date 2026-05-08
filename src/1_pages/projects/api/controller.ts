import { ApiError } from "@shared/api/types";
import {
  CreateDocumentGroupRequest,
  UpdateDocumentGroupRequest,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  CreateForExcelRequest,
  CreateProjectRequest,
  CreateTaskGroupRequest,
  CreateTaskRequest,
  GraphRequest,
  ProjectsFilters,
  UpdateProjectRequest,
  CreateDescriptionRequest,
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
  UsersResponse,
  UpdateProjectResponse,
  CreateDescriptionResponse,
  PmNameResponse,
  ResponsibleNameResponse,
} from "./types/response";
import {
  DocGroupsService,
  DocumentsService,
  FiltersNameService,
  ProjectsService,
  TaskGroupsService,
  TasksService,
} from "./service";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const REVIEWS_PAGE_SIZE = 10;

export const useGetProjects = (filters: ProjectsFilters = {}) => {
  return useInfiniteQuery<Projects[], ApiError>({
    queryKey: ["projects", filters],
    queryFn: ({ pageParam }) =>
      ProjectsService.getProjects({
        ...filters,
        pagination: {
          limit: REVIEWS_PAGE_SIZE,
          offset: pageParam as number,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < REVIEWS_PAGE_SIZE
        ? undefined
        : allPages.length * REVIEWS_PAGE_SIZE,
  });
};

export const useCreateForExcel = () => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, CreateForExcelRequest>({
    mutationFn: (request) => ProjectsService.createForExcel(request),
    onSuccess: async () => {
      toast.success("Проекты успешно загружены");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Произошла ошибка при загрузке проектов");
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation<CreateProjectResponse, ApiError, CreateProjectRequest>({
    mutationFn: (request) => ProjectsService.createProject(request),
    onSuccess: async () => {
      toast.success("Проект успешно создан");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: () => {
      toast.error("Произошла ошибка при создании проекта");
    },
  });
};

export const useCreateDescription = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateDescriptionResponse,
    ApiError,
    CreateDescriptionRequest
  >({
    mutationFn: (request) => ProjectsService.createDescription(request, id),
    onSuccess: async () => {
      toast.success("Описание успешно добавлено");
      await queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
    onError: () => {
      toast.error("Произошла ошибка при добавлении обновления");
    },
  });
};

export const useGetGraph = (filters: GraphRequest = {}) => {
  return useQuery<Graph[], ApiError>({
    queryKey: ["graph", filters],
    queryFn: () => ProjectsService.getGraph(filters),
    enabled: !!filters,
  });
};

export const useUpdateProject = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<UpdateProjectResponse, ApiError, UpdateProjectRequest>({
    mutationFn: (request) => ProjectsService.updateProject(request, id),
    onSuccess: async () => {
      toast.success("Проект успешно обновлен");
      await queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
    onError: () => {
      toast.error("Произошла ошика при обновлении проекта");
    },
  });
};

export const useDeleteProject = (id: number | undefined) => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError>({
    mutationFn: () => {
      if (typeof id !== "number" || !Number.isFinite(id) || id <= 0) {
        return Promise.reject(new Error("Некорректный id проекта"));
      }
      return ProjectsService.deleteProject(id);
    },
    onSuccess: async () => {
      toast.success("Проект успешно удален");
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (typeof id === "number" && Number.isFinite(id)) {
        await queryClient.removeQueries({ queryKey: ["project", id] });
      }
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении проекта");
    },
  });
};
export const useGetProject = (id: number | undefined) => {
  return useQuery<ProjectDetail, ApiError>({
    queryKey: ["project", id],
    queryFn: () => ProjectsService.getProjectById(id as number),
    enabled: typeof id === "number" && Number.isFinite(id) && id > 0,
  });
};

export const useGetPmName = (enabled: boolean) => {
  return useQuery<PmNameResponse[], ApiError>({
    queryKey: ["pm-name"],
    queryFn: () => FiltersNameService.getPmName({}),
    enabled,
  });
};

export const useGetResponsibleName = (enabled: boolean) => {
  return useQuery<ResponsibleNameResponse[], ApiError>({
    queryKey: ["responsible-name"],
    queryFn: () => FiltersNameService.getResponsibleName({}),
    enabled,
  });
};

export const useGetTaskGroups = (id_project: number) => {
  return useQuery<TaskGroup[], ApiError>({
    queryKey: ["task-groups", id_project],
    queryFn: () => TaskGroupsService.getTaskGroups(id_project),
    enabled: !!id_project,
  });
};

export const useCreateTaskGroup = (project_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateTaskGroupResponse, ApiError, CreateTaskGroupRequest>(
    {
      mutationFn: (request) =>
        TaskGroupsService.createTaskGroup(request, project_id),
      onSuccess: async () => {
        toast.success("Группа задач успешно создана");
        await queryClient.invalidateQueries({
          queryKey: ["task-groups", project_id],
        });
      },
      onError: () => {
        toast.error("Произошла ошибка при создании группы задач");
      },
    },
  );
};

export const useCreateTask = (project_id: number, group_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateTaskResponse, ApiError, CreateTaskRequest>({
    mutationFn: (request) =>
      TaskGroupsService.createTask(request, project_id, group_id),
    onSuccess: async () => {
      toast.success("Задача успешно создана");
      await queryClient.invalidateQueries({
        queryKey: ["tasks", project_id, group_id],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при создании задачи");
    },
  });
};

export const useCreateDocumentGroup = (project_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    CreateDocumentGroupResponse,
    ApiError,
    CreateDocumentGroupRequest
  >({
    mutationFn: (request) =>
      DocGroupsService.createDocumentGroup(request, project_id),
    onSuccess: async () => {
      toast.success("Группа документов успешно создана");
      await queryClient.invalidateQueries({
        queryKey: ["doc-groups", project_id],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при создании группы документов");
    },
  });
};

export const useUpdateDocumentGroup = (project_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    ApiError,
    { group_id: number; body: UpdateDocumentGroupRequest }
  >({
    mutationFn: ({ group_id, body }) =>
      DocGroupsService.updateDocumentGroup(body, project_id, group_id),
    onSuccess: async () => {
      toast.success("Группа документов обновлена");
      await queryClient.invalidateQueries({
        queryKey: ["doc-groups", project_id],
      });
    },
    onError: () => {
      toast.error("Не удалось обновить группу документов");
    },
  });
};

export const useCreateDocument = (project_id: number, group_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<CreateDocumentResponse, ApiError, CreateDocumentRequest>({
    mutationFn: (request) =>
      DocGroupsService.createDocument(request, project_id, group_id),
    onSuccess: async () => {
      toast.success("Документ успешно создан");
      await queryClient.invalidateQueries({
        queryKey: ["documents", project_id, group_id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["doc-groups", project_id],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при создании документа");
    },
  });
};

export const useGetUsers = () => {
  return useQuery<UsersResponse[], ApiError>({
    queryKey: ["users"],
    queryFn: () => ProjectsService.getUsers(),
  });
};

export const useGetDocGroups = (id_project: number) => {
  return useQuery<DocGroup[], ApiError>({
    queryKey: ["doc-groups", id_project],
    queryFn: () => DocGroupsService.getDocGroups(id_project),
    enabled: !!id_project,
  });
};

export const useGetTasks = (
  id_project: number,
  group_id: number,
  options?: { enabled?: boolean },
) => {
  const canFetch = options?.enabled ?? true;
  return useQuery<Task[], ApiError>({
    queryKey: ["tasks", id_project, group_id],
    queryFn: () => TasksService.getTasks(id_project, group_id),
    enabled: canFetch && !!id_project && !!group_id,
  });
};

export const useGetDocuments = (
  id_project: number,
  group_id: number,
  options?: { enabled?: boolean },
) => {
  const canFetch = options?.enabled ?? true;
  return useQuery<Document[], ApiError>({
    queryKey: ["documents", id_project, group_id],
    queryFn: () => DocumentsService.getDocuments(id_project, group_id),
    enabled: canFetch && !!id_project && !!group_id,
  });
};

export const useDeleteDocument = (
  id_project: number,
  group_id: number,
  id_document: number,
) => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError>({
    mutationFn: () =>
      DocumentsService.deleteDocument(id_project, group_id, id_document),
    onSuccess: async () => {
      toast.success("Документ успешно удален");
      await queryClient.invalidateQueries({
        queryKey: ["documents", id_project, group_id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["doc-groups", id_project],
      });
    },
  });
};

export const useUpdateDocument = (id_project: number, group_id: number) => {
  const queryClient = useQueryClient();
  return useMutation<
    void,
    ApiError,
    { doc_id: number; body: UpdateDocumentRequest }
  >({
    mutationFn: ({ doc_id, body }) =>
      DocumentsService.updateDocument(body, id_project, group_id, doc_id),
    onSuccess: async () => {
      toast.success("Документ обновлён");
      await queryClient.invalidateQueries({
        queryKey: ["documents", id_project, group_id],
      });
    },
    onError: () => {
      toast.error("Не удалось обновить документ");
    },
  });
};

export const useDeleteDocumentGroup = (id_project: number) => {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, number>({
    mutationFn: (group_id) =>
      DocGroupsService.deleteDocumentGroup(id_project, group_id),
    onSuccess: async () => {
      toast.success("Группа документов успешно удалена");
      await queryClient.invalidateQueries({
        queryKey: ["doc-groups", id_project],
      });
    },
  });
};
