import { useEffect } from "react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import { useDemocracyController, Idea } from "@pages/democracy";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@shared/ui/form";
import { IdeaFormValues } from "../config/schema";
import { useIdeaForm } from "../model/use-form";

export const IdeaEditModal = ({
  idea,
  isOpen,
  onOpenChange,
}: {
  idea: Idea;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const form = useIdeaForm();
  const { updateIdea, isUpdateIdeaLoading } = useDemocracyController();

  useEffect(() => {
    if (!idea) return;

    form.reset({
      title: idea.title,
      description: idea.description,
    });
  }, [idea]);

  const onSubmit = async (data: IdeaFormValues) => {
    updateIdea(
      {
        ideaId: idea.id,
        dto: {
          title: data.title,
          description: data.description,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        onOpenChange(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать идею</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Заголовок</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Кратко опишите идею" />
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
                      {...field}
                      placeholder="Подробно опишите идею. Что именно вы хотите изменить или добавить? Как это поможет другим?"
                      rows={4}
                      className="max-h-40"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isUpdateIdeaLoading}
              className="w-full"
            >
              {isUpdateIdeaLoading ? "Сохранение..." : "Сохранить"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
