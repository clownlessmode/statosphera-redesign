import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";
import CheckboxCards from "@shared/ui/checkbox-cards";
import { Label } from "@shared/ui/label";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { usePartnerFiltersStore } from "@pages/partner/model/filters-store";
import { DEFAULT_PARTNER_GROUPS } from "@pages/partner/model/filters-store";
import type { PartnerTableGroup } from "@pages/partner/api/types";
import { PARTNER_GROUPING_SECTIONS } from "./config";

export const PartnerGroupingFilter = () => {
  const { group, setGroup } = usePartnerFiltersStore();

  const sectionValues = (sectionKey: string) => {
    const section = PARTNER_GROUPING_SECTIONS.find((s) => s.key === sectionKey);
    if (!section) return [];
    const allowed = new Set(section.options.map((o) => o.value));
    return group.filter((g) => allowed.has(g as PartnerTableGroup));
  };

  const handleSectionChange = (sectionKey: string, selected: string[]) => {
    const section = PARTNER_GROUPING_SECTIONS.find((s) => s.key === sectionKey);
    if (!section) return;

    const allowed = new Set(section.options.map((o) => o.value));
    const rest = group.filter((g) => !allowed.has(g as PartnerTableGroup));
    setGroup([...rest, ...(selected as PartnerTableGroup[])]);
  };

  return (
    <Card className="w-full mr-4">
      <CardHeader>
        <CardTitle>Группировка</CardTitle>
        <div className="flex flex-row gap-2 justify-between items-center w-full">
          <CardDescription>
            Группируйте строки таблицы по нужным измерениям
          </CardDescription>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 px-2"
            onClick={() => setGroup([...DEFAULT_PARTNER_GROUPS])}
          >
            <Eraser className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {PARTNER_GROUPING_SECTIONS.map((section) => (
          <div key={section.key} className="flex flex-col gap-2">
            <Label className="flex items-center gap-2 font-medium">
              <section.icon className="size-4" />
              {section.label}
            </Label>
            <CheckboxCards
              disableCheck
              options={section.options}
              value={sectionValues(section.key) as string[]}
              onChange={(v) => handleSectionChange(section.key, v)}
              className="grid-cols-2"
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
