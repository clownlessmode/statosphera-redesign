import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { ApiError } from "@shared/api/types";
import { FarmerService } from "./service";
import {
  CompleteFarmerApprovalDto,
  CompleteFarmerLabelApprovalDto,
  CompleteFarmerNdFillDto,
  CompleteMrpRevisionDto,
  CompleteNdRevisionDto,
  FarmerApplicationDetail,
  FarmerApplicationResponse,
  ProfileResponse,
  RequestDto,
  RequestDtoKmContacts,
  RequestDtoPhoto,
  SuccessResponse,
  UploadFileResponse,
} from "../config";
import { ROLES } from "@shared/constants/roles";
import { toast } from "sonner";

export const useInfiniteFarmerApplications = (params: { limit: number }) => {
  const getApplications = useInfiniteQuery<FarmerApplicationResponse, ApiError>(
    {
      queryKey: ["farmer-applications", "list", params.limit],
      queryFn: ({ pageParam }) =>
        FarmerService.getApplications({
          limit: params.limit,
          offset: pageParam as number,
        }),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasMore || lastPage.items.length === 0) return undefined;

        return allPages.reduce((offset, page) => offset + page.items.length, 0);
      },
      initialPageParam: 0,
    },
  );

  const applications = useMemo(() => {
    const uniqueApplications = new Map(
      getApplications.data?.pages
        .flatMap((page) => page.items ?? [])
        .map((application) => [application.itemId, application]),
    );

    return Array.from(uniqueApplications.values());
  }, [getApplications.data?.pages]);

  return {
    applications,
    isApplicationsLoading: getApplications.isLoading,
    isApplicationsError: getApplications.isError,
    isApplicationsFetchingNextPage: getApplications.isFetchingNextPage,
    isApplicationsFetchNextPageError: getApplications.isFetchNextPageError,
    fetchNextPage: getApplications.fetchNextPage,
    hasNextPage: getApplications.hasNextPage,
    refetchApplications: getApplications.refetch,
  };
};

export const useCompleteFarmerApproval = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteFarmerApprovalDto>({
    mutationFn: (dto) =>
      FarmerService.completeFarmerApproval(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
    onError: () => {
      toast.error("Не удалось выполнить действие");
    },
  });
};

export const useCompleteMrpRevision = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteMrpRevisionDto>({
    mutationFn: (dto) => FarmerService.completeMrpRevision(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
    onError: () => {
      toast.error("Не удалось выполнить действие");
    },
  });
};

export const useCompleteFarmerNdFill = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteFarmerNdFillDto>({
    mutationFn: (dto) => FarmerService.completeFarmerNdFill(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
    onError: () => {
      toast.error("Не удалось выполнить действие");
    },
  });
};

export const useCompleteNdRevision = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteNdRevisionDto>({
    mutationFn: (dto) => FarmerService.completeNdRevision(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
    onError: () => {
      toast.error("Не удалось выполнить действие");
    },
  });
};

export const useCompleteFarmerLabelApproval = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteFarmerLabelApprovalDto>(
    {
      mutationFn: (dto) =>
        FarmerService.completeFarmerLabelApproval(idApplication, dto),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["farmer-applications", idApplication],
        });
      },
      onError: () => {
        toast.error("Не удалось выполнить действие");
      },
    },
  );
};

export const useFarmerApplicationDetail = (idApplication: string) => {
  return useQuery<FarmerApplicationDetail, ApiError>({
    queryKey: ["farmer-applications", idApplication],
    queryFn: async () => {
      const response = await FarmerService.getApplication(idApplication);
      return response;
    },
    enabled: !!idApplication,
  });
};

export const useUploadFile = () => {
  return useMutation<UploadFileResponse, ApiError, File>({
    mutationFn: async (photo: File) => {
      const response = await FarmerService.uploadFile(photo);
      return response;
    },
  });
};

export const useFarmer = (idUser?: number, role?: string) => {
  const queryClient = useQueryClient();
  const isFarmer = role === ROLES.FARMER || role === ROLES.ADMIN;

  const getProfile = useQuery<ProfileResponse, ApiError>({
    queryKey: ["farmer", idUser],
    queryFn: async () => {
      const response = await FarmerService.getProfile(idUser!);
      return response;
    },
    enabled: !!idUser && isFarmer,
  });

  const createProfile = useMutation<void, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await FarmerService.createProfile(dto);
      queryClient.invalidateQueries({ queryKey: ["createProfile"] });
      return response;
    },
  });

  const uploadPhoto = useMutation<void, ApiError, RequestDtoPhoto>({
    mutationFn: async (dto: RequestDtoPhoto) => {
      const response = await FarmerService.uploadPhoto(dto);
      queryClient.invalidateQueries({ queryKey: ["farmer"] });
      return response;
    },
  });

  const uploadDeclarationPhoto = useMutation<
    void,
    ApiError,
    Required<RequestDtoPhoto>
  >({
    mutationFn: async (dto: Required<RequestDtoPhoto>) => {
      const response = await FarmerService.uploadDeclarationPhoto(dto);
      queryClient.invalidateQueries({ queryKey: ["farmer"] });
      return response;
    },
  });

  const updateProfile = useMutation<void, ApiError, RequestDto>({
    mutationFn: async (dto: RequestDto) => {
      const response = await FarmerService.updateProfile(dto);
      queryClient.invalidateQueries({ queryKey: ["farmer"] });
      return response;
    },
  });

  const updateKmContacts = useMutation<void, ApiError, RequestDtoKmContacts>({
    mutationFn: async (dto: RequestDtoKmContacts) => {
      const response = await FarmerService.updateKmContacts(dto);
      queryClient.invalidateQueries({ queryKey: ["farmers"] });
      return response;
    },
  });

  return {
    getProfile: getProfile.refetch,
    isGetProfileLoading: getProfile.isPending,
    profile: getProfile.data,
    createProfile: createProfile.mutateAsync,
    isCreateProfileLoading: createProfile.isPending,
    uploadPhoto: uploadPhoto.mutateAsync,
    isUploadPhotoLoading: uploadPhoto.isPending,
    uploadDeclarationPhoto: uploadDeclarationPhoto.mutateAsync,
    isUploadDeclarationPhotoLoading: uploadDeclarationPhoto.isPending,
    updateProfile: updateProfile.mutateAsync,
    isUpdateProfileLoading: updateProfile.isPending,
    updateKmContacts: updateKmContacts.mutateAsync,
    isUpdateKmContactsLoading: updateKmContacts.isPending,
  };
};
