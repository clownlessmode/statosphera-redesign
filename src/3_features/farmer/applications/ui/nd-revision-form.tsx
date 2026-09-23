import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { useCompleteNdRevision } from "@entities/farmer";
import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@shared/ui/form";
import { Textarea } from "@shared/ui/textarea";
import { NdRevisionFormValues, useNdRevisionForm } from "../model/hook";

export const NdRevisionForm = ({ itemId }: { itemId: string }) => {
  const form = useNdRevisionForm();
  const [open, setOpen] = useState(false);
  const { mutate: completeNdRevision, isPending } =
    useCompleteNdRevision(itemId);

  const onSubmit = (data: NdRevisionFormValues) => {
    completeNdRevision(data, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <>
      <Card className="p-5 gap-4 border-primary/25 bg-primary/[0.03]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Badge className="size-max p-2 max-md:hidden">
              <ClipboardCheck className="size-6!" />
            </Badge>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                Требуется доработка НД
              </span>
              <span className="text-sm text-muted-foreground">
                Опишите, что доработаете и к какому сроку, либо укажите причину
                отказа.
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              form.reset();
              setOpen(true);
            }}
          >
            Завершить доработку
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Требуется доработка НД</DialogTitle>
            <DialogDescription>
              Опишите план доработки или причину отказа.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="readiness"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>План доработки или причина отказа</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={field.value ?? ""}
                        onChange={field.onChange}
                        placeholder="Укажите, какие замечания исправите и к какой дате, или причину отказа"
                        className="max-h-40"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit" loading={isPending}>
                  Отправить
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
