import { MapPin, Settings, Wrench } from "lucide-react";

// Импорты компонентов будут добавлены после создания
export interface FilterTab {
  title: string;
  icon: any;
  component: React.ComponentType;
}

// Будем импортировать компоненты позже
let GeographyFilter: React.ComponentType;
let CapabilitiesFilter: React.ComponentType;
let EquipmentFilter: React.ComponentType;

// Динамический импорт компонентов
import("../ui/filters/geography-filter").then((module) => {
  GeographyFilter = module.GeographyFilter;
});

import("../ui/filters/capabilities-filter").then((module) => {
  CapabilitiesFilter = module.CapabilitiesFilter;
});

import("../ui/filters/equipment-filter").then((module) => {
  EquipmentFilter = module.EquipmentFilter;
});

export const storesFilterTabs: FilterTab[] = [
  {
    title: "География",
    icon: MapPin,
    get component() {
      return GeographyFilter;
    },
  },
  {
    title: "Возможности",
    icon: Settings,
    get component() {
      return CapabilitiesFilter;
    },
  },
  {
    title: "Оборудование",
    icon: Wrench,
    get component() {
      return EquipmentFilter;
    },
  },
];
