import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthorizationRo } from "./dto/ro";
import { AuthorizationDto } from "./dto/dto";
import { ApiError } from "@shared/api/types";
import { AuthorizationService } from "./service";
import { toast } from "sonner";

export const useAuthorizationController = () => {
  const queryClient = useQueryClient();

  const authorization = useMutation<
    AuthorizationRo,
    ApiError,
    AuthorizationDto
  >({
    mutationFn: (dto: AuthorizationDto) =>
      toast
        .promise(AuthorizationService.authorization(dto), {
          loading: "Вход в систему",
          success: (ro) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            return `Добро пожаловать ${ro.userName}`;
          },
          error: (error) => {
            if (error.response?.data) {
              return `Произошла ошибка: ${error.response.data.message}`;
            }
            return "Неверная электронная почта и/или пароль";
          },
        })
        .unwrap(),
  });

  return {
    authorize: authorization.mutateAsync,
    isAuthorizationLoading: authorization.isPending,
  };
};
