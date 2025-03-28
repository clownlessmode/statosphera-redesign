/**
 * Возвращает слово с правильным окончанием в зависимости от числа.
 * @param number Число, для которого определяется форма слова.
 * @param forms Массив из 3 форм слова в порядке: [1, 2, 5].
 *              Например: ['минута', 'минуты', 'минут'].
 * @returns Строка с числом и правильной формой слова.
 */
export default function pluralize(
  number: number,
  forms: [string, string, string]
): string {
  const n = Math.abs(number) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return `${number} ${forms[2]}`;
  if (n1 > 1 && n1 < 5) return `${number} ${forms[1]}`;
  if (n1 === 1) return `${number} ${forms[0]}`;
  return `${number} ${forms[2]}`;
}
