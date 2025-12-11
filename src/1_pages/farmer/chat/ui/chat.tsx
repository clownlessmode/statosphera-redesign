import { FC } from "react";
import { Header } from "@widgets/header";
import Spinner from "@shared/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Send, SearchIcon, Paperclip } from "lucide-react";
import { Input } from "@shared/ui/input";
import { cn } from "@shared/lib/utils";

const FarmerChat: FC = () => {
  const isLoading = false;
  if (isLoading) {
    return (
      <div className="bg-muted h-screen w-full p-2 flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-muted h-full w-full p-2 flex flex-col max-w-full gap-2">
      <Header title="Чаты" />
      <div className="rounded-3xl bg-background flex flex-col items-center justify-center p-4 h-[calc(100vh-64px)]">
        <Card className="grid grid-cols-[1fr_400px] grid-rows-[max-content_1fr] gap-0 w-full h-full py-0">
          <CardHeader className="flex flex-row items-center py-4 col-span-1 row-span-1 w-full h-full">
            <CardTitle className="text-xl px-6">
              ИП ГКФХ Кузнецова И.В.
            </CardTitle>
          </CardHeader>
          <CardHeader className="flex flex-row justify-center items-center py-4 col-span-1 row-span-1 w-full h-full">
            <CardTitle className="text-2xl font-semibold [font-variant:small-caps]">
              чаты
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pr-0 pb-4 h-full w-full justify-end col-span-1 row-span-1 min-h-0 min-w-0">
            {/* Сообщения */}
            <div className="flex flex-col gap-2 bg-background rounded-3xl p-4 flex-1 overflow-y-auto scrollbar-hide">
              <div className="flex flex-col max-w-1/2 px-4">
                <div className="relative flex flex-col bg-foreground/10 rounded-3xl p-4 pb-2.5 w-max max-w-full rounded-bl-none!">
                  <p className="text-sm font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quos.
                  </p>
                  <span className="text-xs self-end text-muted-foreground">
                    12:00
                  </span>
                  <ChatTail className="fill-foreground/10" isMine={false} />
                </div>
              </div>
              <div className="flex flex-col max-w-1/2 px-4">
                <div className="relative flex flex-col bg-foreground/10 rounded-3xl p-4 pb-2.5 w-max max-w-full rounded-bl-none!">
                  <p className="text-sm font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quos.
                  </p>
                  <span className="text-xs self-end text-muted-foreground">
                    12:00
                  </span>
                  <ChatTail className="fill-foreground/10" isMine={false} />
                </div>
              </div>
              <div className="flex flex-col max-w-1/2 px-4 ml-auto mr-0">
                <div className="relative flex flex-col bg-accent/80 rounded-3xl p-4 pb-2.5 w-max max-w-full rounded-br-none!">
                  <p className="text-sm font-medium text-accent-foreground">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Quisquam, quos.
                  </p>
                  <span className="text-xs self-end text-secondary/80">
                    12:00
                  </span>
                  <ChatTail className="fill-accent/80" isMine={true} />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                className="size-9 rounded-full! bg-foreground/10"
              >
                <Paperclip className="size-5" />
              </Button>
              <Input
                className="bg-foreground/10 rounded-3xl! px-4"
                placeholder="Сообщение"
              />
              <Button className="size-9 rounded-full!">
                <Send className="size-5 mt-0.5 mr-0.5 text-accent-foreground" />
              </Button>
            </div>
          </CardContent>
          <CardContent className="col-span-1 row-span-1 w-full h-full flex flex-col gap-4 px-2 pb-4 min-h-0">
            <div className="flex flex-row gap-2 w-full h-max relative">
              <Input
                placeholder="Поиск..."
                className="bg-foreground/10 rounded-3xl! w-full h-8 px-9"
              />
              <SearchIcon className="size-4 text-muted-foreground h-full absolute left-3 top-0 py-2 z-10" />
            </div>
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
              {/* Чаты */}
              <div className="grid grid-cols-[45px_1fr] gap-3 bg-foreground/15 rounded-3xl px-5 py-2.5 items-center hover:cursor-pointer">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[45px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-medium">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs">12:00</span>
                  </div>
                  <span className="text-xs line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[45px_1fr] gap-3 rounded-3xl px-5 py-2.5 items-center hover:bg-foreground/5 hover:cursor-pointer">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[45px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-semibold">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[45px_1fr] gap-3 rounded-3xl px-5 py-2.5 items-center hover:bg-foreground/5 hover:cursor-pointer">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[45px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-semibold">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-[45px_1fr] gap-3 rounded-3xl px-5 py-2.5 items-center hover:bg-foreground/5 hover:cursor-pointer">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[45px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-semibold">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerChat;

// Компонент "Хвостик"
const ChatTail = ({
  isMine,
  className,
}: {
  isMine: boolean;
  className: string;
}) => {
  return (
    <svg
      width="11"
      height="20"
      viewBox="0 0 11 20"
      className={cn(
        "absolute bottom-0 w-[11px] h-[20px]",
        className,
        isMine ? "-right-[11px] scale-x-100" : "-left-[11px] -scale-x-100",
      )}
    >
      <path d="M11 20C6 20 0 15 0 0v20h11z" />
    </svg>
  );
};
