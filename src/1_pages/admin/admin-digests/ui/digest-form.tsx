import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import { useAdminDigests } from "@entities/digests";
import { useState } from "react";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
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

type DigestFormData = z.infer<typeof digestSchema>;

interface DigestFormProps {
  onSuccess?: () => void;
}

const DIGEST_TYPES = [
  { label: "Аналитика", value: "analytics" },
  { label: "Совет директоров", value: "director" },
  { label: "Франчайзинг", value: "franchise" },
  { label: "Группа компаний", value: "groupCompany" },
  { label: "Фермеры", value: "farmers" },
];

export const DigestForm = ({ onSuccess }: DigestFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [cover, setCover] = useState<File | null>(null);
  const { createDigest, isCreating } = useAdminDigests();

  const form = useForm<DigestFormData>({
    resolver: zodResolver(digestSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
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
    if (files.length === 0) {
      toast.error("Выберите хотя бы один файл для страниц дайджеста");
      return;
    }

    if (!cover) {
      toast.error("Выберите обложку для дайджеста");
      return;
    }

    try {
      await createDigest({
        title: data.title,
        description: data.description,
        type: data.type,
        files,
        cover,
      });

      form.reset();
      setFiles([]);
      setCover(null);
      onSuccess?.();
    } catch (error) {
      console.error("Ошибка при создании дайджеста:", error);
    }
  };

  const formValues = form.watch();

  return (
    <div className="gap-6 flex-1 min-h-screen grid grid-cols-4  w-full">
      <div className="col-span-1 w-full  sticky top-20 self-start">
        <Card className="flex flex-col gap-4 h-fit w-full">
          <CardHeader>
            <CardTitle>Создание дайджеста</CardTitle>
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

                <Button
                  type="submit"
                  disabled={isCreating || files.length === 0 || !cover}
                  className="w-full"
                >
                  {isCreating ? "Создание..." : "Создать дайджест"}
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
              cover={cover}
              filesCount={files.length}
              files={files}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
