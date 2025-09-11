export const Product = () => {
  return (
    <div className="w-full h-full">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Управление товарами</h2>
        <p className="text-muted-foreground">
          Здесь вы можете управлять товарами в терминале
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Добавить товар</h3>
            <p className="text-sm text-muted-foreground">
              Добавить новый товар в систему
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Список товаров</h3>
            <p className="text-sm text-muted-foreground">
              Просмотр и редактирование товаров
            </p>
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Категории</h3>
            <p className="text-sm text-muted-foreground">
              Управление категориями товаров
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
