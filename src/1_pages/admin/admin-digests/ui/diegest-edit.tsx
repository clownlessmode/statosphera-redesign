import { useDigests } from "@entities/digests/model/api/controller";
import { useState } from "react";
import {
  DigestRequest,
  GetDigestsResponse,
  useAdminDigests,
} from "@entities/digests";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import { Upload, X } from "lucide-react";
import { Button } from "@shared/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@shared/ui/card";
import DigestPreview from "./digest-preview";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shared/ui/select";

const digestSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  type: z.string().min(1, "Тип дайджеста обязателен"),
});

const DIGEST_TYPES = [
  { label: "Аналитика", value: "analytics" },
  { label: "Совет директоров", value: "director" },
  { label: "Франчайзинг", value: "franchise" },
  { label: "Группа компаний", value: "groupCompany" },
  { label: "Фермеры", value: "farmers" },
];

type DigestFormData = z.infer<typeof digestSchema>;

export const DiegestEdit = ({
  digestData,
  onSuccess,
}: {
  digestData: GetDigestsResponse[number];
  onSuccess: () => void;
}) => {
  const { digest, isDigestLoading } = useDigests(digestData.id);
  const [files, setFiles] = useState<File[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const { updateDigest, isUpdating } = useAdminDigests();

  const form = useForm<DigestFormData>({
    resolver: zodResolver(digestSchema),
    defaultValues: {
      title: digestData?.title || "",
      description: digestData?.description || "",
      type: digestData?.type || "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setCover(selectedFile);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: DigestFormData) => {
    const changedData: Partial<DigestRequest> = {};

    if (data.title !== digestData.title) {
      changedData.title = data.title;
    }

    if (data.description !== digestData.description) {
      changedData.description = data.description;
    }

    if (data.type !== digestData.type) {
      changedData.type = data.type;
    }

    // Отправляем файлы только если пользователь выбрал новые
    if (files.length > 0) {
      changedData.files = files;
    }

    // Отправляем обложку только если пользователь выбрал новую
    if (cover) {
      changedData.cover = cover;
    }

    try {
      await updateDigest({
        id: digestData.id,
        data: changedData,
      });

      form.reset();
      setFiles([]);
      setCover(null);
      onSuccess();
    } catch (error) {
      console.error("Ошибка при обновлении дайджеста:", error);
    }
  };

  const formValues = form.watch();

  if (isDigestLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Загрузка дайджеста...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="gap-6 flex-1 min-h-screen grid grid-cols-4  w-full">
      <div className="col-span-1 w-full  sticky top-20 self-start">
        <Card className="flex flex-col gap-4 h-fit w-full">
          <CardHeader>
            <CardTitle>Редактирование дайджеста</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 w-full"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Заголовок</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Введите заголовок дайджеста"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Описание</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Введите описание дайджеста"
                          {...field}
                          className="!bg-background"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Тип дайджеста</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full !bg-background">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            {DIGEST_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Обложка</FormLabel>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                      id="cover-upload"
                    />
                    <label
                      htmlFor="cover-upload"
                      className="flex items-center  w-full gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-background"
                    >
                      <Upload className="h-4 w-4" />
                      Выбрать обложку
                    </label>
                    {cover && (
                      <span className="text-sm text-muted-foreground">
                        {cover.name}
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <FormLabel>Страницы дайджеста</FormLabel>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="files-upload"
                    />
                    <label
                      htmlFor="files-upload"
                      className="flex items-center  w-full gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-background"
                    >
                      <Upload className="h-4 w-4" />
                      Выбрать страницы
                    </label>
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Выбрано файлов: {files.length}
                      </p>
                      <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between px-2 py-1 bg-muted rounded text-xs"
                          >
                            <span className="truncate flex-1">{file.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-4 w-4 p-0"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isUpdating} className="w-full">
                  {isUpdating ? "Обновление..." : "Обновить дайджест"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Предпросмотр */}
      <div className="col-span-3">
        <Card className="flex flex-col gap-4 min-h-0 h-full">
          <CardHeader>
            <CardTitle>Предпросмотр</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0">
            <DigestPreview
              title={formValues.title}
              description={formValues.description}
              type={formValues.type}
              cover={cover ?? digestData.cover}
              filesCount={files.length || digest?.pages?.length || 0}
              files={files.length > 0 ? files : digest?.pages || []}
              date={digestData.create_add}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
