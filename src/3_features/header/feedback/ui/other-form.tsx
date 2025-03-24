import { Button } from "@shared/ui/button";
import { DialogFooter } from "@shared/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { FC } from "react";
import { FormValues } from "../model/other-form/types";
import useForm from "../model/other-form/hook";
import { Textarea } from "@shared/ui/textarea";

const OtherForm: FC = () => {
  const form = useForm();
  const handleSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-2"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          control={form.control}
          name="page"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите проблему"
                  className="resize-y h-[300px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <DialogFooter>
          <Button className="w-full" disabled={!form.formState.isValid}>
            Отправить
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default OtherForm;
