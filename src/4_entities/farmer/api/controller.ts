import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { FarmerService } from "./service";
import {
  FarmerApplicationDetail,
  FarmerApplication,
  ProfileResponse,
  RequestDto,
  RequestDtoKmContacts,
  RequestDtoPhoto,
} from "../config";
import { ROLES } from "@shared/constants/roles";

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

  const getApplications = useQuery<FarmerApplication[], ApiError>({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await FarmerService.getApplications();
      return response;
    },
  });

  const getApplication = useQuery<FarmerApplicationDetail, ApiError>({
    queryKey: ["application", idApplication],
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
    getApplications: getApplications.refetch,
    isApplicationsLoading: getApplications.isPending,
    applications: getApplications.data,
    getApplication: getApplication.refetch,
    isApplicationLoading: getApplication.isPending,
    application: getApplication.data,
  };
};
