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

import { ROUTES } from "@app/router/routes";
import {
  ButtonGroup,
  ButtonGroupItem,
  RadioGroup,
} from "@shared/ui/radio-group";
import { Angry, Annoyed, Frown, Meh, ServerCrash } from "lucide-react";
import { Textarea } from "@shared/ui/textarea";
import useForm from "../model/hook";
import { FormValues } from "../model/types";
import useFeedbackController, { FEEDBACK_TYPES } from "../model/api/controller";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";

const importance = [
  {
    text: "Минимальная",
    icon: <Meh />,
    value: "Минимальная",
  },
  {
    text: "Низкая",
    icon: <Annoyed />,
    value: "Низкая",
  },
  {
    text: "Средняя",
    icon: <Frown />,
    value: "Средняя",
  },
  {
    text: "Высокая",
    icon: <Angry />,
    value: "Высокая",
  },
  {
    text: "Критическая",
    icon: <ServerCrash />,
    value: "Критическая",
  },
];
interface Props {
  setIsOpen: (isOpen: boolean) => void;
}
const ErrorForm: FC<Props> = ({ setIsOpen }) => {
  const form = useForm();
  const { sendFeedback, isFeedbackLoading } = useFeedbackController();
  const handleSubmit = (data: FormValues) => {
    sendFeedback({ ...data, type: FEEDBACK_TYPES.ERROR });

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
              <FormLabel>Раздел</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите раздел" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROUTES.map((route) => (
                      <SelectItem
                        key={route.path}
                        value={route.label as string}
                      >
                        {route.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rank"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Важность ошибки</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                  className="flex flex-row justify-between w-full"
                >
                  <FormItem className="flex items-center justufy-center flex-col text-center w-full">
                    <FormControl className="w-full">
                      <ButtonGroup
                        value={field.value ?? "neutral"} // контролируемое значение
                        onValueChange={field.onChange} // обновляем RHF
                        className="flex flex-row max-md:flex-wrap justify-center md:justify-between w-full"
                      >
                        {importance.map((item) => (
                          <ButtonGroupItem
                            key={item.value}
                            value={item.value} // гарантированно непустая строка
                            icon={item.icon}
                            label={item.text}
                            className="text-[8px] p-2 w-full max-w-[85px] min-w-[80px]"
                          />
                        ))}
                      </ButtonGroup>
                    </FormControl>
                  </FormItem>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="textMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Опишите проблему"
                  className="resize-y"
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

export default ErrorForm;
