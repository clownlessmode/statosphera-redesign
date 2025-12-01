import { FC } from "react";
import { Header } from "@widgets/header";
import Spinner from "@shared/ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/card";
import { Button } from "@shared/ui/button";
import { Send, SearchIcon } from "lucide-react";
import { Input } from "@shared/ui/input";

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
            <CardTitle className="flex flex-row gap-2 items-center px-4">
              <Card
                style={{
                  backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                }}
                className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[50px] rounded-full"
              />
              ИП ГКФХ Кузнецова И.В.
            </CardTitle>
          </CardHeader>
          <CardHeader className="flex flex-row justify-center items-center py-4 col-span-1 row-span-1 w-full h-full">
            <CardTitle>
              <h1 className="text-xl w-full text-center">Ваши чаты</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4 h-full w-full bg-background justify-end col-span-1 row-span-1">
            <div className="flex flex-row gap-2">
              <Input />
              <Button>
                <Send />
              </Button>
            </div>
          </CardContent>
          <CardContent className="col-span-1 row-span-1 w-full h-full flex flex-col gap-4 px-2">
            <div className="flex flex-row gap-2 w-full h-max relative">
              <Input
                placeholder="Поиск..."
                className="bg-foreground/10 w-full h-8 px-8"
              />
              <SearchIcon className="size-4 text-muted-foreground h-full absolute left-2 top-0 py-2 z-10" />
            </div>
            <ul>
              <li className="grid grid-cols-[50px_1fr] gap-3 hover:bg-accent/20 rounded-xl p-2">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[50px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-medium">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </li>
              <li className="grid grid-cols-[50px_1fr] gap-3 hover:bg-accent/20 rounded-xl p-2">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[50px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-medium">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </li>
              <li className="grid grid-cols-[50px_1fr] gap-3 hover:bg-accent/20 rounded-xl p-2">
                <Card
                  style={{
                    backgroundImage: `url(https://826d0f1c-f5de-47aa-b1a1-a0190a1d5c7c.selstorage.ru/farmer/photo/2803/photo_photo_2025-11-18_08-46-08.jpg.webp)`,
                  }}
                  className="aspect-square bg-background bg-no-repeat bg-center bg-cover shrink-0 size-[50px] rounded-full"
                />
                <div className="flex flex-col gap-1 py-1">
                  <div className="flex flex-row gap-2 justify-between">
                    <span className="text-sm font-medium">
                      ИП ГКФХ Кузнецова И.В.
                    </span>
                    <span className="text-xs text-muted-foreground">12:00</span>
                  </div>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quisquam, quos.
                  </span>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerChat;
