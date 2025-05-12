import { FC } from "react";
import { create } from "zustand";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@shared/ui/select";
import {
  DollarSign,
  Tag,
  CreditCard,
  Archive,
  Percent,
  Calculator,
  Box,
  Ruler,
  ListOrdered,
} from "lucide-react";

// Тип одной опции селекта
export interface SelectOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

//     icon: <DollarSign className="mr-2 inline-block" />,
//   },
//   {
//     value: "discounts",
//     label: "Скидки, руб.",
//     icon: <Tag className="mr-2 inline-block" />,
//   },
//   {
//     value: "cost",
//     label: "Себестоимость, руб.",
//     icon: <CreditCard className="mr-2 inline-block" />,
//   },
//   {
//     value: "markupAmount",
//     label: "Наценка в руб.",
//     icon: <TrendingUp className="mr-2 inline-block" />,
//   },
//   {
//     value: "writeOffsAmount",
//     label: "Списания, руб.",
//     icon: <Archive className="mr-2 inline-block" />,
//   },
//   {
//     value: "writeOffsPercent",
//     label: "Списания %",
//     icon: <Percent className="mr-2 inline-block" />,
//   },
//   {
//     value: "marginPercent",
//     label: "Маржа %",
//     icon: <Percent className="mr-2 inline-block" />,
//   },
//   {
//     value: "markupPercent",
//     label: "Наценка %",
//     icon: <Percent className="mr-2 inline-block" />,
//   },
//   {
//     value: "checksCount",
//     label: "Количество чеков, шт.",
//     icon: <ListOrdered className="mr-2 inline-block" />,
//   },
//   {
//     value: "averageCheck",
//     label: "Средний чек, руб.",
//     icon: <Calculator className="mr-2 inline-block" />,
//   },
//   {
//     value: "skuPerCheck",
//     label: "SKU в чеках, шт.",
//     icon: <Box className="mr-2 inline-block" />,
//   },
//   {
//     value: "checkLength",
//     label: "Длина чека, шт.",
//     icon: <Ruler className="mr-2 inline-block" />,
//   },
//   {
//     value: "qrChecks",
//     label: "Чеки по QR, шт.",
//     icon: <QrCode className="mr-2 inline-block" />,
//   },
// ];
const SELECT_OPTIONS: SelectOption[] = [
  {
    value: "proceeds",
    label: "Выручка, руб.",
    icon: <DollarSign className="mr-2 inline-block" />,
  },
  {
    value: "discount",
    label: "Скидки, руб.",
    icon: <Tag className="mr-2 inline-block" />,
  },
  {
    value: "discountPercent",
    label: "Скидки %",
    icon: <Percent className="mr-2 inline-block" />,
  },
  {
    value: "costPrice",
    label: "Себестоимость, руб.",
    icon: <CreditCard className="mr-2 inline-block" />,
  },
  {
    value: "markupPercent",
    label: "Наценка %",
    icon: <Percent className="mr-2 inline-block" />,
  },
  {
    value: "writeOff",
    label: "Списания, руб.",
    icon: <Archive className="mr-2 inline-block" />,
  },
  {
    value: "writeOffPercent",
    label: "Списания %",
    icon: <Percent className="mr-2 inline-block" />,
  },
  {
    value: "marginPercent",
    label: "Маржа %",
    icon: <Percent className="mr-2 inline-block" />,
  },
  {
    value: "check",
    label: "Количество чеков, шт.",
    icon: <ListOrdered className="mr-2 inline-block" />,
  },
  {
    value: "avgCheck",
    label: "Средний чек, руб.",
    icon: <Calculator className="mr-2 inline-block" />,
  },
  {
    value: "skuUnique",
    label: "SKU в чеках, шт.",
    icon: <Box className="mr-2 inline-block" />,
  },
  {
    value: "lenCheck",
    label: "Длина чека, шт.",
    icon: <Ruler className="mr-2 inline-block" />,
  },
];
// Интерфейс стора
interface SalesSelectStore {
  first: { label: string; value: string };
  second: { label: string; value: string };
  setFirst: (opt: { label: string; value: string }) => void;
  setSecond: (opt: { label: string; value: string }) => void;
}

export const useSalesSelectStore = create<SalesSelectStore>((set) => ({
  first: { label: "Выручка, руб.", value: "proceeds" },
  second: { label: "Количество чеков, шт.", value: "check" },
  setFirst: (opt) => set({ first: opt }),
  setSecond: (opt) => set({ second: opt }),
}));

interface SalesSelectProps {
  index: 1 | 2;
}

export const SalesSelect: FC<SalesSelectProps> = ({ index }) => {
  const setOption =
    index === 1
      ? useSalesSelectStore((state) => state.setFirst)
      : useSalesSelectStore((state) => state.setSecond);

  return (
    <Select
      defaultValue={index === 1 ? "proceeds" : "check"}
      onValueChange={(value) => {
        const found = SELECT_OPTIONS.find((opt) => opt.value === value);
        setOption({ value, label: found?.label || value });
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Финансовый показатель" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Финансовые показатели</SelectLabel>
          {SELECT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.icon}
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SalesSelect;
