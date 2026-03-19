import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiError } from "@shared/api/types";
import { StoreSettingsService } from "./service";
import { StoreStatusRoData } from "../config";

export const useStoreSettingsController = () => {
  const queryClient = useQueryClient();
  const getStoreStatus = useMutation<
    StoreStatusRoData,
    ApiError,
    { ip: string }
  >({
    mutationFn: async ({ ip }) => {
      const response = await StoreSettingsService.getStoreStatus(ip);
      return response;
    },
  });
  const openDoor = useMutation<
    unknown,
    ApiError,
    { ip: string; open: boolean }
  >({
    mutationFn: async ({ ip, open }) => {
      const response = await StoreSettingsService.openDoor(ip, open);
      queryClient.invalidateQueries({ queryKey: ["store-status"] });
      return response;
    },
  });
  const reboot = useMutation<unknown, ApiError, { ip: string }>({
    mutationFn: async ({ ip }) => {
      const response = await StoreSettingsService.reboot(ip);
      return response;
    },
  });
  const emergencyClosure = useMutation<
    unknown,
    ApiError,
    { ip: string; enabled: boolean }
  >({
    mutationFn: async ({ ip, enabled }) => {
      const response = await StoreSettingsService.emergencyClosure(ip, enabled);
      getStoreStatus.mutate({ ip });
      return response;
    },
  });
  const toggleNightMode = useMutation<
    unknown,
    ApiError,
    { ip: string; enabled: boolean }
  >({
    mutationFn: async ({ ip, enabled }) => {
      const response = await StoreSettingsService.toggleNightMode(ip, enabled);
      return response;
    },
  });
  return {
    isGetStoreStatusLoading: getStoreStatus.isPending,
    getStoreStatusAsync: getStoreStatus.mutateAsync,
    openDoor: openDoor.mutateAsync,
    isOpenDoorLoading: openDoor.isPending,
    reboot: reboot.mutateAsync,
    isRebootLoading: reboot.isPending,
    emergencyClosure: emergencyClosure.mutateAsync,
    isEmergencyClosureLoading: emergencyClosure.isPending,
    toggleNightMode: toggleNightMode.mutateAsync,
    isToggleNightModeLoading: toggleNightMode.isPending,
  };
};

export default useStoreSettingsController;
