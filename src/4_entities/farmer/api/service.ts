import { api } from "@shared/api/api";
import { RequestDto, RequestDtoKmContacts, RequestDtoPhoto } from "../config";

export class FarmerService {
  static async getProfile(id: number) {
    const response = await api.get("/profile/get-profile/" + id);
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

  static async uploadDeclarationPhoto(dto: Required<RequestDtoPhoto>) {
    const formData = new FormData();
    formData.append("photo", dto.photo);
    formData.append("idDeclaration", dto.idDeclaration.toString());
    const response = await api.post(
      "/profile/upload-declaration-photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  }

  static async updateProfile(dto: RequestDto) {
    const response = await api.put("/profile/update-profile", dto);
    return response.data;
  }

  static async updateKmContacts(dto: RequestDtoKmContacts) {
    const response = await api.put("/profile/update-km-contacts", dto);
    return response.data;
  }
}
