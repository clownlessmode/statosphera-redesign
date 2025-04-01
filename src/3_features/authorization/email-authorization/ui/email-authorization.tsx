import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { FC } from "react";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import useForm from "../model/hook";
import { preventSpaces } from "@shared/lib/prevent-spaces";
// import { FormValues } from "../model/types";
import { useAuthorizationController } from "../model/api/controller";
import { useSession } from "@entities/session";
import { useNavigate } from "react-router";
export const EmailAuthorization: FC = () => {
  const form = useForm();
  // authorize;
  const { isAuthorizationLoading } = useAuthorizationController();
  const { setSession } = useSession();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    // data: FormValues;
    // const session = await authorize(data);
    // session;
    setSession({
      auth: true,
      idRole: 1,
      idStore: [1],
      idUser: 1,
      isAdminProduct: true,
      isGrillProject: true,
      role: "ADMIN",
      school: false,
      userName: "Тестовый Юзер Обрабатывающий",
    });
    navigate("/");
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Электронная почта</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="email"
                  placeholder="Электронная почта"
                  onKeyDown={preventSpaces}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Пароль</FormLabel>
              <FormControl>
                <Input
                  id={field.name}
                  type="password"
                  placeholder="Пароль"
                  onKeyDown={preventSpaces}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid}
          loading={isAuthorizationLoading}
        >
          Войти
        </Button>
        <FormMessage />
      </form>
    </Form>
  );
};
