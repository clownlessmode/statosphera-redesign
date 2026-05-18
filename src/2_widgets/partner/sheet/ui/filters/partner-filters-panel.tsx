import { useEffect } from "react";
import {
  ViewTabs,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
  ViewTabsLabel,
  ViewTabsList,
  ViewTabsTrigger,
  useViewTabs,
} from "@shared/ui/view-tabs";
import { usePartnerUrlStore } from "../../model/url-store";
import { Separator } from "@shared/ui/separator";
import { Button } from "@shared/ui/button";
import { Eraser } from "lucide-react";
import { useFormResetStore } from "@widgets/report/sheet/model/reset-store";
import { partnerFilters, partnerGrouping, partnerIndicators } from "./tabs";
import { PartnerSubmitButton } from "../submit-button";
import { useIsMobile } from "@shared/hooks/use-mobile";
import { useSearchParams } from "react-router";

type PartnerFiltersPanelProps = {
  onSubmit: () => void | Promise<void>;
};

const PartnerFiltersInner = ({ onSubmit }: PartnerFiltersPanelProps) => {
  const { targetViewValue, setTargetViewValue } = usePartnerUrlStore();
  const { scrollTo } = useViewTabs();
  const { triggerReset } = useFormResetStore();

  useEffect(() => {
    if (targetViewValue) {
      scrollTo(targetViewValue);
      setTargetViewValue(null);
    }
  }, [targetViewValue, scrollTo, setTargetViewValue]);
  const isMobile = useIsMobile();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClose = () => {
    const p = new URLSearchParams(searchParams);
    p.set("open", "false");
    setSearchParams(p);
  };

  return (
    <>
      {!isMobile && (
        <ViewTabsList className="flex flex-col bg-background text-inherit rounded-none px-4 gap-4 border-r md:border-border pt-4 h-full">
          <ViewTabsGroup>
            <ViewTabsLabel>Фильтры</ViewTabsLabel>
            <ViewTabsGroupContent>
              {partnerFilters.map((item) => (
                <ViewTabsTrigger
                  key={item.title}
                  value={item.title}
                  icon={item.icon}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <ViewTabsGroup>
            <ViewTabsLabel>Группировка</ViewTabsLabel>
            <ViewTabsGroupContent>
              {partnerGrouping.map((item) => (
                <ViewTabsTrigger
                  key={item.title}
                  value={item.title}
                  icon={item.icon}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <ViewTabsGroup>
            <ViewTabsLabel>Показатели</ViewTabsLabel>
            <ViewTabsGroupContent>
              {partnerIndicators.map((item) => (
                <ViewTabsTrigger
                  key={item.title}
                  value={item.title}
                  icon={item.icon}
                >
                  {item.title}
                </ViewTabsTrigger>
              ))}
            </ViewTabsGroupContent>
          </ViewTabsGroup>
          <Separator />
          <PartnerSubmitButton onSubmit={onSubmit} />
        </ViewTabsList>
      )}

      <div className="flex flex-col py-4 gap-4 md:max-w-xl md:max-h-screen md:pb-96 md:overflow-auto md:gap-8 max-md:px-4 max-md:w-full max-md:pb-18">
        {isMobile ? (
          <div className="fixed bottom-0 left-0 flex flex-row w-full h-10 mb-4 px-4 z-50">
            <Button className="w-1/4 h-full" onClick={handleClose}>
              Закрыть
            </Button>
            <PartnerSubmitButton
              className="w-2/4 h-full mx-2"
              onSubmit={onSubmit}
            />
            <Button className="w-1/4 h-full" onClick={() => triggerReset()}>
              <Eraser className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={() => triggerReset()}>
              Очистить все фильтры <Eraser className="h-4 w-4 ml-1" />
            </Button>
            <Separator />
          </>
        )}

        {partnerFilters.map((item) => (
          <ViewTabsContent key={item.title} value={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
        {partnerGrouping.map((item) => (
          <ViewTabsContent key={item.title} value={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
        {partnerIndicators.map((item) => (
          <ViewTabsContent key={item.title} value={item.title}>
            <item.component />
          </ViewTabsContent>
        ))}
      </div>
    </>
  );
};

export const PartnerFiltersPanel = ({ onSubmit }: PartnerFiltersPanelProps) => {
  const defaultValue = partnerFilters.length > 0 ? partnerFilters[0].title : "";

  return (
    <ViewTabs
      defaultValue={defaultValue}
      className="flex md:flex-row gap-4 h-full flex-col"
    >
      <PartnerFiltersInner onSubmit={onSubmit} />
    </ViewTabs>
  );
};
