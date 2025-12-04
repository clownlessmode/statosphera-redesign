/**
 * Проверяет, является ли ОКПО корректным (8 или 10 цифр)
 * @param okpo ОКПО для проверки
 * @returns true, если ОКПО корректный, false в противном случае
 */
export default function isValidOkpo(okpo: string | number): boolean {
  if (typeof okpo === "number") {
    okpo = okpo.toString();
  } else if (typeof okpo !== "string") {
    okpo = "";
  }

  // ОКПО может быть 8 или 10 цифр
  if (![8, 10].includes(okpo.length)) {
    return false;
  }

  // Проверка на наличие только цифр
  if (/[^0-9]/.test(okpo)) {
    return false;
  }

  const length = okpo.length;
  const code = okpo.slice(0, length - 1); // Все цифры кроме последней
  const checkDigit = parseInt(okpo[length - 1], 10);

  const calculateSum = (str: string, startWeight: number): number => {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      let weight = startWeight + i;
      if (weight > 10) weight = weight % 10 || 10;

      const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      sum += parseInt(str[i], 10) * weights[startWeight + i];
    }
    return sum;
  };

  // Первый проход (сдвиг 0, веса начинаются с 1)
  let sum = calculateSum(code, 0);
  let remainder = sum % 11;

  if (remainder === 10) {
    // Второй проход (сдвиг 2, веса начинаются с 3)
    sum = calculateSum(code, 2);
    remainder = sum % 11;
    if (remainder === 10) {
      remainder = 0;
    }
  }

  return remainder === checkDigit;
}
