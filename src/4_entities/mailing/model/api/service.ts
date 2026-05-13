import { api } from "@shared/api/api";
import {
  MailingChannel,
  MailingChannelAddDto,
  MailingChannelDto,
  MailingChannelUpdateDto,
} from "../types";

export class MailingService {
  static async getChannels(dto: MailingChannelDto): Promise<MailingChannel[]> {
    const response = await api.post<MailingChannel[]>(
      "/max-messenger/chats/list",
      dto,
    );
    return response.data;
  }

  static async addChannel(dto: MailingChannelAddDto): Promise<void> {
    await api.post<void>("/max-messenger/chats", dto);
  }

  static async updateChannel(
    id: number,
    dto: MailingChannelUpdateDto,
  ): Promise<void> {
    await api.patch<void>(`/max-messenger/chats/${id}`, dto);
  }

  static async enableChannel(id: number): Promise<void> {
    await api.post<void>(`/max-messenger/chats/${id}/enable`);
  }

  static async disableChannel(id: number): Promise<void> {
    await api.post<void>(`/max-messenger/chats/${id}/disable`);
  }
}
