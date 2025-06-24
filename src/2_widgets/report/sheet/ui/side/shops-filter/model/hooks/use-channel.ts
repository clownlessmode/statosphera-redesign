import { useSession } from "@entities/session";

import { ROLES } from "@shared/constants/roles";
import { CHANNEL } from "@widgets/report/sheet/model/filters-store";
import {
  KeySquare,
  BarChart3,
  ShoppingBag,
  Truck,
  Store,
  Box,
} from "lucide-react";

const allChannels = [
  {
    label: "В аренду",
    value: CHANNEL.RENT,
    icon: KeySquare,
  },
  {
    label: "Инвестиционная",
    value: CHANNEL.INVEST,
    icon: BarChart3,
    disableCheck: true,
  },
  {
    label: "ФРС",
    value: CHANNEL.FRS,
    icon: ShoppingBag,
  },
  {
    label: "Фудтрак",
    value: CHANNEL.FOODTRUCK,
    icon: Truck,
  },
  {
    label: "Микромаркет",
    value: CHANNEL.MICROMARKET,
    icon: Store,
  },
  {
    label: "Вендинг",
    value: CHANNEL.WENDING,
    icon: Box,
  },
];

// MM_CHANNEL - фудтрак, микромаркет и вендинг
const mmChannelValues = [
  CHANNEL.FOODTRUCK,
  CHANNEL.MICROMARKET,
  CHANNEL.WENDING,
];

// FRS_CHANNEL - ФРС, инвест, в аренду
const frsChannelValues = [CHANNEL.FRS, CHANNEL.INVEST, CHANNEL.RENT];

export const useChannel = () => {
  const { session } = useSession();
  const role = session?.role;

  let channels;

  if (role === ROLES.OFFICE_MM) {
    // MM_CHANNEL = фудтрак, микромаркет и вендинг
    channels = allChannels.filter((channel) =>
      mmChannelValues.includes(channel.value),
    );
  } else if (role === ROLES.OFFICE_UNION || role === ROLES.ADMIN) {
    // CHANNEL = все каналы
    channels = allChannels;
  } else {
    // FRS_CHANNEL = ФРС, инвест, в аренду
    channels = allChannels.filter((channel) =>
      frsChannelValues.includes(channel.value),
    );
  }

  return {
    CHANNEL_SHOP: channels,
  };
};
