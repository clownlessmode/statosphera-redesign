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
import { useCreateProject, useGetPmName, useGetUsers } from "../api/controller";
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
import { PlusIcon, X } from "lucide-react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@shared/ui/alert-dialog";
import { useNavigate } from "react-router";
import { ROUTES_PATH } from "@app/router/routes";

const createProjectSchema = z
  .object({
    name: z.string().min(1, "Название проекта обязательно"),
    responsible_name: z.string().min(1, "Лидер обязательно"),
    team_info: z.string().min(1, "Команда обязательно"),
    client_name: z.string().min(1, "Заказчик обязательно"),
    pm_name: z.string().min(1, "Выберите проджект-менеджера"),
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
  const navigate = useNavigate();
  const { mutate: createProject, isPending } = useCreateProject();

  // Состояния для управления окнами
  const [isOpen, setIsOpen] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [exitType, setExitType] = useState<"x" | "outside" | null>(null);
  const [optionsRefresh, setOptionsRefresh] = useState(0);
  const [pmSelectOpen, setPmSelectOpen] = useState(false);

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
  const { data: pmList = [] } = useGetPmName(pmSelectOpen);

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users, optionsRefresh],
  );

  // Функция обработки попытки закрытия
  const handleCloseAttempt = (type: "x" | "outside") => {
    // Если форма была изменена (есть введенные данные)
    if (form.formState.isDirty) {
      setExitType(type);
      setShowExitAlert(true);
    } else {
      // Если форма пустая, просто закрываем без лишних вопросов
      setIsOpen(false);
    }
  };

  // Логика кнопок в Alert Dialog
  const handleAlertConfirm = () => {
    if (exitType === "x") {
      // Клик на Х -> Подтвердили выход -> Сброс и закрытие
      form.reset();
      setIsOpen(false);
    } else if (exitType === "outside") {
      // Клик мимо -> Нажали "Сохранить" -> Просто закрываем (данные остаются в форме)
      setIsOpen(false);
    }
    setShowExitAlert(false);
  };

  const handleAlertDiscard = () => {
    if (exitType === "outside") {
      // Клик мимо -> Нажали "Не сохранять" -> Сброс и закрытие
      form.reset();
      setIsOpen(false);
    }
    setShowExitAlert(false);
  };

  const onSubmit = (data: CreateProjectFormData) => {
    createProject(
      {
        ...data,
        start_date: data.start_date.toISOString(),
        end_date: data.end_date.toISOString(),
        access_users: data.access_users ?? [],
      },
      {
        onSuccess: (newProject) => {
          form.reset();
          setIsOpen(false);
          if (newProject.id) {
            const projectId = newProject.id;
            navigate(`${ROUTES_PATH.PROJECTS}/${projectId}`);
          }
        },
      },
    );
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          // Если пытаются закрыть (open === false), мы игнорируем это здесь,
          // так как обработаем вручную через кнопки и overlay
          if (!open) return;
          setIsOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="size-4" />
            Создать проект
          </Button>
        </DialogTrigger>
        <DialogContent
          className="[&>button]:hidden max-h-[90vh] overflow-y-auto max-w-3xl!"
          onPointerDownOutside={(e) => {
            e.preventDefault();
            handleCloseAttempt("outside");
          }}
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            handleCloseAttempt("outside");
          }}
        >
          <DialogHeader className="flex flex-row items-center justify-between space-y-0">
            <DialogTitle>Создать проект</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
              onClick={() => handleCloseAttempt("x")}
            >
              <X className="size-4" />
              <span className="sr-only">Закрыть</span>
            </Button>
          </DialogHeader>
          <DialogBody>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
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
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Лидер</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Введите лидера"
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
                        <FormItem className="flex flex-col gap-2">
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
                        <FormItem className="flex flex-col gap-2">
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
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Проджект-менеджер</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                              onOpenChange={setPmSelectOpen}
                            >
                              <SelectTrigger className="w-full !bg-background">
                                <SelectValue placeholder="Выберите проджект-менеджера" />
                              </SelectTrigger>
                              <SelectContent
                                side="top"
                                sideOffset={4}
                                className="max-h-66"
                              >
                                {pmList.map((row) => (
                                  <SelectItem
                                    key={row.pm_name}
                                    value={row.pm_name}
                                  >
                                    {row.pm_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="stage"
                      render={({ field }) => (
                        <FormItem className="flex flex-col gap-2">
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
                              disabled={(date) => {
                                const end = form.getValues("end_date");
                                return Boolean(end && date > end);
                              }}
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
                        <FormItem className="flex flex-col gap-2">
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
                        <FormItem className="flex flex-col gap-2">
                          <FormLabel>Доступ</FormLabel>
                          <FormControl>
                            <MultiSelect
                              className="!min-h-[36px]"
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
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Создание..." : "Создать проект"}
                </Button>
              </form>
            </Form>
          </DialogBody>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showExitAlert} onOpenChange={setShowExitAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {exitType === "x" ? "Закрыть форму?" : "Сохранить изменения?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {exitType === "x"
                ? "Все введенные данные будут утеряны."
                : "Вы закрываете окно. Сохранить введенные данные, чтобы продолжить позже?"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {exitType === "x" ? (
              <>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleAlertConfirm}>
                  ОК
                </AlertDialogAction>
              </>
            ) : (
              <>
                <AlertDialogCancel onClick={handleAlertDiscard}>
                  Не сохранять
                </AlertDialogCancel>
                <AlertDialogAction onClick={handleAlertConfirm}>
                  Сохранить
                </AlertDialogAction>
              </>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
