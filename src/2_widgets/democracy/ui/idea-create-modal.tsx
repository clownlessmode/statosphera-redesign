import { useState } from "react";
import { Button } from "@shared/ui/button";
import { Input } from "@shared/ui/input";
import { Textarea } from "@shared/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Plus } from "lucide-react";
import { useDemocracyController } from "@pages/democracy";
import {
  Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { IdeaFormValues } from "../config/schema";
import { useIdeaForm } from "../model/use-form";

export const IdeaCreateModal = () => {
  const form = useIdeaForm();
  const { createIdea, isCreateIdeaLoading } = useDemocracyController();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: IdeaFormValues) => {
    createIdea(
      {
        title: data.title,
        description: data.description,
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
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setIsOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          <span className="max-sm:hidden">Предложить идею</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Предложить идею</DialogTitle>
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
              disabled={isCreateIdeaLoading}
              className="w-full"
            >
              {isCreateIdeaLoading ? "Отправка..." : "Предложить идею"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
