import {
  useCreateTaskGroup,
  useGetUsers,
} from "@pages/projects/api/controller";
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
import { Textarea } from "@shared/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formatUserLastNameInitials } from "../lib/format-user-display-name";

const createTaskGroupSchema = z.object({
  name: z.string().min(1, "Название группы задач обязательно"),
  description: z.string().min(1, "Описание группы задач обязательно"),
  access_users: z
    .array(z.number())
    .min(1, "Выберите хотя бы одного пользователя"),
});

type CreateTaskGroupFormData = z.infer<typeof createTaskGroupSchema>;

export const ModalCreateGroupTask = ({
  project_id,
}: {
  project_id: number;
}) => {
  const [open, setOpen] = useState(false);
  const [optionsRefresh, setOptionsRefresh] = useState(0);

  const { data: users, isLoading } = useGetUsers();
  const { mutate: createTaskGroup, isPending } = useCreateTaskGroup(project_id);

  const form = useForm<CreateTaskGroupFormData>({
    resolver: zodResolver(createTaskGroupSchema),
    defaultValues: {
      name: "",
      description: "",
      access_users: [],
    },
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
    if (!next) {
      form.reset();
    }
  };

  const onSubmit = (data: CreateTaskGroupFormData) => {
    createTaskGroup(
      {
        name: data.name,
        description: data.description,
        access_users: data.access_users,
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PlusIcon className="size-4" />
          Создать группу задач
        </Button>
      </DialogTrigger>
      <DialogContent data-project-id={project_id}>
        <DialogHeader>
          <DialogTitle>Создать группу задач</DialogTitle>
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
                      <FormLabel>Название группы</FormLabel>
                      <FormControl>
                        <Input placeholder="Название группы" {...field} />
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
                      <FormLabel>Описание группы</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Описание группы" {...field} />
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
                          placeholder="Выберите кому доступна группа"
                          options={userOptions}
                          isLoading={isLoading}
                          value={field.value.map(String)}
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
