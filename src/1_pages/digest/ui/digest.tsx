"use client";

import { Header } from "@widgets/header";
import { useNavigate, useParams } from "react-router";
import { digestsMock } from "@shared/constants/mock/digests-mock";
import { Button } from "@shared/ui/button";
import { ChevronLeft, MessageCircle, Minus, Plus } from "lucide-react";
import { ScrollToTop } from "@features/scroll-to-top";
import { AnimatePresence, motion } from "framer-motion";

import { useState } from "react";
import {
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@shared/ui/dialog";
import { Dialog } from "@shared/ui/dialog";
import { useIsMobile } from "@shared/hooks/use-mobile";

const Digest = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string | undefined }>();
  const MOCK_DIGEST = id
    ? digestsMock.find((digest) => digest.id.toString() === id)
    : undefined;

  const [width, setWidth] = useState<number>(() => {
    // Пытаемся получить сохраненное значение при инициализации
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
  const isMobile = useIsMobile();
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title={`Дайджест ${!isMobile ? MOCK_DIGEST?.title : ""}`} />
      <div className="relative rounded-3xl bg-background px-4 pt-4 gap-4 h-fit flex flex-col min-h-screen">
        <div className="p-2 backdrop-blur-2xl rounded-md w-fit  border-border/5 border  sticky top-4">
          <Button className="w-fit" onClick={() => navigate(-1)}>
            <ChevronLeft />
            Вернуться назад
          </Button>
        </div>
        {MOCK_DIGEST && (
          <div className="flex flex-col gap-1 items-center">
            {MOCK_DIGEST.pach_cdn.map((item, index) => (
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
              <div className="flex gap-2  p-2 backdrop-blur-sm rounded-md border-border/5 border">
                <Button size="icon" onClick={increaseWidth}>
                  <Plus />
                </Button>
                <Button size="icon" onClick={decreaseWidth}>
                  <Minus />
                </Button>
                <ScrollToTop />
              </div>
              <div className="p-2 backdrop-blur-2xl rounded-md  border-border/5 border">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageCircle />
                      Оставить отзыв {!isMobile && "по дайджесту"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Оставить отзыв</DialogTitle>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Digest;
