import { api } from "@shared/api/api";
import {
  GetDigestResponse,
  GetDigestsResponse,
  DigestRequest,
  CreateDigestResponse,
  DeleteDigestResponse,
} from "../types";

export class DigestsService {
  static async getDigests(): Promise<GetDigestsResponse> {
    const response = await api.get<GetDigestsResponse>("daydjest");
    return response.data;
  }

  static async getDigest(id: string): Promise<GetDigestResponse> {
    const response = await api.get<GetDigestResponse>(`daydjest/views/${id}`);
    return response.data;
  }

  static async createDigest(
    data: DigestRequest,
  ): Promise<CreateDigestResponse> {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("type", data.type);
    formData.append("description", data.description);

    // Добавляем файлы страниц
    data.files.forEach((file) => {
      formData.append("files", file);
    });

    // Добавляем обложку
    formData.append("cover", data.cover);

    const response = await api.post<CreateDigestResponse>(
      "daydjest/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  }

  static async updateDigest(
    id: string,
    data: Partial<DigestRequest>,
  ): Promise<Partial<DigestRequest>> {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.type) formData.append("type", data.type);
    if (data.description) formData.append("description", data.description);

    // Добавляем файлы страниц
    if (data.files)
      data.files.forEach((file) => {
        formData.append("files", file);
      });

    // Добавляем обложку
    if (data.cover) formData.append("cover", data.cover);

    const response = await api.patch(`daydjest/up/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async deleteDigest(id: string): Promise<DeleteDigestResponse> {
    const response = await api.delete<DeleteDigestResponse>(`daydjest/${id}`);
    return response.data;
  }
}
