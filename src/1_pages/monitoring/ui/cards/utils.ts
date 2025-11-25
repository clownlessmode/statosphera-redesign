export const formatImageUrl = (
  imageUrl: string | string[] | null | undefined,
): string => {
  // Проверка на null или undefined
  if (!imageUrl) return "";

  // Если это JSON строка массива (для Magnit и Metro), парсим ее
  if (typeof imageUrl === "string" && imageUrl.startsWith("[")) {
    try {
      const parsed = JSON.parse(imageUrl);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed[0] : "";
    } catch {
      return imageUrl;
    }
  }

  // Если массив, берем первый элемент
  const url = Array.isArray(imageUrl) ? imageUrl[0] : imageUrl;

  // Проверка на null или undefined после извлечения из массива
  if (!url) return "";

  // Извлекаем число из URL вида https://yarcheplus.ru/images/76256
  const match = url.match(/\/images\/(\d+)/);
  if (!match) return url;

  const fullNumber = match[1]; // "76256"
  const firstTwo = fullNumber.slice(0, 2); // "76"
  const rest = fullNumber.slice(2); // "256"

  return `https://api.yarcheplus.ru/thumbnail/768x768/${firstTwo}/${rest}/${fullNumber}.webp`;
};

export const removeUnitsFromName = (name: string): string => {
  // Удаляем единицы измерения: г, кг, л, мл, шт, штук, штуки и т.д.
  // Паттерн: число (с запятой/точкой) + единица измерения
  return name
    .replace(/«[^»]*»/g, "") // Удаляем текст в кавычках «...»
    .replace(
      /\d+([,.]\d+)?\s*(г|кг|л|мл|шт|штук|штуки?|кг\.|г\.|л\.|мл\.)/gi,
      "",
    )
    .replace(/,\s*$/g, "") // Убираем запятую в конце строки
    .replace(/\s+/g, " ") // Убираем множественные пробелы
    .trim(); // Убираем пробелы в начале и конце
};

export const getWeight = (name: string): string => {
  const match = name.match(
    /\d+([,.]\d+)?\s*(г|кг|л|мл|шт|штук|штуки?|кг\.|г\.|л\.|мл\.)/gi,
  );
  if (!match) return "";

  const weight = match[0];
  return weight;
};

// Форматирует вес/объем, добавляя единицы измерения если их нет
export const formatWeightOrVolume = (
  value: string | number | null | undefined,
  isVolume: boolean = false,
  forceGrams: boolean = false,
): string => {
  // Обрабатываем null, undefined и пустые значения
  if (value === null || value === undefined) return "";

  // Преобразуем в строку на случай если пришло число
  const strValue = String(value).trim();

  if (strValue === "" || strValue === "null" || strValue === "undefined") {
    return "";
  }

  // Проверяем, есть ли уже единицы измерения
  const hasUnits = /(г|кг|л|мл|шт|штук|штуки?|кг\.|г\.|л\.|мл\.)/gi.test(
    strValue,
  );
  if (hasUnits) return strValue;

  // Если единиц нет, пытаемся определить по значению
  const numMatch = strValue.match(/^(\d+([,.]\d+)?)/);
  if (!numMatch) return strValue;

  const numValue = parseFloat(numMatch[0].replace(",", "."));

  if (isVolume) {
    // Для объема: если значение >= 1000, то это скорее всего мл (1000 мл = 1 л)
    if (numValue >= 1000) {
      return `${strValue} мл`;
    }
    // Если меньше 1, то мл, иначе л
    return numValue < 1 ? `${strValue} мл` : `${strValue} л`;
  } else {
    // Для веса: если forceGrams=true, всегда "г"
    if (forceGrams) {
      return `${strValue} г`;
    }
    // Для веса: если меньше 1000, то г, иначе кг
    return numValue < 1000 ? `${strValue} г` : `${strValue} кг`;
  }
};
