import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@shared/ui/select";
import { Box, Calculator, ListOrdered, QrCode, Ruler } from "lucide-react";
import React, { FC } from "react";

const CheckSelect: FC = () => {
  return (
    <Select defaultValue="checksCount">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Показатель чеков" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Показатели чеков</SelectLabel>
          <SelectItem value="checksCount">
            <ListOrdered className="mr-2 inline-block" />
            Количество чеков, шт.
          </SelectItem>
          <SelectItem value="averageCheck">
            <Calculator className="mr-2 inline-block" />
            Средний чек, руб.
          </SelectItem>
          <SelectItem value="skuPerCheck">
            <Box className="mr-2 inline-block" />
            SKU в чеках, шт.
          </SelectItem>
          <SelectItem value="checkLength">
            <Ruler className="mr-2 inline-block" />
            Длина чека, шт.
          </SelectItem>
          <SelectItem value="qrChecks">
            <QrCode className="mr-2 inline-block" />
            Чеки по QR, шт.
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CheckSelect;
