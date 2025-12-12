import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiError } from "@shared/api/types";
import { FarmerService } from "./service";
import {
  ProfileResponse,
  RequestDto,
  RequestDtoKmContacts,
  RequestDtoPhoto,
} from "../config";
import { ROLES } from "@shared/constants/roles";

export const useFarmer = (idUser?: number, role?: string) => {
  const queryClient = useQueryClient();
  const isFarmer = role === ROLES.FARMER || role === ROLES.ADMIN;

  const checkProfile = useQuery<boolean, ApiError>({
    queryKey: ["checkProfile", idUser],
    queryFn: async () => {
      const response = await FarmerService.checkProfile(idUser!);
      return response;
    },
    enabled: !!idUser && isFarmer,
  });

  const getProfile = useQuery<ProfileResponse, ApiError>({
    queryKey: ["farmer", idUser],
    queryFn: async () => {
      const response = await FarmerService.getProfile(idUser!);
      return response;
    },
    enabled: !!idUser && checkProfile.data === true,
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
    checkProfile: checkProfile.refetch,
    isCheckProfileLoading: checkProfile.isPending,
    profileStatus: checkProfile.data,
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
