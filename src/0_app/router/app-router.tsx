import { BrowserRouter, Route, Routes } from "react-router";
import { AnimatePresence } from "framer-motion";

import RouteGuard from "./route-guard";
import { ROUTES } from "./routes";

const AppRouter = () => {
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <Routes>
          {ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RouteGuard
                  variant={route.variant}
                  allowedRoles={route.allowedRoles}
                >
                  {route.layout ? (
                    <route.layout>{route.element}</route.layout>
                  ) : (
                    route.element
                  )}
                </RouteGuard>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </AnimatePresence>
  );
};

export default AppRouter;
