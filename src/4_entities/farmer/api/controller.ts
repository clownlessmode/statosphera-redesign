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
  CompleteMrpRevisionDto,
  CompleteMrpTastingDto,
  CompleteNdCheckDto,
  CompleteNdRevisionDto,
  FarmerApplicationDetail,
  FarmerApplicationResponse,
  ProfileResponse,
  RequestDto,
  RequestDtoKmContacts,
  RequestDtoPhoto,
  SuccessResponse,
} from "../config";
import { ROLES } from "@shared/constants/roles";

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
  });
};

export const useCompleteMrpTasting = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteMrpTastingDto>({
    mutationFn: (dto) => FarmerService.completeMrpTasting(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
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
  });
};

export const useCompleteFarmerNdFill = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.completeFarmerNdFill(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useCompleteNdCheck = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteNdCheckDto>({
    mutationFn: (dto) => FarmerService.completeNdCheck(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useCompleteNdRevision = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, CompleteNdRevisionDto>({
    mutationFn: (dto) => FarmerService.completeNdRevision(idApplication, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-applications"] });
    },
  });
};

export const useCompletePriceCalculation = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.completePriceCalculation(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useCompletePriceApproval = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.completePriceApproval(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useCompleteLabelDesign = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.completeLabelDesign(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
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
    },
  );
};

export const useCompleteNoveltyDistribution = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.completeNoveltyDistribution(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useFailNovelty = (idApplication: string) => {
  const queryClient = useQueryClient();

  return useMutation<SuccessResponse, ApiError, void>({
    mutationFn: () => FarmerService.failNovelty(idApplication),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["farmer-applications", idApplication],
      });
    },
  });
};

export const useFarmer = (
  idUser?: number,
  role?: string,
  idApplication?: string,
) => {
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

  const getApplication = useQuery<FarmerApplicationDetail, ApiError>({
    queryKey: ["farmer-applications", idApplication],
    queryFn: async () => {
      const response = await FarmerService.getApplication(idApplication!);
      return response;
    },
    enabled: !!idApplication,
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
    getApplication: getApplication.refetch,
    isApplicationLoading: getApplication.isPending,
    application: getApplication.data,
  };
};
