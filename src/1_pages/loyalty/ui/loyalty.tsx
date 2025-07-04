import { Header } from "@widgets/header";

export const Loyalty = () => {
  return (
    <div className="bg-muted h-full min-h-screen w-full p-2 flex flex-col gap-2 max-w-full overflow-hidden">
      <Header title={`Лояльность`} />
      <div className="rounded-3xl px-4 py-4 gap-4 h-full grid grid-cols-12 w-full bg-background">
        <div className="w-full h-full bg-red-500">content</div>
        <div className="w-full h-full bg-green-500">content</div>
      </div>
    </div>
  );
};
