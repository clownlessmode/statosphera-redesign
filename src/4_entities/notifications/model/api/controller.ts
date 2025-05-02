import { useMutation, useQuery } from "@tanstack/react-query";
import { NotificationService } from "./service";
import { Notification } from "./types";

export const useNotifications = () => {
  const notificationsQuery = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getNotifications(100, 0),
    refetchIntervalInBackground: true,
  });
  const notificationsCountQuery = useQuery<{ count: number }[]>({
    queryKey: ["notifications"],
    queryFn: () => NotificationService.getCountNotifications(),
    refetchInterval: 5_000,
    refetchIntervalInBackground: true,
  });
  const readNotification = useMutation<Notification, Error, number>({
    mutationFn: (id) => NotificationService.readNotification(id),
    onSuccess: () => {
      notificationsQuery.refetch();
    },
  });

  return {
    notifications: notificationsQuery.data,
    isNotificationsLoading: notificationsQuery.isLoading,

    count: notificationsCountQuery.data,
    readNotification: readNotification.mutateAsync,
  };
};
