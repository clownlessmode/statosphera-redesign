import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@shared/ui/sonner";
import QueryProvider from "./query-provider";
import { SidebarProvider } from "@shared/ui/sidebar";
import { YMaps } from "@pbe/react-yandex-maps";
const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <SidebarProvider>
          <YMaps>{children}</YMaps>
          <Toaster position="top-center" />
        </SidebarProvider>
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
