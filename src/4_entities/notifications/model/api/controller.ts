import { useMutation, useQuery } from "@tanstack/react-query";
import { NotificationService } from "./service";
import { Notification } from "./types";

export const useNotifications = () => {
  const notificationsQuery = useQuery<Notification[]>({
    queryKey: ["notifications", "list"], // отдельный ключ
    queryFn: () => NotificationService.getNotifications(100, 0),
  });
  const notificationsCountQuery = useQuery<{ count: number }[]>({
    queryKey: ["notifications", "count"], // другой ключ
    queryFn: () => NotificationService.getCountNotifications(),
    refetchInterval: 1_000,
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
