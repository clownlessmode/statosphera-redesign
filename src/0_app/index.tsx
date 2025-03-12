import { createRoot } from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router";
import { Authorization } from "@pages/authorization";
import Providers from "./providers/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Authorization />} />
      </Routes>
    </BrowserRouter>
  </Providers>
);
