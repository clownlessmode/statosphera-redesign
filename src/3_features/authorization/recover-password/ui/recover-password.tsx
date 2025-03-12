import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { FC } from "react";
import useForm from "../model/hook";
import { FormValues } from "../model/types";
import { preventSpaces } from "@shared/lib/prevent-spaces";

export const RecoverPassword: FC = () => {
  const form = useForm();
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Не можете войти?{" "}
          <span className="text-accent underline">Сбросить пароль</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Восстановление пароля</DialogTitle>
          <DialogDescription>
            Введите корпоративный email для восстановления доступа. Пароль будет
            отправлен на указанный адрес.
          </DialogDescription>
        </DialogHeader>
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
            <FormMessage />
            <DialogFooter>
              <Button className="w-full" disabled={!form.formState.isValid}>
                Восстановить пароль
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
