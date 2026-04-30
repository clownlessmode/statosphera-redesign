import { api } from "@shared/api/api";
import {
  CreateIdeaRequest,
  IdeasResponse,
  MyIdeaResponse,
  UpdateIdeaRequest,
  VoteRequest,
} from "./types";

export class DemocracyService {
  static async getIdeas(
    limit?: number,
    offset?: number,
  ): Promise<IdeasResponse> {
    const response = await api.get<IdeasResponse>("offer", {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  }

  static async getMyIdea(): Promise<MyIdeaResponse> {
    const response = await api.get<MyIdeaResponse>("offer/my");
    return response.data;
  }

  static async createIdea(dto: CreateIdeaRequest): Promise<void> {
    const response = await api.post<void>("offer", dto);
    return response.data;
  }

  static async updateIdea(
    ideaId: number,
    dto: UpdateIdeaRequest,
  ): Promise<void> {
    const response = await api.patch<void>(`offer/${ideaId}`, dto);
    return response.data;
  }

  static async deleteIdea(ideaId: number): Promise<void> {
    const response = await api.delete<void>(`offer/${ideaId}`);
    return response.data;
  }

  static async voteIdea(ideaId: number, dto: VoteRequest): Promise<void> {
    const response = await api.post<void>(`offer/grade/${ideaId}`, dto);
    return response.data;
  }
}
