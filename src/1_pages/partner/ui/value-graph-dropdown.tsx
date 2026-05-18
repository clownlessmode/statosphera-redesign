import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shared/ui/select";
import { PARTNER_GRAPH_METRICS, PartnerGraphMetric } from "../api/types";
import { PARTNER_GRAPH_METRIC_LABELS } from "../lib/labels";

type ValueGraphDropdownProps = {
  value: PartnerGraphMetric;
  onChange: (value: PartnerGraphMetric) => void;
};

export const ValueGraphDropdown = ({
  value,
  onChange,
}: ValueGraphDropdownProps) => {
  return (
    <Select
      value={value}
      onValueChange={(v) => onChange(v as PartnerGraphMetric)}
    >
      <SelectTrigger className="w-[240px] bg-background !h-[32px]">
        <SelectValue placeholder="Метрика графика" />
      </SelectTrigger>
      <SelectContent>
        {PARTNER_GRAPH_METRICS.map((m) => (
          <SelectItem key={m} value={m}>
            {PARTNER_GRAPH_METRIC_LABELS[m]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
