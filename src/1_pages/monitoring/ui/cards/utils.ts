export const formatImageUrl = (imageUrl: string | string[]): string => {
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
