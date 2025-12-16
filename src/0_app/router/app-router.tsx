import { BrowserRouter, Route, Routes } from "react-router";
import { AnimatePresence } from "framer-motion";
import RouteGuard from "./route-guard";
import { ROUTES } from "./routes";
import { Suspense } from "react";
import PageSkeleton from "@shared/ui/page-skeleton";
import { TourProvider } from "@entities/lessons";
import Snowfall from "react-snowfall";
//import { RatingProvider } from "@widgets/rating";

const AppRouter = () => {
  return (
    <AnimatePresence mode="wait">
      <BrowserRouter>
        <TourProvider>
          <Snowfall
            color="#e6eafc"
            snowflakeCount={140}
            speed={[0.5, 1.7]}
            wind={[-0.8, 0.8]}
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              zIndex: 1000,
              pointerEvents: "none",
            }}
          />
          {/* <RatingProvider /> */}
          <Routes>
            {ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <RouteGuard
                    variant={route.variant}
                    allowedRoles={route.allowedRoles}
                    allowedUsers={route.allowedUsers}
                  >
                    {route.layout ? (
                      <route.layout>
                        <Suspense fallback={<PageSkeleton />}>
                          {route.element}
                        </Suspense>
                      </route.layout>
                    ) : (
                      route.element
                    )}
                  </RouteGuard>
                }
              />
            ))}
          </Routes>
        </TourProvider>
      </BrowserRouter>
    </AnimatePresence>
  );
};

export default AppRouter;
