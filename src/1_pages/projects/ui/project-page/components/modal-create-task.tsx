import { useCreateTask, useGetUsers } from "@pages/projects/api/controller";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
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
import { Input } from "@shared/ui/input";
import { MultiSelect } from "@shared/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Textarea } from "@shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatUserLastNameInitials } from "../lib/format-user-display-name";
import { DatePicker } from "@shared/ui/date-picker";

const createTaskSchema = z.object({
  name: z.string().min(1, "Название задачи обязательно"),
  description: z.string().min(1, "Описание задачи обязательно"),
  status: z.string().min(1, "Выберите статус"),
  due_date: z.date({ message: "Выберите дату выполнения" }),
  assignees: z.array(z.number()).min(1, "Выберите хотя бы одного исполнителя"),
  access_users: z
    .array(z.number())
    .min(1, "Выберите хотя бы одного пользователя с доступом"),
});

type CreateTaskFormData = z.infer<typeof createTaskSchema>;

function getDefaultTaskFormValues(): CreateTaskFormData {
  return {
    name: "",
    description: "",
    status: "Ожидает",
    assignees: [],
    access_users: [],
    due_date: new Date(),
  };
}

export const ModalCreateTask = ({
  project_id,
  group_id,
}: {
  project_id: number;
  group_id: number;
}) => {
  const [open, setOpen] = useState(false);
  const [optionsRefresh, setOptionsRefresh] = useState(0);

  const { data: users, isLoading: isUsersLoading } = useGetUsers();
  const { mutate: createTask, isPending } = useCreateTask(project_id, group_id);

  const form = useForm<CreateTaskFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: getDefaultTaskFormValues(),
  });

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users, optionsRefresh],
  );

  const handleDialogOpenChange = (next: boolean) => {
    setOpen(next);
    form.reset(getDefaultTaskFormValues());
  };

  const bumpOptionsOnOpen = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOptionsRefresh((n) => n + 1);
      });
    });
  };

  const onSubmit = (data: CreateTaskFormData) => {
    createTask(
      {
        name: data.name,
        description: data.description,
        access_users: data.access_users,
        assignees: data.assignees,
        status: data.status,
        due_date: data.due_date.toISOString(),
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset(getDefaultTaskFormValues());
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusIcon className="size-4" />
          Создать задачу
        </Button>
      </DialogTrigger>
      <DialogContent data-project-id={project_id} data-group-id={group_id}>
        <DialogHeader>
          <DialogTitle>Создать задачу</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-0"
          >
            <DialogBody>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Название задачи</FormLabel>
                      <FormControl>
                        <Input placeholder="Название задачи" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Описание задачи" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Статус</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-background">
                            <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Ожидает">Ожидает</SelectItem>
                          <SelectItem value="В процессе">В работе</SelectItem>
                          <SelectItem value="Выполнено">Выполнено</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assignees"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Исполнители</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Выберите исполнителей"
                          options={userOptions}
                          isLoading={isUsersLoading}
                          value={field.value.map(String)}
                          onValueChange={(values) => {
                            field.onChange(values.map(Number));
                          }}
                          onOpenChange={(popoverOpen) => {
                            if (popoverOpen) bumpOptionsOnOpen();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="due_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Дата выполнения</FormLabel>
                      <FormControl>
                        <DatePicker
                          className="w-[250px]"
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите дату выполнения"
                        />
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
                      <FormLabel>Доступ к задаче</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Выберите кому доступна задача"
                          options={userOptions}
                          isLoading={isUsersLoading}
                          value={field.value.map(String)}
                          onValueChange={(values) => {
                            field.onChange(values.map(Number));
                          }}
                          onOpenChange={(popoverOpen) => {
                            if (popoverOpen) bumpOptionsOnOpen();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </DialogBody>
            <DialogFooter className="gap-2 mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDialogOpenChange(false)}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Создание…" : "Создать"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
