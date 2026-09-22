import { api } from "@shared/api/api";
import {
  SuccessResponse,
  CompleteFarmerApprovalDto,
  CompleteFarmerLabelApprovalDto,
  CompleteMrpRevisionDto,
  CompleteMrpTastingDto,
  CompleteNdCheckDto,
  CompleteNdRevisionDto,
  FarmerApplicationDetail,
  FarmerApplicationResponse,
  RequestDto,
  RequestDtoKmContacts,
  RequestDtoPhoto,
} from "../config";

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

  static async getApplications(params?: { offset?: number; limit?: number }) {
    const response = await api.get<FarmerApplicationResponse>(
      "/bitrix/applications",
      {
        params,
      },
    );
    return response.data;
  }

  static async getApplication(id: string) {
    const response = await api.get<FarmerApplicationDetail>(
      `/bitrix/applications/${id}`,
    );
    return response.data;
  }

  static async completeFarmerApproval(
    id: string,
    dto: CompleteFarmerApprovalDto,
  ) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-farmer-approval`,
      dto,
    );
    return response.data;
  }

  static async completeMrpTasting(id: string, dto: CompleteMrpTastingDto) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-mrp-tasting`,
      dto,
    );
    return response.data;
  }

  static async completeMrpRevision(id: string, dto: CompleteMrpRevisionDto) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-mrp-revision`,
      dto,
    );
    return response.data;
  }

  static async completeFarmerNdFill(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-farmer-nd-fill`,
      {},
    );
    return response.data;
  }

  static async completeNdCheck(id: string, dto: CompleteNdCheckDto) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-nd-check`,
      dto,
    );
    return response.data;
  }

  static async completeNdRevision(id: string, dto: CompleteNdRevisionDto) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-nd-revision`,
      dto,
    );
    return response.data;
  }

  static async completePriceCalculation(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-price-calculation`,
      {},
    );
    return response.data;
  }

  static async completePriceApproval(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-price-approval`,
      {},
    );
    return response.data;
  }

  static async completeLabelDesign(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-label-design`,
      {},
    );
    return response.data;
  }

  static async completeFarmerLabelApproval(
    id: string,
    dto: CompleteFarmerLabelApprovalDto,
  ) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-farmer-label-approval`,
      dto,
    );
    return response.data;
  }

  static async completeNoveltyDistribution(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/complete-novelty-distribution`,
      {},
    );
    return response.data;
  }

  static async failNovelty(id: string) {
    const response = await api.post<SuccessResponse>(
      `/bitrix/item/${id}/stage/fail`,
      {},
    );
    return response.data;
  }
}
