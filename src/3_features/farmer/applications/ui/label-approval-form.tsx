import { useState } from "react";
import { PackageCheck } from "lucide-react";
import { format } from "date-fns";
import { useWatch } from "react-hook-form";
import { useCompleteFarmerLabelApproval } from "@entities/farmer";
import { Badge } from "@shared/ui/badge";
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
import { LabelApprovalFormValues, useLabelApprovalForm } from "../model/hook";

export const LabelApprovalForm = ({ itemId }: { itemId: string }) => {
  const form = useLabelApprovalForm();
  const decision = useWatch({ control: form.control, name: "decision" });
  const [open, setOpen] = useState(false);
  const { mutate: completeLabelApproval, isPending } =
    useCompleteFarmerLabelApproval(itemId);

  const onSubmit = (data: LabelApprovalFormValues) => {
    completeLabelApproval(
      data.decision === "approved"
        ? {
            ...data,
            deliveryDate: format(data.deliveryDate, "yyyy-MM-dd"),
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
              <PackageCheck className="size-6!" />
            </Badge>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground">
                Согласуйте макет этикетки
              </span>
              <span className="text-sm text-muted-foreground">
                Проверьте готовый макет и согласуйте дату поставки либо
                отправьте его на доработку.
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              form.reset();
              setOpen(true);
            }}
          >
            Рассмотреть макет
          </Button>
        </div>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Согласуйте макет этикетки</DialogTitle>
            <DialogDescription>
              Проверьте готовый макет и согласуйте дату поставки либо отправьте
              его на доработку.
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
                            label: "Согласовать макет",
                            value: "approved",
                          },
                          {
                            label: "Отправить на доработку",
                            value: "rejected",
                          },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {decision === "approved" && (
                <FormField
                  control={form.control}
                  name="deliveryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Согласованная дата поставки</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Выберите дату поставки"
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
