import { Button } from "@shared/ui/button";
import { SidebarProvider } from "@shared/ui/sidebar";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center mx-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-extrabold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold mb-4">Страница не найдена</h2>
          <p className="text-muted-foreground mb-8">
            Извините, страница, которую вы ищете, не существует или была
            перемещена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/support">Связаться с поддержкой</Link>
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default NotFound;
