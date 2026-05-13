import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MailingService } from "./service";
import {
  MailingChannel,
  MailingChannelAddDto,
  MailingChannelDto,
  MailingChannelUpdateDto,
} from "../types";
import { toast } from "sonner";
import { ApiError } from "@shared/api/types";

export const useAdminMailing = (channelsDto?: MailingChannelDto) => {
  const queryClient = useQueryClient();

  const channelsQuery = useQuery<MailingChannel[], ApiError>({
    queryKey: ["mailing", channelsDto],
    queryFn: () => MailingService.getChannels(channelsDto as MailingChannelDto),
    enabled: !!channelsDto,
  });

  const addChannel = useMutation({
    mutationFn: (data: MailingChannelAddDto) => MailingService.addChannel(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailing"] });
      toast.success("Канал успешно добавлен");
    },
    onError: () => {
      toast.error("Ошибка при добавлении канала");
    },
  });

  const updateChannel = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MailingChannelUpdateDto }) =>
      MailingService.updateChannel(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailing"] });
      toast.success("Канал успешно обновлен");
    },
    onError: () => {
      toast.error("Ошибка при обновлении канала");
    },
  });

  const enableChannel = useMutation({
    mutationFn: (id: number) => MailingService.enableChannel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailing"] });
      toast.success("Канал успешно активирован");
    },
    onError: () => {
      toast.error("Ошибка при активации канала");
    },
  });

  const disableChannel = useMutation({
    mutationFn: (id: number) => MailingService.disableChannel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mailing"] });
      toast.success("Канал успешно деактивирован");
    },
    onError: () => {
      toast.error("Ошибка при деактивации канала");
    },
  });

  return {
    channels: channelsQuery.data,
    isGettingChannels: channelsQuery.isFetching,
    getChannels: channelsQuery.refetch,
    addChannel: addChannel.mutateAsync,
    isAdding: addChannel.isPending,
    updateChannel: updateChannel.mutateAsync,
    isUpdating: updateChannel.isPending,
    enableChannel: enableChannel.mutateAsync,
    isEnabling: enableChannel.isPending,
    disableChannel: disableChannel.mutateAsync,
    isDisabling: disableChannel.isPending,
  };
};
