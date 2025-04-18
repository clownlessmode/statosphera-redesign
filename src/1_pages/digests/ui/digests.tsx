"use client";
import { useSearchParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { Header } from "@widgets/header";

import {
  Boxes,
  ChartNetwork,
  GalleryHorizontalEnd,
  ShieldUser,
  Store,
} from "lucide-react";

import { Badge } from "@shared/ui/badge";

import DigestCard from "@entities/digests/ui/digest-card";
import { useDigests } from "@entities/digests/model/api/controller";
import { Skeleton } from "@shared/ui/skeleton";
import { useMemo } from "react";

const Digests = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentType = searchParams.get("type") || "all";

  const updateURL = (value: string) => {
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ type: value });
    }
  };

  const { digests, isDigestsLoading } = useDigests();

  const filteredDigests = useMemo(() => {
    return {
      analytics: digests?.filter((digest) => digest.type === "analytics"),
      director: digests?.filter((digest) => digest.type === "director"),
      franchise: digests?.filter((digest) => digest.type === "franchise"),
      groupCompany: digests?.filter((digest) => digest.type === "groupCompany"),
    };
  }, [digests, currentType]);

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Tabs
        defaultValue={currentType}
        className="w-full"
        onValueChange={updateURL}
      >
        <Header title="Дайджесты" />
        <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-col lg:flex-row-reverse">
          <TabsList className="flex flex-col static lg:sticky top-4 text-start items-start h-fit w-full lg:w-fit">
            <TabsTrigger value="all" className="w-full justify-between gap-4">
              <div className="flex flex-row gap-2 items-center">
                <GalleryHorizontalEnd className="size-4 text-muted-foreground" />
                Все
              </div>
              {isDigestsLoading ? (
                <Skeleton className="w-5 h-4" />
              ) : (
                <Badge>{digests?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="w-full justify-between gap-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <ChartNetwork className="size-4 text-muted-foreground" />
                Аналитика
              </div>
              {isDigestsLoading ? (
                <Skeleton className="w-5 h-4" />
              ) : (
                <Badge>{filteredDigests.analytics?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="director"
              className="w-full justify-between gap-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <ShieldUser className="size-4 text-muted-foreground" /> Совет
                директоров
              </div>
              {isDigestsLoading ? (
                <Skeleton className="w-5 h-4" />
              ) : (
                <Badge>{filteredDigests.director?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="franchise"
              className="w-full justify-between gap-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <Store className="size-4 text-muted-foreground" /> Франчайзинг
              </div>
              {isDigestsLoading ? (
                <Skeleton className="w-5 h-4" />
              ) : (
                <Badge>{filteredDigests.franchise?.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="groupCompany"
              className="w-full justify-between gap-4"
            >
              <div className="flex flex-row gap-2 items-center">
                <Boxes className="size-4 text-muted-foreground" /> Группа
                компаний
              </div>
              {isDigestsLoading ? (
                <Skeleton className="w-5 h-4" />
              ) : (
                <Badge>{filteredDigests.groupCompany?.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="flex flex-col gap-2 w-full">
              {digests?.map((item) => (
                <DigestCard
                  description={item.description}
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  cover={item.cover}
                  title={item.title}
                  create_add={item.create_add}
                  type="Аналитика"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <div className="flex flex-col gap-2 w-full">
              {filteredDigests.analytics?.map((item) => (
                <DigestCard
                  description={item.description}
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  cover={item.cover}
                  title={item.title}
                  create_add={item.create_add}
                  type="Аналитика"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="director">
            <div className="flex flex-col gap-2 w-full">
              {filteredDigests.director?.map((item) => (
                <DigestCard
                  description={item.description}
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  cover={item.cover}
                  title={item.title}
                  create_add={item.create_add}
                  type="Аналитика"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="franchise">
            <div className="flex flex-col gap-2 w-full">
              {filteredDigests.franchise?.map((item) => (
                <DigestCard
                  description={item.description}
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  cover={item.cover}
                  title={item.title}
                  create_add={item.create_add}
                  type="Аналитика"
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="groupCompany">
            <div className="flex flex-col gap-2 w-full">
              {filteredDigests.groupCompany?.map((item) => (
                <DigestCard
                  description={item.description}
                  key={item.id}
                  id={item.id}
                  count={item.count}
                  cover={item.cover}
                  title={item.title}
                  create_add={item.create_add}
                  type="Аналитика"
                />
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Digests;
