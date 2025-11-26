import { Feedback } from "@features/header/feedback";
import { ROLES } from "@shared/constants/roles";
import { Button } from "@shared/ui/button";
import { Header } from "@widgets/header";
import { Link, useNavigate } from "react-router";
import { useSession } from "@entities/session";
import { useEffect } from "react";
import { ROUTES_PATH } from "@app/router/routes";

const Forbidden = () => {
  const navigate = useNavigate();
  const { session } = useSession();

  useEffect(() => {
    if (session?.role === ROLES.FARMER) {
      navigate(ROUTES_PATH.FARMER, { replace: true });
    }
  }, [session, navigate]);

  return (
    <div className="bg-muted min-h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Доступ запрещен" />
      <div
        className="rounded-3xl h-full  bg-background p-4 gap-4 text-center 
      justify-center items-center flex"
      >
        <div className="max-w-md mx-auto">
          <h1 className="text-6xl font-extrabold text-primary mb-2">403</h1>
          <h2 className="text-2xl font-bold mb-4">Доступ запрещен</h2>
          <p className="text-muted-foreground mb-8">
            Извините, у вас нет доступа к этой странице.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/stores">Вернуться в управление магазинами</Link>
            </Button>
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
