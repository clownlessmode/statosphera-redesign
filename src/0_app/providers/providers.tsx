import { FC, PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@shared/ui/sonner";
import QueryProvider from "./query-provider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children} <Toaster position="top-center" />
      </QueryProvider>
    </ThemeProvider>
  );
};

export default Providers;
