import { apiV2 } from "@shared/api/api";
import { AuthorizationDto } from "./dto/dto";
import { AuthorizationRo } from "./dto/ro";

export class AuthorizationService {
  static async authorization(dto: AuthorizationDto): Promise<AuthorizationRo> {
    const response = await apiV2.post<AuthorizationRo>("auth/login", dto, {
      headers: {
        "x-mobile-server": "wtf?",
      },
    });
    return response.data;
  }
}
