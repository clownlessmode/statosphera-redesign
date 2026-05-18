import { PARTNER_VALUES } from "@pages/partner/api/types";
import { PARTNER_METRIC_LABELS } from "@pages/partner/lib/labels";
import type { CheckboxTreeItem } from "@shared/ui/checkbox-tree";
import { Hash, Layers, Percent } from "lucide-react";

export const PARTNER_INDICATORS_TREE: CheckboxTreeItem[] = [
  {
    id: "partner-count",
    label: "Количество",
    value: "partner_count",
    icon: Hash,
    children: [
      {
        id: PARTNER_VALUES.ORDERED_COUNT,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.ORDERED_COUNT],
        value: PARTNER_VALUES.ORDERED_COUNT,
      },
      {
        id: PARTNER_VALUES.SHIPPED_COUNT,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPPED_COUNT],
        value: PARTNER_VALUES.SHIPPED_COUNT,
      },
      {
        id: PARTNER_VALUES.NOT_SHIPPED_COUNT,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.NOT_SHIPPED_COUNT],
        value: PARTNER_VALUES.NOT_SHIPPED_COUNT,
      },
    ],
  },
  {
    id: "partner-sum",
    label: "Суммы",
    value: "partner_sum",
    icon: Layers,
    children: [
      {
        id: PARTNER_VALUES.ORDERED_SUM,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.ORDERED_SUM],
        value: PARTNER_VALUES.ORDERED_SUM,
      },
      {
        id: PARTNER_VALUES.SHIPPED_SUM,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPPED_SUM],
        value: PARTNER_VALUES.SHIPPED_SUM,
      },
    ],
  },
  {
    id: "partner-other",
    label: "Прочее",
    value: "partner_other",
    icon: Percent,
    children: [
      {
        id: PARTNER_VALUES.NOT_SHIPPED_PROFIT,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.NOT_SHIPPED_PROFIT],
        value: PARTNER_VALUES.NOT_SHIPPED_PROFIT,
      },
      {
        id: PARTNER_VALUES.SHIPMENT_PERCENT,
        label: PARTNER_METRIC_LABELS[PARTNER_VALUES.SHIPMENT_PERCENT],
        value: PARTNER_VALUES.SHIPMENT_PERCENT,
      },
    ],
  },
];
