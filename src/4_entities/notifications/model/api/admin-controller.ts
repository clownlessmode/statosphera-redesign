import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NotificationService } from "./service";
import {
  Notification,
  CreateNotificationData,
  NotificationStats,
} from "./types";

export const useAdminNotifications = () => {
  const queryClient = useQueryClient();

  const notificationsQuery = useQuery<Notification[]>({
    queryKey: ["admin-notifications", "list"],
    queryFn: () => NotificationService.getNotifications(1000, 0),
  });

  const notificationStatsQuery = useQuery<NotificationStats>({
    queryKey: ["admin-notifications", "stats"],
    queryFn: () => NotificationService.getNotificationStats(),
    refetchInterval: 30_000,
  });

  const createNotification = useMutation<
    Notification,
    Error,
    CreateNotificationData
  >({
    mutationFn: (data) => NotificationService.createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const createNotificationForEveryone = useMutation<
    Notification,
    Error,
    Omit<CreateNotificationData, "user">
  >({
    mutationFn: (data) =>
      NotificationService.createNotificationForEveryone(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const deleteNotification = useMutation<void, Error, number>({
    mutationFn: (id) => NotificationService.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const readNotification = useMutation<Notification, Error, number>({
    mutationFn: (id) => NotificationService.readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications: notificationsQuery.data,
    isNotificationsLoading: notificationsQuery.isLoading,
    stats: notificationStatsQuery.data,
    isStatsLoading: notificationStatsQuery.isLoading,
    createNotification: createNotification.mutateAsync,
    createNotificationForEveryone: createNotificationForEveryone.mutateAsync,
    deleteNotification: deleteNotification.mutateAsync,
    readNotification: readNotification.mutateAsync,
    isCreating: createNotification.isPending,
    isDeleting: deleteNotification.isPending,
    isReading: readNotification.isPending,
  };
};
