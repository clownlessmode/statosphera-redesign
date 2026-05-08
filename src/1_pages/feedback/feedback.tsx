import { Header } from "@widgets/header";
import { CardFeedback } from "./ui/card-feedback";
import { useGetFeedbackAll, useGetFeedbackMy } from "./api/controller";
import { Button } from "@shared/ui/button";
import { useState } from "react";
import { useSession } from "@entities/session";

export const Feedback = () => {
  const { session } = useSession();
  const idRole = session?.idRole;
  const isAdmin = idRole === 4;

  const { data: feedbackMy = [] } = useGetFeedbackMy();
  const { data: feedbackAll = [] } = useGetFeedbackAll(isAdmin);

  const [feedbackType, setFeedbackType] = useState<"all" | "my">("my");
  const feedbackList =
    isAdmin && feedbackType === "all" ? feedbackAll : feedbackMy;
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header
        title="Обратная связь"
        actions={{
          center: (
            <div className="flex flex-row gap-2">
              {isAdmin ? (
                <div className="flex flex-row gap-2">
                  <Button
                    size={"sm"}
                    variant={feedbackType === "all" ? "default" : "outline"}
                    onClick={() => setFeedbackType("all")}
                  >
                    Вся ОС
                  </Button>
                  <Button
                    size={"sm"}
                    variant={feedbackType === "my" ? "default" : "outline"}
                    onClick={() => setFeedbackType("my")}
                  >
                    Моя ОС
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          ),
        }}
      />
      <div className="rounded-3xl bg-background p-4 flex flex-col gap-4 flex-1 min-h-0 max-md:gap-2">
        {feedbackList.map((feedback) => (
          <CardFeedback key={feedback.id} feedback={feedback} />
        ))}

        {feedbackList.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1">
            <p className="text-muted-foreground">
              Вы еще не оставляли ОС в Статосфере
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
