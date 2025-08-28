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
    e.stopPropagation();
    e.preventDefault();

    const possibleIdFields = ["idProduct", "id", "productId", "product_id"];
    let productId = null;

    for (const field of possibleIdFields) {
      if (props.data && props.data[field] !== undefined) {
        productId = props.data[field];
        break;
      }
    }

    if (!productId) {
      return <></>;
    }

    if (props.onSettingsClick) {
      props.onSettingsClick(props.data);
    } else {
      return <></>;
    }
  };

  return (
    <div className="flex items-center gap-2 w-full h-full">
      <button
        onClick={handleSettingsClick}
        className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
        title="Управление продуктом"
        type="button"
      >
        <Settings className="h-4 w-4 text-foreground hover:text-background" />
      </button>
      <span className="flex-1 truncate">{props.value}</span>
    </div>
  );
};

export const createProductNameRenderer = (
  onSettingsClick: (data: any) => void,
) => {
  return (props: any) => {
    return <ProductNameRenderer {...props} onSettingsClick={onSettingsClick} />;
  };
};
