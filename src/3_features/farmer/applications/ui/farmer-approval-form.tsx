import { useState } from "react";
import { ClipboardCheck } from "lucide-react";
import { useCompleteFarmerApproval } from "@entities/farmer";
import BooleanCheckboxCard from "@shared/ui/boolean-checkbox-cards";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { DatePicker } from "@shared/ui/date-picker";
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
import { FarmerApprovalFormValues, useFarmerApprovalForm } from "../model/hook";
import { Badge } from "@shared/ui/badge";
import { useWatch } from "react-hook-form";
import { format } from "date-fns";

export const FarmerApprovalForm = ({ itemId }: { itemId: string }) => {
  const form = useFarmerApprovalForm();
  const decision = useWatch({ control: form.control, name: "decision" });
  const [open, setOpen] = useState(false);
  const { mutate: completeFarmerApproval, isPending } =
    useCompleteFarmerApproval(itemId);

  const onSubmit = (data: FarmerApprovalFormValues) => {
    completeFarmerApproval(
      data.decision === "accepted"
        ? {
            ...data,
            sampleReadyDate: format(data.sampleReadyDate, "yyyy-MM-dd"),
          }
        : data,
      { onSuccess: () => setOpen(false) },
    );
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
                Заявка ожидает вашего решения
              </span>
              <span className="text-sm text-muted-foreground">
                Подтвердите участие и укажите дату готовности образца либо
                отклоните заявку.
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              form.reset();
              setOpen(true);
            }}
          >
            Рассмотреть заявку
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Заявка ожидает вашего решения</DialogTitle>
            <DialogDescription>
              Подтвердите участие и укажите дату готовности образца либо
              отклоните заявку.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="decision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Решение</FormLabel>
                    <FormControl>
                      <BooleanCheckboxCard
                        options={[
                          {
                            label: "Беру в разработку",
                            value: "accepted",
                          },
                          {
                            label: "Отказываюсь от разработки",
                            value: "rejected",
                          },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        className="grid-cols-1 sm:grid-cols-2"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {decision === "accepted" && (
                <FormField
                  control={form.control}
                  name="sampleReadyDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Дата готовности образца</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите предполагаемую дату"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

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
