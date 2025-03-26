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
  const { isAuthorizationLoading } = useAuthorizationController();
  const { setSession } = useSession();
  const navigate = useNavigate();
  // data: FormValues;
  const handleSubmit = async () => {
    // const session = await authorize(data);
    setSession({
      auth: true,
      idRole: 1,
      idUser: 1,
      isAdminProduct: true,
      isGrillProject: true,
      idStore: [1],
      role: "ADMIN",
      userName: "Тестовый Пользователь Статосферы",
      school: false,
    });
    // session;
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
