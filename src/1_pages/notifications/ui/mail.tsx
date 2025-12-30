"use client";

import { Search, XIcon } from "lucide-react";

import { Input } from "@shared/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@shared/ui/resizable";
import { Separator } from "@shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { TooltipProvider } from "@shared/ui/tooltip";

import useMail from "../use-mail";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";

import { useIsMobile } from "@shared/hooks/use-mobile";
import { Notification } from "@entities/notifications/model/api/types";

interface MailProps {
  mails: Notification[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mails({ mails, defaultLayout = [20, 40, 60] }: MailProps) {
  const { selected, setSelected } = useMail();
  const isMobile = useIsMobile();
  return (
    <TooltipProvider delayDuration={0}>
      {!isMobile ? (
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
              sizes,
            )}`;
          }}
          className="h-full max-h-[calc(100vh-64px)] items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[1]}
            className="min-w-[280px]"
            minSize={isMobile ? 20 : 20}
          >
            <Tabs defaultValue="all">
              <div className="flex items-center px-4 pt-4 pb-2 ">
                <TabsList className="w-full h-full flex items-center">
                  <TabsTrigger value="all">Все</TabsTrigger>
                  <TabsTrigger value="unread">Непрочитанные</TabsTrigger>
                </TabsList>
              </div>
              <Separator />
              <div className="bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Поиск" className="pl-8" />
                  </div>
                </form>
              </div>
              <TabsContent value="all" className="m-0">
                <MailList items={mails} />
              </TabsContent>
              <TabsContent value="unread" className="m-0">
                <MailList items={mails.filter((item) => !item.is_read)} />
              </TabsContent>
            </Tabs>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
            <MailDisplay
              mail={mails.find((item) => item.id === Number(selected)) || null}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <>
          <Tabs className="flex flex-col" defaultValue="all">
            <div className="flex items-center px-4 pt-4 pb-2 ">
              <TabsList className="w-full h-full flex items-center">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="unread">Непрочитанные</TabsTrigger>
              </TabsList>
            </div>
            <div className="bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Поиск" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.is_read)} />
            </TabsContent>
          </Tabs>
          {selected && (
            <div className="fixed inset-0 bg-muted px-2 py-12 w-full min-h-svh">
              <div
                onClick={() => setSelected(null)}
                className="z-50 ring-offset-background focus:ring-ring fixed top-15 right-6 rounded-xs focus:ring-2 focus:ring-offset-2 focus:outline-hidden size-6"
              >
                <XIcon />
                <span className="sr-only">Close</span>
              </div>
              <div className="rounded-3xl bg-background py-4 overflow-y-auto h-full scrollbar-hide">
                <MailDisplay
                  mail={
                    mails.find((item) => item.id === Number(selected)) || null
                  }
                />
              </div>
            </div>
          )}
        </>
      )}
    </TooltipProvider>
  );
}
