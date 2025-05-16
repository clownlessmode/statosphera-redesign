import { ApiError } from "@shared/api/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { RecoverPasswordService } from "./service";

export const useRecoverPassword = () => {
  const recover = useMutation<any, ApiError, { email: string }>({
    mutationFn: (dto) =>
      toast
        .promise(RecoverPasswordService.recoverPassword(dto.email), {
          loading: "Сброс пароля",
          success: () => {
            return `Новый пароль отправлен на почту ${dto.email}`;
          },
          error: (error) => {
            if (error.response?.data) {
              return `Произошла ошибка: ${error.response.data.message}`;
            }
            return "Не удалось восстановить пароль";
          },
        })
        .unwrap(),
  });

  return {
    recover: recover.mutateAsync,
    isRecoverLoading: recover.isPending,
  };
};
