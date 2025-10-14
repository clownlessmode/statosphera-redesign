import { useState } from "react";
import { cn } from "@shared/lib/utils";
import { Header } from "@widgets/header";
import { Card } from "@shared/ui/card";
import { Label } from "@shared/ui/label";
import { ColorPicker } from "@shared/ui/color-picker";
import { Button } from "@shared/ui/button";
import { useTheme } from "@app/providers/theme-provider";
import { ThemeSwitcher } from "@features/theme-switcher/theme-switcher";
import { Separator } from "@shared/ui/separator";
import { Input } from "@shared/ui/input";
import { Badge } from "@shared/ui/badge";
import {
  Palette,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
  Bell,
  LayoutGrid,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { COLOR_PRESETS } from "@shared/lib/color-utils";
import { FULL_THEME_PRESETS } from "@shared/constants/theme-presets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";
import { Switch } from "@shared/ui/switch";
import {
  ViewTabs,
  ViewTabsList,
  ViewTabsTrigger,
  ViewTabsContent,
  ViewTabsGroup,
  ViewTabsGroupContent,
} from "@shared/ui/view-tabs";
import { useDashboardLayout } from "@shared/hooks/use-dashboard-layout";
import { useEffectsSettings } from "@shared/hooks/use-effects-settings";
import { hasEffectsAccess } from "@shared/constants/effects-users";
import { useSession } from "@entities/session";

export const Settings = () => {
  const {
    colors,
    setColors,
    resetColors,
    applyColorScheme,
    theme,
    customThemeMode,
    setCustomThemeMode,
    setTheme,
    applyFullPreset,
  } = useTheme();
  const { session } = useSession();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [selectedFullPreset, setSelectedFullPreset] = useState<string | null>(
    () => localStorage.getItem("applied-theme-preset"),
  );

  // Проверяем, есть ли доступ к эффектам для текущего пользователя
  const userHasEffectsAccess = hasEffectsAccess(session?.idUser);

  // Хук для управления порядком виджетов
  const allWidgets = [
    "weeklyRevenue",
    "nps",
    "channelRevenue",
    "stats",
    "salesStructure",
    "currentStats",
    "writeoffsLeaders",
    "loyaltyOrWriteOff",
    "hoursRevenue",
    "planPercent",
    "topWriteoffs",
    "todayStats",
    "antiLoyalTop",
  ];
  const { resetLayout } = useDashboardLayout(allWidgets);
  const {
    settings: effectsSettings,
    updateSettings: updateEffectsSettings,
    resetSettings: resetEffectsSettings,
  } = useEffectsSettings();

  const handlePresetSelect = (presetColor: string, presetId: string) => {
    applyColorScheme(presetColor);
    setSelectedPreset(presetId);

    // Автоматически переключаем на "Своя" тему, если выбрана другая
    if (theme !== "custom") {
      setTheme("custom");
    }
  };

  const handleCustomThemeModeToggle = (checked: boolean) => {
    const newMode = checked ? "light" : "dark";
    setCustomThemeMode(newMode);
  };

  const handleColorChange = (colorKey: keyof typeof colors, color: string) => {
    setColors({ [colorKey]: color });
  };

  const handleResetColors = () => {
    resetColors();
  };

  const handleFullPresetSelect = async (presetId: string) => {
    const preset = FULL_THEME_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      await applyFullPreset(preset);
      setSelectedFullPreset(presetId);
      if (theme !== "custom") {
        setTheme("custom");
      }
    }
  };

  const colorGroups = [
    {
      title: "Основные цвета",
      colors: [
        { key: "primary", label: "Primary", desc: "Основной акцентный цвет" },
        {
          key: "primaryForeground",
          label: "Primary Foreground",
          desc: "Текст на primary",
        },
        {
          key: "secondary",
          label: "Secondary",
          desc: "Вторичный акцентный цвет",
        },
        {
          key: "secondaryForeground",
          label: "Secondary Foreground",
          desc: "Текст на secondary",
        },
        { key: "accent", label: "Accent", desc: "Акцентный цвет" },
        {
          key: "accentForeground",
          label: "Accent Foreground",
          desc: "Текст на accent",
        },
      ],
    },
    {
      title: "Фоны и текст",
      colors: [
        { key: "background", label: "Background", desc: "Основной фон" },
        {
          key: "foreground",
          label: "Foreground",
          desc: "Основной текст на фоне",
        },
        { key: "card", label: "Card", desc: "Фон карточек" },
        {
          key: "cardForeground",
          label: "Card Foreground",
          desc: "Текст карточек",
        },
        { key: "popover", label: "Popover", desc: "Фон поповеров" },
        {
          key: "popoverForeground",
          label: "Popover Foreground",
          desc: "Текст поповеров",
        },
        { key: "muted", label: "Muted", desc: "Приглушённый фон" },
        {
          key: "mutedForeground",
          label: "Muted Foreground",
          desc: "Приглушённый текст",
        },
      ],
    },
    {
      title: "Статусные цвета",
      colors: [
        {
          key: "destructive",
          label: "Destructive",
          desc: "Цвет ошибок/удаления",
        },
        {
          key: "destructiveForeground",
          label: "Destructive Foreground",
          desc: "Текст на destructive",
        },
        { key: "positive", label: "Positive", desc: "Положительный цвет" },
        {
          key: "positiveForeground",
          label: "Positive Foreground",
          desc: "Текст на positive",
        },
        { key: "average", label: "Average", desc: "Средний показатель" },
        {
          key: "averageForeground",
          label: "Average Foreground",
          desc: "Текст на average",
        },
        { key: "height", label: "Height", desc: "Высокий показатель" },
        {
          key: "heightForeground",
          label: "Height Foreground",
          desc: "Текст на height",
        },
      ],
    },
    {
      title: "Границы и элементы",
      colors: [
        { key: "border", label: "Border", desc: "Цвет границ" },
        { key: "input", label: "Input", desc: "Границы полей ввода" },
        { key: "ring", label: "Ring", desc: "Цвет фокусировки" },
      ],
    },
    {
      title: "Цвета графиков",
      colors: [
        { key: "chart1", label: "Chart 1", desc: "Первый цвет графиков (HSL)" },
        { key: "chart2", label: "Chart 2", desc: "Второй цвет графиков (HSL)" },
        { key: "chart3", label: "Chart 3", desc: "Третий цвет графиков (HSL)" },
        {
          key: "chart4",
          label: "Chart 4",
          desc: "Четвертый цвет графиков (HSL)",
        },
        { key: "chart5", label: "Chart 5", desc: "Пятый цвет графиков (HSL)" },
      ],
    },
  ];

  return (
    <div className="bg-muted w-full p-2 flex flex-col gap-2 h-screen max-w-full overflow-hidden">
      <Header title="Настройки" />
      <div
        className={cn(
          "rounded-3xl flex flex-1 w-full bg-background overflow-hidden",
        )}
      >
        <ViewTabs defaultValue="theme" className="w-full h-full flex">
          <ViewTabsList className="py-4 min-w-[200px] flex-shrink-0 h-full overflow-y-auto scrollbar-hide">
            <ViewTabsGroup>
              <ViewTabsGroupContent>
                <ViewTabsTrigger value="theme" icon={Palette}>
                  Тема
                </ViewTabsTrigger>
                <ViewTabsTrigger value="notifications" icon={Bell}>
                  Уведомления
                </ViewTabsTrigger>
                {userHasEffectsAccess && (
                  <ViewTabsTrigger value="effects" icon={LayoutGrid}>
                    Эффекты
                  </ViewTabsTrigger>
                )}
              </ViewTabsGroupContent>
            </ViewTabsGroup>
          </ViewTabsList>

          <div className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 h-full">
            <div className="flex flex-col gap-6  pb-8">
              <ViewTabsContent value="theme" className="flex flex-col gap-6">
                {/* Тема */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          Тема интерфейса
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Выберите режим отображения приложения
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base">Режим отображения</Label>
                        <ThemeSwitcher />
                      </div>

                      {theme === "custom" && (
                        <>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Moon className="h-4 w-4 text-muted-foreground" />
                              <Label className="text-base">
                                Светлая версия своей темы
                              </Label>
                              <Sun className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <Switch
                              checked={customThemeMode === "light"}
                              onCheckedChange={handleCustomThemeModeToggle}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Переключайте между светлой и тёмной версией вашей
                            кастомной темы
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </Card>

                {/* Полные пресеты тем */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Полные темы</h2>
                        <p className="text-sm text-muted-foreground">
                          Готовые темы с цветами, радиусами и тенями
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {FULL_THEME_PRESETS.map((preset) => {
                        const isSelected = selectedFullPreset === preset.id;
                        const presetData =
                          customThemeMode === "dark"
                            ? preset.dark
                            : preset.light;
                        return (
                          <button
                            key={preset.id}
                            onClick={() => handleFullPresetSelect(preset.id)}
                            className={cn(
                              "flex flex-col gap-3 p-4 rounded-lg border-2 transition-all hover:scale-[1.02]",
                              isSelected
                                ? "border-primary shadow-lg shadow-primary/20 bg-primary/5"
                                : "border-border hover:border-primary/50",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">
                                {preset.name}
                              </span>
                              {isSelected && (
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground text-left">
                              {preset.description}
                            </p>
                            <div className="flex gap-1.5 flex-wrap">
                              <div
                                className="w-8 h-8 rounded border-2 border-background shadow-sm"
                                style={{
                                  backgroundColor: presetData.colors.primary,
                                }}
                                title="Primary"
                              />
                              <div
                                className="w-8 h-8 rounded border-2 border-background shadow-sm"
                                style={{
                                  backgroundColor: presetData.colors.secondary,
                                }}
                                title="Secondary"
                              />
                              <div
                                className="w-8 h-8 rounded border-2 border-background shadow-sm"
                                style={{
                                  backgroundColor: presetData.colors.accent,
                                }}
                                title="Accent"
                              />
                              <div
                                className="w-8 h-8 rounded border-2 border-background shadow-sm"
                                style={{
                                  backgroundColor:
                                    presetData.colors.destructive,
                                }}
                                title="Destructive"
                              />
                              <div
                                className="w-8 h-8 rounded border-2 border-background shadow-sm"
                                style={{
                                  backgroundColor: presetData.colors.positive,
                                }}
                                title="Positive"
                              />
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                              <span>Радиус: {presetData.radius}</span>
                              <span>•</span>
                              <span>Тень: {presetData.shadowBlur}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Предустановки */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Palette className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          Предустановленные схемы
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Выберите готовую цветовую схему. Все цвета будут
                          автоматически подобраны
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                      {COLOR_PRESETS.map((preset) => {
                        const isSelected = selectedPreset === preset.id;
                        return (
                          <button
                            key={preset.id}
                            onClick={() =>
                              handlePresetSelect(preset.color, preset.id)
                            }
                            className={cn(
                              "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all hover:scale-105",
                              isSelected
                                ? "border-primary shadow-lg shadow-primary/20"
                                : "border-border hover:border-primary",
                            )}
                          >
                            <div
                              className={cn(
                                "w-16 h-16 rounded-full border-4 shadow-lg",
                                isSelected
                                  ? "border-primary"
                                  : "border-background",
                              )}
                              style={{ backgroundColor: preset.color }}
                            />
                            <span className="text-sm font-medium text-center">
                              {preset.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Управление порядком виджетов */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <LayoutGrid className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          Расположение виджетов
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Настройте порядок отображения виджетов на главной
                          странице
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4">
                      <p className="text-sm text-muted-foreground">
                        На главной странице вы можете перетаскивать виджеты,
                        чтобы изменить их порядок. Новый порядок автоматически
                        сохраняется.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          resetLayout();
                          toast.success("Порядок виджетов сброшен", {
                            description:
                              "Все виджеты возвращены в исходный порядок",
                          });
                        }}
                        className="gap-2 self-start"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Сбросить порядок
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Детальная настройка */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Palette className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            Детальная настройка цветов
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Настройте каждый цвет отдельно для полного контроля
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="gap-2"
                      >
                        {showAdvanced ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            Скрыть
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            Показать
                          </>
                        )}
                      </Button>
                    </div>

                    {showAdvanced && (
                      <>
                        <Separator />
                        <Tabs defaultValue="main" className="w-full">
                          <TabsList className="grid w-full grid-cols-5">
                            <TabsTrigger value="main">Основные</TabsTrigger>
                            <TabsTrigger value="backgrounds">Фоны</TabsTrigger>
                            <TabsTrigger value="status">Статусы</TabsTrigger>
                            <TabsTrigger value="borders">Границы</TabsTrigger>
                            <TabsTrigger value="charts">Графики</TabsTrigger>
                          </TabsList>

                          {colorGroups.map((group, idx) => (
                            <TabsContent
                              key={group.title}
                              value={
                                idx === 0
                                  ? "main"
                                  : idx === 1
                                    ? "backgrounds"
                                    : idx === 2
                                      ? "status"
                                      : idx === 3
                                        ? "borders"
                                        : "charts"
                              }
                              className="space-y-4 mt-4"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {group.colors.map((colorInfo) => (
                                  <div
                                    key={colorInfo.key}
                                    className="flex flex-col gap-2 p-4 border rounded-lg"
                                  >
                                    <ColorPicker
                                      color={
                                        colors[
                                          colorInfo.key as keyof typeof colors
                                        ] || "#e50046"
                                      }
                                      onChange={(color) =>
                                        handleColorChange(
                                          colorInfo.key as keyof typeof colors,
                                          color,
                                        )
                                      }
                                      label={colorInfo.label}
                                    />
                                    <p className="text-xs text-muted-foreground">
                                      {colorInfo.desc}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </>
                    )}

                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        onClick={handleResetColors}
                        className="gap-2"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Сбросить все цвета
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Превью */}
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <h2 className="text-lg font-semibold">Превью</h2>
                        <p className="text-sm text-muted-foreground">
                          Посмотрите, как выглядят элементы с выбранными цветами
                        </p>
                      </div>
                    </div>
                    <Separator />

                    {/* Кнопки */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">Кнопки</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Button>Основная кнопка</Button>
                        <Button variant="outline">Обычная кнопка</Button>
                        <Button variant="secondary">Вторичная</Button>
                        <Button variant="ghost">Прозрачная</Button>
                        <Button variant="destructive">Опасная</Button>
                        <Button disabled>Отключенная</Button>
                      </div>
                    </div>

                    <Separator />

                    {/* Текст */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">
                        Текст и типография
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-2xl font-bold text-foreground">
                            Заголовок H1
                          </h1>
                          <h2 className="text-xl font-semibold text-foreground">
                            Заголовок H2
                          </h2>
                          <h3 className="text-lg font-semibold text-foreground">
                            Заголовок H3
                          </h3>
                          <p className="text-base text-foreground">
                            Обычный текст параграфа
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Приглушённый вспомогательный текст
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm">
                            <span className="text-primary">Акцент цвета</span>
                          </p>
                          <p className="text-sm">
                            <a
                              href="#"
                              className="text-primary hover:underline"
                            >
                              Кликабельная ссылка
                            </a>
                          </p>
                          <p className="text-sm line-through text-muted-foreground">
                            Зачёркнутый текст
                          </p>
                          <p className="text-sm italic text-muted-foreground">
                            Курсивный текст
                          </p>
                          <p className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            Код: const x = 123
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Карточки */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">
                        Карточки и контейнеры
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2 p-3 border border-border rounded-lg bg-card">
                          <p className="text-sm font-semibold text-card-foreground">
                            Обычная карточка
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Текст на карточке
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 p-3 border border-border rounded-lg bg-muted">
                          <p className="text-sm font-semibold text-foreground">
                            Приглушённый блок
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Текст на фоне muted
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 p-3 border border-primary rounded-lg bg-primary">
                          <p className="text-sm font-semibold text-primary-foreground">
                            Primary блок
                          </p>
                          <p className="text-xs text-primary-foreground/80">
                            Акцентный блок
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 p-3 border border-border rounded-lg bg-popover">
                          <p className="text-sm font-semibold text-popover-foreground">
                            Popover блок
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Всплывающие элементы
                          </p>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Поля ввода */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">
                        Поля ввода и формы
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs">Обычное поле</Label>
                          <Input placeholder="Введите текст..." />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs">С фокусом</Label>
                          <Input
                            placeholder="Фокус"
                            className="ring-2 ring-ring"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <Label className="text-xs">Отключенное</Label>
                          <Input disabled placeholder="Отключено" />
                        </div>
                        <div className="flex items-center gap-2 pt-6">
                          <Switch />
                          <span className="text-xs text-muted-foreground">
                            Переключатель
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Бейджи */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">
                        Бейджи и метки
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                        <span className="px-2.5 py-0.5 rounded-full bg-positive text-positive-foreground text-xs">
                          Positive
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-average text-average-foreground text-xs">
                          Average
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-height text-height-foreground text-xs">
                          Height
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Уведомления */}
                    <div className="flex flex-col gap-3">
                      <Label className="text-sm font-semibold">
                        Уведомления и алерты
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border border-positive bg-positive/10">
                          <CheckCircle2 className="h-4 w-4 text-positive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold">Успешно</p>
                            <p className="text-xs text-muted-foreground">
                              Выполнено успешно
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border border-destructive bg-destructive/10">
                          <XCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold">Ошибка</p>
                            <p className="text-xs text-muted-foreground">
                              Произошла ошибка
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border border-average bg-average/10">
                          <AlertCircle className="h-4 w-4 text-average flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold">Внимание</p>
                            <p className="text-xs text-muted-foreground">
                              Обратите внимание
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2.5 rounded-lg border border-primary bg-primary/10">
                          <Info className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold">Инфо</p>
                            <p className="text-xs text-muted-foreground">
                              Полезная информация
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </ViewTabsContent>

              <ViewTabsContent
                value="notifications"
                className="flex flex-col gap-6"
              >
                <Card className="p-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">Уведомления</h2>
                        <p className="text-sm text-muted-foreground">
                          Настройка уведомлений приложения
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-4 py-8 items-center justify-center text-center">
                      <Bell className="h-12 w-12 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Раздел в разработке
                      </p>
                    </div>
                  </div>
                </Card>
              </ViewTabsContent>

              {userHasEffectsAccess && (
                <ViewTabsContent
                  value="effects"
                  className="flex flex-col gap-6"
                >
                  {/* Переключатели эффектов */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <LayoutGrid className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            Управление эффектами
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Включение и выключение эффектов на дашборде
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💖</span>
                            <div>
                              <Label className="text-base">
                                Летающие сердечки
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Анимация сердечек, поднимающихся снизу вверх
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={effectsSettings.flyingHeartsEnabled}
                            onCheckedChange={(checked) =>
                              updateEffectsSettings({
                                flyingHeartsEnabled: checked,
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <div>
                              <Label className="text-base">След курсора</Label>
                              <p className="text-xs text-muted-foreground">
                                Эмодзи следуют за движением мыши
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={effectsSettings.cursorTrailEnabled}
                            onCheckedChange={(checked) =>
                              updateEffectsSettings({
                                cursorTrailEnabled: checked,
                              })
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">💬</span>
                            <div>
                              <Label className="text-base">
                                Персональные сообщения
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                Специальные фразы для определенных пользователей
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={effectsSettings.personalMessagesEnabled}
                            onCheckedChange={(checked) =>
                              updateEffectsSettings({
                                personalMessagesEnabled: checked,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Настройки FlyingHearts */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-lg">💖</span>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            Летающие сердечки
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Настройка анимации летающих сердечек
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-semibold">
                            Эмодзи
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {effectsSettings.flyingHeartsEmojis.map(
                              (emoji: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 border rounded-lg"
                                >
                                  <span className="text-lg">{emoji}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newEmojis =
                                        effectsSettings.flyingHeartsEmojis.filter(
                                          (_: string, i: number) => i !== index,
                                        );
                                      updateEffectsSettings({
                                        flyingHeartsEmojis: newEmojis,
                                      });
                                    }}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </div>
                              ),
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newEmoji = prompt("Введите эмодзи:");
                                if (newEmoji) {
                                  updateEffectsSettings({
                                    flyingHeartsEmojis: [
                                      ...effectsSettings.flyingHeartsEmojis,
                                      newEmoji,
                                    ],
                                  });
                                }
                              }}
                            >
                              + Добавить
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Минимальный размер
                            </Label>
                            <Input
                              type="number"
                              value={effectsSettings.flyingHeartsSize.min}
                              onChange={(e) =>
                                updateEffectsSettings({
                                  flyingHeartsSize: {
                                    ...effectsSettings.flyingHeartsSize,
                                    min: parseInt(e.target.value) || 30,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Максимальный размер
                            </Label>
                            <Input
                              type="number"
                              value={effectsSettings.flyingHeartsSize.max}
                              onChange={(e) =>
                                updateEffectsSettings({
                                  flyingHeartsSize: {
                                    ...effectsSettings.flyingHeartsSize,
                                    max: parseInt(e.target.value) || 50,
                                  },
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-semibold">
                            Частота появления (сек)
                          </Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={effectsSettings.flyingHeartsFrequency}
                            onChange={(e) =>
                              updateEffectsSettings({
                                flyingHeartsFrequency:
                                  parseFloat(e.target.value) || 2,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Настройки CursorTrail */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-lg">✨</span>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            След курсора
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Настройка анимации следящих за курсором эмодзи
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-semibold">
                            Эмодзи
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {effectsSettings.cursorTrailEmojis.map(
                              (emoji: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 border rounded-lg"
                                >
                                  <span className="text-lg">{emoji}</span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      const newEmojis =
                                        effectsSettings.cursorTrailEmojis.filter(
                                          (_: string, i: number) => i !== index,
                                        );
                                      updateEffectsSettings({
                                        cursorTrailEmojis: newEmojis,
                                      });
                                    }}
                                  >
                                    <XCircle className="h-3 w-3" />
                                  </Button>
                                </div>
                              ),
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const newEmoji = prompt("Введите эмодзи:");
                                if (newEmoji) {
                                  updateEffectsSettings({
                                    cursorTrailEmojis: [
                                      ...effectsSettings.cursorTrailEmojis,
                                      newEmoji,
                                    ],
                                  });
                                }
                              }}
                            >
                              + Добавить
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Размер эмодзи (px)
                            </Label>
                            <Input
                              type="number"
                              value={effectsSettings.cursorTrailSize}
                              onChange={(e) =>
                                updateEffectsSettings({
                                  cursorTrailSize:
                                    parseInt(e.target.value) || 20,
                                })
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Длительность анимации (сек)
                            </Label>
                            <Input
                              type="number"
                              step="0.5"
                              value={effectsSettings.cursorTrailDuration}
                              onChange={(e) =>
                                updateEffectsSettings({
                                  cursorTrailDuration:
                                    parseFloat(e.target.value) || 2,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Label className="text-sm font-semibold">
                            Максимальное количество эмодзи
                          </Label>
                          <Input
                            type="number"
                            value={effectsSettings.cursorTrailMaxHearts}
                            onChange={(e) =>
                              updateEffectsSettings({
                                cursorTrailMaxHearts:
                                  parseInt(e.target.value) || 15,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Настройки персональных сообщений */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <span className="text-lg">💬</span>
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            Персональные сообщения
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Настройка стиля отображения персональных фраз
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Цвет фона
                            </Label>
                            <Input
                              type="color"
                              value={
                                effectsSettings.personalMessagesStyle
                                  .backgroundColor
                              }
                              onChange={(e) =>
                                updateEffectsSettings({
                                  personalMessagesStyle: {
                                    ...effectsSettings.personalMessagesStyle,
                                    backgroundColor: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Цвет границы
                            </Label>
                            <Input
                              type="color"
                              value={
                                effectsSettings.personalMessagesStyle
                                  .borderColor
                              }
                              onChange={(e) =>
                                updateEffectsSettings({
                                  personalMessagesStyle: {
                                    ...effectsSettings.personalMessagesStyle,
                                    borderColor: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Цвет текста
                            </Label>
                            <Input
                              type="color"
                              value={
                                effectsSettings.personalMessagesStyle.textColor
                              }
                              onChange={(e) =>
                                updateEffectsSettings({
                                  personalMessagesStyle: {
                                    ...effectsSettings.personalMessagesStyle,
                                    textColor: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label className="text-sm font-semibold">
                              Размер шрифта
                            </Label>
                            <select
                              className="px-3 py-2 border rounded-md"
                              value={
                                effectsSettings.personalMessagesStyle.fontSize
                              }
                              onChange={(e) =>
                                updateEffectsSettings({
                                  personalMessagesStyle: {
                                    ...effectsSettings.personalMessagesStyle,
                                    fontSize: e.target.value,
                                  },
                                })
                              }
                            >
                              <option value="text-sm">Маленький</option>
                              <option value="text-base">Обычный</option>
                              <option value="text-lg">Большой</option>
                              <option value="text-xl">Очень большой</option>
                              <option value="text-2xl">Огромный</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Кнопка сброса */}
                  <Card className="p-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                          <RotateCcw className="h-5 w-5 text-destructive" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold">
                            Сброс настроек
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Вернуть все настройки эффектов к значениям по
                            умолчанию
                          </p>
                        </div>
                      </div>
                      <Separator />
                      <Button
                        variant="destructive"
                        onClick={() => {
                          resetEffectsSettings();
                          toast.success("Настройки эффектов сброшены", {
                            description:
                              "Все эффекты возвращены к значениям по умолчанию",
                          });
                        }}
                        className="gap-2 self-start"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Сбросить все настройки эффектов
                      </Button>
                    </div>
                  </Card>
                </ViewTabsContent>
              )}
            </div>
          </div>
        </ViewTabs>
      </div>
    </div>
  );
};
