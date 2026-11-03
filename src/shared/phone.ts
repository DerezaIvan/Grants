// Маска и валидация российского номера телефона.
// Формат: +7 (XXX) XXX-XX-XX. Ввод с «8» или «7» нормализуется к «+7»,
// значащих цифр — ровно 10 (стандарт РФ: код страны 7 + 10 цифр).

export const PHONE_MASK = '+7 (___) ___-__-__';

// Значение атрибута pattern для <input> (HTML-совместимое выражение)
export const PHONE_HTML_PATTERN = String.raw`\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}`;

const PHONE_FULL_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

export function normalizePhoneDigits(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
  if (digits.startsWith('7')) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function formatPhone(value: string): string {
  const digits = normalizePhoneDigits(value);
  if (!digits) return '';

  const part1 = digits.slice(0, 3);
  const part2 = digits.slice(3, 6);
  const part3 = digits.slice(6, 8);
  const part4 = digits.slice(8, 10);

  let result = `+7${part1 ? ` (${part1}` : ''}`;
  if (part1.length === 3) result += ')';
  if (part2) result += ` ${part2}`;
  if (part3) result += `-${part3}`;
  if (part4) result += `-${part4}`;
  return result;
}

export function isValidPhone(value: string): boolean {
  return PHONE_FULL_PATTERN.test(value.trim());
}

export function phoneDigits(value: string): string {
  return `7${normalizePhoneDigits(value)}`;
}
