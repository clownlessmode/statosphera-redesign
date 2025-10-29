import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@shared/ui/sonner";
import QueryProvider from "./query-provider";
import { SidebarProvider } from "@shared/ui/sidebar";
import { YMaps } from "@pbe/react-yandex-maps";
import AutoReloadProvider from "./auto-reload-provider";
import { BorderRadiusProvider } from "@shared/providers/border-radius-provider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SidebarProvider>
          <AutoReloadProvider reloadTime="03:00" enabled={true}>
            <BorderRadiusProvider />
            <YMaps>{children}</YMaps>
            <Toaster position="top-center" />
          </AutoReloadProvider>
        </SidebarProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
