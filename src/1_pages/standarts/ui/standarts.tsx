import { Button } from "@shared/ui/button";
import { Header } from "@widgets/header";
import { Link } from "react-router";

// import StandartCard from "@entities/standarts/ui/standart-card";
// import { standartsMock } from "@shared/constants/mock/standarts-mock";

const Digests = () => {
  // const standarts = standartsMock;

  return (
    <div className="bg-muted h-screen w-full p-2 flex flex-col gap-2">
      <Header title="Стандарты ФРС" />
      <div className="rounded-3xl bg-background p-4 gap-4 h-full flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-6xl font-extrabold text-primary mb-2 w-full text-center">
            Страница ищет хозяина
          </h1>
          <p className="text-muted-foreground mb-8">
            Извините, страница которую вы ищете существует, но была скрыта, так
            как оказалась не нужна своему прошлому хозяину ;(
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button asChild>
              <Link to="/">Вернуться на главную</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/support">Связаться с поддержкой</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Digests;
