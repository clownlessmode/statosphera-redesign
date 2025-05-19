import { useIsMobile } from "@shared/hooks/use-mobile";
import { Button } from "@shared/ui/button";
import { CardContent } from "@shared/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@shared/ui/dialog";
import { Progress } from "@shared/ui/progress";
import { ArrowLeft, ArrowRight, Heart, MessageCircle } from "lucide-react";
import { FC, useState } from "react";
import { useForm } from "../model";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { FormValues } from "../config";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { Textarea } from "@shared/ui/textarea";
import confetti from "canvas-confetti";
import { useFeedbackController } from "../api";
interface Props {
  id: string;
  description: string;
}
const Feedback: FC<Props> = ({ description, id }) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(true);
  const form = useForm();
  const [activeTab, setActiveTab] = useState<
    "personal" | "impressions" | "content" | "suggestions"
  >("personal");

  const formValues = form.watch();

  // Функция для расчета прогресса с учетом текущего шага
  const calculateProgress = () => {
    // Все поля формы
    const allFields = [
      "company",
      "department",
      "fullName",
      "liked",
      "questions",
      "commentsUseful",
      "contentClarity",
      "designFeedback",
      "futureContent",
      "otherSuggestions",
    ];

    let filledFields = 0;

    allFields.forEach((field) => {
      const fieldValue = formValues[field as keyof FormValues];
      if (fieldValue && fieldValue.toString().trim() !== "") {
        filledFields++;
      }
    });

    return Math.round((filledFields / allFields.length) * 100);
  };
  const progressValue = calculateProgress();

  // Проверки заполненности для каждого шага
  const isPersonalFilled =
    !!formValues.company?.trim() &&
    !!formValues.department?.trim() &&
    !!formValues.fullName?.trim();

  const isImpressionsFilled =
    !!formValues.liked?.trim() && !!formValues.questions?.trim();

  const isContentFilled =
    !!formValues.commentsUseful?.trim() && !!formValues.contentClarity?.trim();
  const { sendFeedback } = useFeedbackController();
  const handleSubmit = async (data: FormValues) => {
    console.log("Отправка формы:", data);
    const end = Date.now() + 1.5 * 1000;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();
    form.reset();
    setActiveTab("personal");
    setIsOpen(false);
    sendFeedback({ data, id });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen>
      <DialogTrigger asChild>
        <Button>
          <MessageCircle />
          Оставить отзыв {!isMobile && "по дайджесту"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Оставить отзыв на {description}
          </DialogTitle>
        </DialogHeader>
        <Progress value={progressValue as number} className="h-2" />

        <CardContent className="p-0 mt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {/* Шаг 1: Персональные данные */}
              {activeTab === "personal" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Предприятие</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Выберите ваше предприятие" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Предприятия</SelectLabel>
                                <SelectItem value="KUB">
                                  Кузбасский Бройлер
                                </SelectItem>
                                <SelectItem value="KM">
                                  Калина Малина
                                </SelectItem>
                                <SelectItem value="ZMPZ">
                                  Зариниский мясоперерабатывающий завод
                                </SelectItem>
                                <SelectItem value="VOLKOVKEM">
                                  Волков Кемерово
                                </SelectItem>
                                <SelectItem value="VOLKOVKSK">
                                  Волков Красноярск
                                </SelectItem>
                                <SelectItem value="OTHER">
                                  Моего предприятия нет в списке
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Подразделение/отдел</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Введите название подразделения/отдела"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ФИО</FormLabel>
                        <FormControl>
                          <Input placeholder="Введите ваше ФИО" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      className="w-full"
                      disabled={!isPersonalFilled}
                      onClick={() => setActiveTab("impressions")}
                    >
                      Далее <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Шаг 2: Впечатления */}
              {activeTab === "impressions" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="liked"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Что вам особенно понравилось в дайджесте?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Расскажите о том, что вам понравилось"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="questions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Были ли моменты, которые вызвали у вас вопросы или не
                          понравились?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Опишите моменты, которые вызвали вопросы или не понравились"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("personal")}
                    >
                      <ArrowLeft className="mr-2" /> Назад
                    </Button>
                    <Button
                      type="button"
                      className="w-full"
                      disabled={!isImpressionsFilled}
                      onClick={() => setActiveTab("content")}
                    >
                      Далее <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Шаг 3: Контент */}
              {activeTab === "content" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="commentsUseful"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Как вам комментарии к разделам? Были ли они полезными?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Расскажите, понравились ли вам комментарии к разделам"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contentClarity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Достаточно ли понятно и информативно изложен материал?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Оцените понятность изложения материала"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("impressions")}
                    >
                      <ArrowLeft className="mr-2" /> Назад
                    </Button>
                    <Button
                      type="button"
                      className="w-full"
                      disabled={!isContentFilled}
                      onClick={() => setActiveTab("suggestions")}
                    >
                      Далее <ArrowRight className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Шаг 4: Предложения */}
              {activeTab === "suggestions" && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="designFeedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ваши пожелания по оформлению</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Что понравилось, а что можно улучшить?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="futureContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Какую информацию стоит добавить в следующих выпусках?
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Предложите темы для будущих выпусков"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="otherSuggestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Другие замечания или предложения</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Поделитесь любыми другими замечаниями"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-4 relative">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => setActiveTab("content")}
                    >
                      <ArrowLeft className="mr-2" /> Назад
                    </Button>
                    <Button type="submit" className="w-full">
                      Отправить отзыв <Heart className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </DialogContent>
    </Dialog>
  );
};

export default Feedback;
