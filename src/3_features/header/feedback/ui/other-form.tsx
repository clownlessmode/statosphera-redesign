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

import { Textarea } from "@shared/ui/textarea";
import useFeedbackController, { FEEDBACK_TYPES } from "../model/api/controller";
import useForm from "../model/hook";
import { FormValues } from "../model/types";

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}
const OtherForm: FC<Props> = ({ setIsOpen }) => {
  const form = useForm();
  const { sendFeedback, isFeedbackLoading } = useFeedbackController();
  const handleSubmit = (data: FormValues) => {
    sendFeedback({ ...data, type: FEEDBACK_TYPES.OTHER });

    setIsOpen(false);
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
                  className="resize-y h-[100px] md:h-[300px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormMessage />
        <DialogFooter>
          <Button
            className="w-full"
            disabled={!form.formState.isValid || isFeedbackLoading}
          >
            Отправить
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default OtherForm;
