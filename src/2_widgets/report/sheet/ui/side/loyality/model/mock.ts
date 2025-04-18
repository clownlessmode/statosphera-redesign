import { useFilters } from "@entities/report/model/api/filters/loyality/controller";
import {
  LoyalActionFilterResponse,
  LoyalBonusFilterResponse,
} from "@entities/report/model/api/filters/loyality/types";
import { MultiSelectOption } from "@shared/ui/multiselect";
import { BadgeCheck, BadgeX, User2, User, Badge, Users } from "lucide-react";
import { useState } from "react";

export const type = [
  {
    label: "Все",
    value: null,
    icon: Badge,
  },
  {
    label: "Лояльность",
    value: true,
    icon: BadgeCheck,
  },
  {
    label: "Кроме лояльности",
    value: false,
    icon: BadgeX,
  },
];
export const gender = [
  {
    label: "Все",
    value: null,
    icon: Users,
  },
  {
    label: "Мужской",
    value: "M",
    icon: User,
  },
  {
    label: "Женский",
    value: "Ж",
    icon: User2,
  },
];

export const useLoyalAction = (allData: any) => {
  const [loyalActionOptions, setLoyalActionOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getLoyalAction, isLoyalActionLoading } = useFilters();

  const handleOpenLoyalActionSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getLoyalAction(allData);
      const apiOptions = response.map(
        (loyalAction: LoyalActionFilterResponse) => ({
          label:
            loyalAction.nameDiscount ||
            "Название не указано (ID: " + loyalAction.guid?.[0] + ")",
          value: String(loyalAction.guid?.[0] || ""),
        })
      );
      setLoyalActionOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке лояльных действий:", error);
    }
  };

  return {
    handleOpenLoyalActionSelect,
    loyalActionOptions,
    isLoyalActionLoading,
  };
};

export const useLoyalBonus = (allData: any) => {
  const [loyalBonusOptions, setLoyalBonusOptions] = useState<
    MultiSelectOption[]
  >([]);
  const { getLoyalBonus, isLoyalBonusLoading } = useFilters();

  const handleOpenLoyalBonusSelect = async (isOpen: boolean) => {
    if (!isOpen) return;

    try {
      const response = await getLoyalBonus(allData);
      const apiOptions = response.map(
        (loyalBonus: LoyalBonusFilterResponse) => ({
          label:
            loyalBonus.nameBonus ||
            "Название не указано (ID: " + loyalBonus.guid?.[0] + ")",
          value: String(loyalBonus.guid?.[0] || ""),
        })
      );
      setLoyalBonusOptions(apiOptions);
    } catch (error) {
      console.error("Ошибка при загрузке лояльных бонусов:", error);
    }
  };

  return {
    handleOpenLoyalBonusSelect,
    loyalBonusOptions,
    isLoyalBonusLoading,
  };
};
