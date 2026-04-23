"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { useForm, type DefaultValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateProject, useGetUsers } from "../api/controller";
import { Input } from "@shared/ui/input";
import { Button } from "@shared/ui/button";
import { DatePicker } from "@shared/ui/date-picker";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { PlusIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { useMemo, useState } from "react";
import { MultiSelect } from "@shared/ui/multiselect";
import { formatUserLastNameInitials } from "./project-page/lib/format-user-display-name";

const createProjectSchema = z
  .object({
    name: z.string().min(1, "Название проекта обязательно"),
    responsible_name: z.string().min(1, "Ответственный обязательно"),
    team_info: z.string().min(1, "Команда обязательно"),
    client_name: z.string().min(1, "Заказчик обязательно"),
    pm_name: z.string().min(1, "Проджект-менеджер обязательно"),
    stage: z.string().min(1, "Этапы проекта обязательно"),
    start_date: z.date({ message: "Выберите дату начала" }),
    end_date: z.date({ message: "Выберите дату окончания" }),
    priority: z.string().min(1, "Приоритет обязательно"),
    access_users: z.array(z.number()).optional(),
  })
  .refine((data) => data.end_date >= data.start_date, {
    message: "Дата окончания не раньше даты начала",
    path: ["end_date"],
  });

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

const stages = [
  "Инициация",
  "Планирование",
  "Проектирование",
  "Внедрение",
  "Разработка",
  "Тестирование",
  "Заморожен",
  "Закрытие",
];

const priorities = ["Низкий", "Средний", "Высокий"];

export const CreateProjectForm = () => {
  const { mutate: createProject, isPending } = useCreateProject();
  const [isOpen, setIsOpen] = useState(false);
  const [optionsRefresh, setOptionsRefresh] = useState(0);
  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      responsible_name: "",
      team_info: "",
      client_name: "",
      pm_name: "",
      stage: "",
      priority: "",
      access_users: [],
    } satisfies DefaultValues<CreateProjectFormData>,
  });

  const { data: users, isLoading } = useGetUsers();

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users, optionsRefresh],
  );

  const onSubmit = (data: CreateProjectFormData) => {
    createProject(
      {
        name: data.name,
        responsible_name: data.responsible_name,
        team_info: data.team_info,
        client_name: data.client_name,
        pm_name: data.pm_name,
        stage: data.stage,
        start_date: data.start_date.toISOString(),
        end_date: data.end_date.toISOString(),
        priority: data.priority,
        access_users: data.access_users ?? [],
      },
      {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          Создать проект
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Создать проект</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Название проекта</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите название проекта"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="responsible_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ответственный</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите ответственного"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="team_info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Команда</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите команду"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="client_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Заказчик</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите название проекта"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pm_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Проджект-менеджер</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите проджект-менеджера"
                          className="bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Этап проекта</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full !bg-background">
                            <SelectValue placeholder="Выберите этап проекта" />
                          </SelectTrigger>
                          <SelectContent>
                            {stages.map((stage) => (
                              <SelectItem key={stage} value={stage}>
                                {stage}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Дата начала</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите дату начала"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Дата окончания</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите дату окончания"
                          disabled={(date) => {
                            const start = form.getValues("start_date");
                            return Boolean(start && date < start);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Приоритет</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full !bg-background">
                            <SelectValue placeholder="Выберите приоритет" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((priority) => (
                              <SelectItem key={priority} value={priority}>
                                {priority}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="access_users"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Доступ</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Выберите кому доступен проект"
                          options={userOptions}
                          isLoading={isLoading}
                          value={field.value?.map(String) || []}
                          onValueChange={(values) => {
                            field.onChange(values.map(Number));
                          }}
                          onOpenChange={(popoverOpen) => {
                            if (popoverOpen) {
                              requestAnimationFrame(() => {
                                requestAnimationFrame(() => {
                                  setOptionsRefresh((n) => n + 1);
                                });
                              });
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  Создать проект
                </Button>
              </form>
            </Form>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
