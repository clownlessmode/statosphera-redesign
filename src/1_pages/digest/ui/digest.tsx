import { Header } from "@widgets/header";
import { useNavigate, useParams } from "react-router";
import { Button } from "@shared/ui/button";
import { ChevronLeft, Minus, Plus } from "lucide-react";
import { ScrollToTop } from "@features/scroll-to-top";
import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";

import { useDigests } from "@entities/digests/model/api/controller";
import { Feedback } from "@features/digests/feedback";

const Digest = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  const { digest } = useDigests(id);

  const [width, setWidth] = useState<number>(() => {
    const savedWidth = localStorage.getItem("digestImageWidth");
    return savedWidth ? Number(savedWidth) : 100;
  });

  const increaseWidth = () => {
    setWidth((prev) => {
      const newWidth = Math.min(prev + 10, 100);
      localStorage.setItem("digestImageWidth", newWidth.toString());
      return newWidth;
    });
  };

  const decreaseWidth = () => {
    setWidth((prev) => {
      const newWidth = Math.max(prev - 10, 10);
      localStorage.setItem("digestImageWidth", newWidth.toString());
      return newWidth;
    });
  };

  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title={`Дайджест ${digest?.name_daydjest}`} />
      <div className="relative rounded-3xl bg-background px-4 pt-4 gap-4 h-fit flex flex-col min-h-screen">
        <div className="mx-2 p-5 backdrop-blur-2xl rounded-xl w-fit  border-border/5 border sticky top-4 bg-background/40">
          <Button className="w-fit" onClick={() => navigate(-1)}>
            <ChevronLeft />
            Вернуться назад
          </Button>
        </div>
        {digest && (
          <div className="flex flex-col gap-1 items-center">
            {digest.pages.map((item, index) => (
              <motion.img
                key={item}
                src={item}
                alt=""
                loading={index < 5 ? "eager" : "lazy"} // Первые 5 картинок загружаются приоритетно
                animate={{ width: `${width}%` }}
                transition={{
                  duration: index < 5 ? 0.1 : 0.5, // Более быстрая анимация для первых 5
                  ease: "easeInOut",
                  delay: index < 5 ? 0 : (index - 4) * 0.05, // Без задержки для первых 5, последовательная задержка для остальных
                }}
              />
            ))}
          </div>
        )}
        <AnimatePresence>
          <div className="left-0 sticky z-10 bottom-4 w-full justify-center flex items-center px-2">
            <div className="flex flex-row gap-4 justify-between w-full">
              <div className="flex gap-2  p-5 backdrop-blur-2xl rounded-xl border-border/5 border bg-background/40">
                <Button size="icon" onClick={increaseWidth}>
                  <Plus />
                </Button>
                <Button size="icon" onClick={decreaseWidth}>
                  <Minus />
                </Button>
                <ScrollToTop />
              </div>
              <div className="p-5 backdrop-blur-2xl rounded-xl border-border/5 border bg-background/40">
                {id && (
                  <Feedback
                    id={id}
                    description={`Дайджест ${digest?.name_daydjest || id}`}
                  />
                )}
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Digest;
