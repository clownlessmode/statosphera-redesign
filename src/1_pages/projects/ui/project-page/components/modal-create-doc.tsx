import { useCreateDocument, useGetUsers } from "@pages/projects/api/controller";
import { InputUploadFile } from "@pages/projects/ui/input-upload-file";
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
import { toast } from "sonner";
import { formatUserLastNameInitials } from "../lib/format-user-display-name";

const createDocSchema = z.object({
  name: z.string().min(1, "Название документа обязательно"),
  description: z.string().min(1, "Описание обязательно"),
  access_users: z.array(z.number()).optional(),
});

type CreateDocFormData = z.infer<typeof createDocSchema>;

function getDefaultDocFormValues(): CreateDocFormData {
  return {
    name: "",
    description: "",
    access_users: [],
  };
}

export const ModalCreateDoc = ({
  project_id,
  group_id,
}: {
  project_id: number;
  group_id: number;
}) => {
  const [open, setOpen] = useState(false);
  const [optionsRefresh, setOptionsRefresh] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const { data: users, isLoading } = useGetUsers();
  const { mutate: createDocument, isPending } = useCreateDocument(
    project_id,
    group_id,
  );

  const form = useForm<CreateDocFormData>({
    resolver: zodResolver(createDocSchema),
    defaultValues: getDefaultDocFormValues(),
  });

  const userOptions = useMemo(
    () =>
      users?.map((user) => ({
        label: formatUserLastNameInitials(user),
        value: String(user.id_user),
      })) ?? [],
    [users, optionsRefresh],
  );

  const resetAll = () => {
    form.reset(getDefaultDocFormValues());
    setFile(null);
    setFileInputKey((k) => k + 1);
  };

  const handleDialogOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      resetAll();
    }
  };

  const bumpOptionsOnOpen = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setOptionsRefresh((n) => n + 1);
      });
    });
  };

  const onSubmit = (data: CreateDocFormData) => {
    if (!file) {
      toast.error("Выберите файл");
      return;
    }
    createDocument(
      {
        name: data.name,
        description: data.description,
        access_users: data.access_users ?? [],
        file,
      },
      {
        onSuccess: () => {
          setOpen(false);
          resetAll();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <PlusIcon className="size-4" />
          Добавить документ
        </Button>
      </DialogTrigger>
      <DialogContent
        data-project-id={project_id}
        data-group-id={group_id}
        className="max-w-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Загрузить документ</DialogTitle>
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
                      <FormLabel>Название</FormLabel>
                      <FormControl>
                        <Input placeholder="Название документа" {...field} />
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
                        <Textarea placeholder="Краткое описание" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium leading-none">Файл</span>
                  <InputUploadFile
                    key={fileInputKey}
                    accept="*/*"
                    primaryText="Перетащите файл сюда или нажмите"
                    secondaryText="Один файл для загрузки"
                    onFileChange={(f) => setFile(f)}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="access_users"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Доступ</FormLabel>
                      <FormControl>
                        <MultiSelect
                          placeholder="Кому доступен документ"
                          options={userOptions}
                          isLoading={isLoading}
                          value={field.value?.map(String) ?? []}
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
                {isPending ? "Загрузка…" : "Загрузить"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
