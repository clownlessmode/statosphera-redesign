import React from "react";
import { Settings } from "lucide-react";

interface ProductNameRendererProps {
  value: string;
  data: any;
  onSettingsClick?: (data: any) => void;
}

export const ProductNameRenderer: React.FC<ProductNameRendererProps> = (
  props,
) => {
  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    e.preventDefault(); // Предотвращаем стандартное поведение

    console.log("ProductNameRenderer - handleSettingsClick вызван");
    console.log("props.data:", props.data);
    console.log("props.value:", props.value);

    // Проверяем различные возможные поля для ID продукта
    const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
    let productId = null;

    for (const field of possibleIdFields) {
      if (props.data && props.data[field] !== undefined) {
        productId = props.data[field];
        console.log(`Найден ID продукта в поле ${field}:`, productId);
        break;
      }
    }

    if (!productId) {
      console.error("ID продукта не найден в данных:", props.data);
      console.log("Доступные поля:", Object.keys(props.data || {}));
    }

    if (props.onSettingsClick) {
      props.onSettingsClick(props.data);
    } else {
      console.error("onSettingsClick не передан в рендерер");
    }
  };

  return (
    <div className="flex items-center gap-2 w-full h-full">
      <button
        onClick={handleSettingsClick}
        className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
        title="Добавить количество"
        type="button"
      >
        <Settings className="h-4 w-4 text-gray-500 hover:text-gray-700" />
      </button>
      <span className="flex-1 truncate">{props.value}</span>
    </div>
  );
};

// Функция-фабрика для создания рендерера с параметрами
export const createProductNameRenderer = (
  onSettingsClick: (data: any) => void,
) => {
  console.log(
    "createProductNameRenderer вызван с onSettingsClick:",
    onSettingsClick,
  );

  return (props: any) => {
    console.log("Рендерер создан с props:", props);
    return <ProductNameRenderer {...props} onSettingsClick={onSettingsClick} />;
  };
};
