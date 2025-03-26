"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@shared/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@shared/ui/resizable";
import { Separator } from "@shared/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { TooltipProvider } from "@shared/ui/tooltip";
import { Mail } from "../data";
import useMail from "../use-mail";
import { MailDisplay } from "./mail-display";
import { MailList } from "./mail-list";

import { useIsMobile } from "@shared/hooks/use-mobile";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  mails: Mail[];
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mails({ mails, defaultLayout = [20, 32, 48] }: MailProps) {
  const { selected } = useMail();
  const isMobile = useIsMobile();
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
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
              <MailList items={mails.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          <MailDisplay
            mail={mails.find((item) => item.id === selected) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
