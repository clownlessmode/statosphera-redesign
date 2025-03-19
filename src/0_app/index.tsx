import { createRoot } from "react-dom/client";

import Providers from "./providers/providers";

import AppRouter from "./router/app-router";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <AppRouter />
  </Providers>
);
