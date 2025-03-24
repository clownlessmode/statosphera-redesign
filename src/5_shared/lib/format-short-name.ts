/**
 * Преобразует полное имя в формат "Фамилия И.О."
 * @param fullName Полное имя в формате "Фамилия Имя Отчество"
 * @returns Сокращенное имя в формате "Фамилия И.О."
 */
const formatShortName = (fullName: string | undefined | null): string => {
  if (!fullName) return "";

  const parts = fullName.trim().split(" ");

  // Если только одно слово, возвращаем его как есть
  if (parts.length === 1) return parts[0];

  // Если есть фамилия и имя (без отчества)
  if (parts.length === 2) {
    return `${parts[0]} ${parts[1].charAt(0)}.`;
  }

  // Если есть фамилия, имя и отчество
  if (parts.length >= 3) {
    return `${parts[0]} ${parts[1].charAt(0)}.${parts[2].charAt(0)}.`;
  }

  return fullName;
};

export default formatShortName;
