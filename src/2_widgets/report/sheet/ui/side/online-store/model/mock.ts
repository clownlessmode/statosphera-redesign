import { useFilters } from "@entities/report/model/api/filters/online-store/controller";
import {
  IntervalFilterResponse,
  PromoFilterResponse,
  StatusOrderFilterResponse,
} from "@entities/report/model/api/filters/online-store/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import {
  Badge,
  Store,
  Globe,
  Smartphone,
  MonitorSmartphone,
  Truck,
  CreditCard,
  Building,
} from "lucide-react";
import { useState } from "react";

export const type = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Только ИМ",
    value: true,
    icon: Globe,
  },
  {
    label: "Кроме ИМ",
    value: false,
    icon: Store,
  },
];

export const typeOrder = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
  {
    label: "Приложение",
    value: "Мобилка",
    icon: Smartphone,
  },
  {
    label: "Сайт",
    value: "Сайт",
    icon: MonitorSmartphone,
  },
];

export const typeDelivery = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
  {
    label: "Доставка",
    value: "Курьер",
    icon: Truck,
  },
  {
    label: "Самовывоз",
    value: "Самовывоз",
    icon: Store,
  },
];

export const typePayment = [
  {
    label: "Все",
    value: "all",
    icon: Badge,
  },
  {
    label: "Онлайн",
    value: "Онлайн",
    icon: Globe,
  },
  {
    label: "Офлайн",
    value: "Офлайн",
    icon: Building,
  },
  {
    label: "Картой курьеру",
    value: "Картой курьера",
    icon: CreditCard,
    disableCheck: true,
  },
];

export const useStatusOrder = (allData: any) => {
  const [statusOrderOptions, setStatusOrderOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getStatusOrder, isStatusOrderLoading } = useFilters();

  const handleOpenStatusOrderSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getStatusOrder(allData);
      const apiOptions = response.map(
        (statusOrder: StatusOrderFilterResponse) => ({
          label:
            statusOrder.im_status_order ||
            "Статус заказа не указан (ID: " +
              statusOrder.im_status_order?.[0] +
              ")",
          value: String(statusOrder.im_status_order?.[0] || ""),
        })
      );
      setStatusOrderOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке статуса заказа:", error);
    }
  };

  return {
    handleOpenStatusOrderSelect,
    statusOrderOptions,
    isStatusOrderLoading,
  };
};

export const useInterval = (allData: any) => {
  const [intervalOptions, setIntervalOptions] = useState<MultiSelectOption[]>(
    []
  );
  const { getInterval, isIntervalLoading } = useFilters();

  const handleOpenIntervalSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getInterval(allData);
      const apiOptions = response.map((interval: IntervalFilterResponse) => ({
        label:
          interval.im_receive_interval ||
          "Интервал не указан (ID: " + interval.im_receive_interval?.[0] + ")",
        value: String(interval.im_receive_interval?.[0] || ""),
      }));
      setIntervalOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке интервала:", error);
    }
  };

  return {
    handleOpenIntervalSelect,
    intervalOptions,
    isIntervalLoading,
  };
};

export const usePromo = (allData: any) => {
  const [promoOptions, setPromoOptions] = useState<MultiSelectOption[]>([]);
  const { getPromo, isPromoLoading } = useFilters();

  const handleOpenPromoSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getPromo(allData);
      const apiOptions = response.map((promo: PromoFilterResponse) => ({
        label: promo.im_promo,
        value: String(promo.im_promo || ""),
      }));
      setPromoOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке промо:", error);
    }
  };

  return {
    handleOpenPromoSelect,
    promoOptions,
    isPromoLoading,
  };
};
