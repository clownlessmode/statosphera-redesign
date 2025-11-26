import { api } from "@shared/api/api";
import { RequestDto, RequestDtoPhoto } from "../config";

export class FarmerService {
  static async getProfile(id: number) {
    const response = await api.get("/profile/get-profile/" + id);
    return response.data;
  }

  static async checkProfile(id: number) {
    const response = await api.get("/profile/check-profile/" + id);
    return response.data;
  }

  static async createProfile(dto: RequestDto) {
    const response = await api.post("/profile/create-profile", dto);
    return response.data;
  }

  static async uploadPhoto(dto: RequestDtoPhoto) {
    const formData = new FormData();
    formData.append("photo", dto.photo);
    const response = await api.post("/profile/upload-photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async updateProfile(dto: RequestDto) {
    const response = await api.put("/profile/update-profile", dto);
    return response.data;
  }
}
