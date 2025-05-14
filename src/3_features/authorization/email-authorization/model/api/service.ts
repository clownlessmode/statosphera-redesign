import { api } from "@shared/api/api";
import { AuthorizationDto } from "./dto/dto";
import { AuthorizationRo } from "./dto/ro";

export class AuthorizationService {
  static async authorization(dto: AuthorizationDto): Promise<AuthorizationRo> {
    const response = await api.post<AuthorizationRo>("auth/login", dto);
    return response.data;
  }
}
