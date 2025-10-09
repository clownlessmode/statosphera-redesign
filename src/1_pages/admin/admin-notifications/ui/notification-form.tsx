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
import { Switch } from "@shared/ui/switch";
import { MultiSelect } from "@shared/ui/multiselect";
import { useUsersService } from "@entities/users";
import { useAlertTypeService } from "@entities/alert-type";
import { ALERT_EMOTIONS } from "@entities/alert-emotions";
import { useAdminNotifications } from "@entities/notifications";
import { MessageEditor } from "@shared/ui/message-editor";
import { useState } from "react";
import { toast } from "sonner";

const notificationSchema = z.object({
  title: z.string().min(1, "Заголовок обязателен"),
  description: z.string().min(1, "Описание обязательно"),
  message: z.string().min(1, "Сообщение обязательно"),
  emotion: z.string().min(1, "Эмоция обязательна"),
  isSmportant: z.boolean(),
  type: z.number().min(1, "Тип уведомления обязателен"),
  users: z.array(z.string()).optional(),
  sendToEveryone: z.boolean(),
});

type NotificationFormData = z.infer<typeof notificationSchema>;

interface NotificationFormProps {
  onSuccess?: () => void;
}

export const NotificationForm = ({ onSuccess }: NotificationFormProps) => {
  const [messageContent, setMessageContent] = useState("");
  const { users, isUsersLoading } = useUsersService();
  const { alertTypes, isAlertTypesLoading } = useAlertTypeService();
  const { createNotification, createNotificationForEveryone, isCreating } =
    useAdminNotifications();

  const form = useForm<NotificationFormData>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      description: "",
      message: "",
      emotion: "positive",
      isSmportant: false,
      type: 1,
      users: [],
      sendToEveryone: false,
    },
  });

  const sendToEveryone = form.watch("sendToEveryone");

  const onSubmit = async (data: NotificationFormData) => {
    try {
      const notificationData = {
        title: data.title,
        description: data.description,
        message: messageContent || data.message,
        emotion: data.emotion,
        isSmportant: data.isSmportant,
        type: data.type,
      };

      if (data.sendToEveryone) {
        await createNotificationForEveryone(notificationData);
        toast.success("Уведомление отправлено всем пользователям");
      } else {
        if (!data.users || data.users.length === 0) {
          toast.error("Выберите хотя бы одного пользователя");
          return;
        }

        // Send to multiple users
        const promises = data.users.map((userId) =>
          createNotification({ ...notificationData, user: parseInt(userId) }),
        );
        await Promise.all(promises);
        toast.success(
          `Уведомление отправлено ${data.users.length} пользователям`,
        );
      }

      form.reset();
      setMessageContent("");
      onSuccess?.();
    } catch (error) {
      toast.error("Ошибка при создании уведомления");
      console.error(error);
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <CardTitle>Создание уведомления</CardTitle>
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
                    <Input placeholder="Введите заголовок" {...field} />
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
                      placeholder="Введите краткое описание"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emotion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Эмоция</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={Object.entries(ALERT_EMOTIONS).map(
                        ([key, value]) => ({
                          label: value,
                          value: key,
                        }),
                      )}
                      value={field.value ? [field.value] : []}
                      onValueChange={(values) =>
                        field.onChange(values?.[0] || "")
                      }
                      placeholder="Выберите эмоцию"
                      singleSelect
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
                  <FormLabel>Тип уведомления</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={
                        alertTypes?.map((alertType) => ({
                          label: alertType.name,
                          value: alertType.id.toString(),
                        })) || []
                      }
                      isLoading={isAlertTypesLoading}
                      value={field.value ? [field.value.toString()] : []}
                      onValueChange={(values) =>
                        field.onChange(parseInt(values?.[0] || "1"))
                      }
                      placeholder="Выберите тип уведомления"
                      singleSelect
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isSmportant"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Важное уведомление</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Отметить как важное уведомление
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sendToEveryone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Отправить всем</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Отправить уведомление всем пользователям
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {!sendToEveryone && (
              <FormField
                control={form.control}
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пользователи</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={
                          users?.map((user) => ({
                            label: user.name,
                            value: user.id.toString(),
                          })) || []
                        }
                        isLoading={isUsersLoading}
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Выберите пользователей"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-2">
              <FormLabel>Сообщение</FormLabel>
              <MessageEditor
                value={messageContent}
                onChange={setMessageContent}
                title={form.watch("title") || "Заголовок уведомления"}
                description={
                  form.watch("description") || "Описание уведомления"
                }
                emotion={form.watch("emotion") || "positive"}
                isImportant={form.watch("isSmportant") || false}
              />
            </div>

            <Button type="submit" disabled={isCreating} className="w-full">
              {isCreating ? "Создание..." : "Создать уведомление"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
