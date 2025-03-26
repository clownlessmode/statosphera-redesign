import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { Header } from "@widgets/header";
import { digestsMock } from "@shared/constants/mock/digests-mock";

import {
  Boxes,
  ChartNetwork,
  GalleryHorizontalEnd,
  ShieldUser,
  Store,
} from "lucide-react";

import { Badge } from "@shared/ui/badge";

import DigestCard from "@entities/digests/ui/digest-card";

const Digests = async () => {
  const digests = digestsMock;
  const analytics = digests.filter((digest) => digest.type === "analytics");
  const director = digests.filter((digest) => digest.type === "director");
  const franchise = digests.filter((digest) => digest.type === "franchise");
  const groupCompany = digests.filter(
    (digest) => digest.type === "groupCompany"
  );

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Tabs defaultValue="all" className="w-full">
        <Header title="Дайджесты" />

        <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-row-reverse">
          <TabsList className="flex flex-col sticky top-4 text-start items-start w-1/5 h-fit">
            <TabsTrigger value="all" className="w-full justify-between">
              <div className="flex flex-row gap-2 items-center">
                <GalleryHorizontalEnd className="size-4 text-muted-foreground" />
                Все
              </div>
              <Badge>{digests.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="w-full justify-between">
              <div className="flex flex-row gap-2 items-center">
                <ChartNetwork className="size-4 text-muted-foreground" />
                Аналитика
              </div>
              <Badge>{analytics.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="director" className="w-full justify-between">
              <div className="flex flex-row gap-2 items-center">
                <ShieldUser className="size-4 text-muted-foreground" /> Совет
                директоров
              </div>
              <Badge>{director.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="franchise" className="w-full justify-between">
              <div className="flex flex-row gap-2 items-center">
                <Store className="size-4 text-muted-foreground" /> Франчайзинг
              </div>
              <Badge>{franchise.length}</Badge>
            </TabsTrigger>
            <TabsTrigger
              value="groupCompany"
              className="w-full justify-between"
            >
              <div className="flex flex-row gap-2 items-center">
                <Boxes className="size-4 text-muted-foreground" /> Группа
                компаний
              </div>
              <Badge>{groupCompany.length}</Badge>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex flex-col gap-2 w-full">
              {digests.map((item) => (
                <DigestCard key={item.id} {...item} type="Аналитика" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="flex flex-col gap-2 w-full">
              {analytics.map((item) => (
                <DigestCard key={item.id} {...item} type="Аналитика" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="director">
            <div className="flex flex-col gap-2 w-full">
              {director.map((item) => (
                <DigestCard key={item.id} {...item} type="Аналитика" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="franchise">
            <div className="flex flex-col gap-2 w-full">
              {franchise.map((item) => (
                <DigestCard key={item.id} {...item} type="Аналитика" />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="groupCompany">
            <div className="flex flex-col gap-2 w-full">
              {groupCompany.map((item) => (
                <DigestCard key={item.id} {...item} type="Аналитика" />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Digests;
