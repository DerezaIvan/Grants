export type FieldValidation = 'name' | 'phone' | 'email' | 'telegram' | 'contact' | 'text' | 'file';

export interface FieldRule {
  type: FieldValidation;
  required?: boolean;
}

const NAME_PATTERN = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
const PHONE_PATTERN = /^\+?[0-9\s()-]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM_PATTERN = /^@?[A-Za-z0-9_]{5,32}$/;
const MAX_FILE_SIZE = 25 * 1024 * 1024;

function validateText(type: FieldValidation, value: string): string {
  const trimmed = value.trim();

  switch (type) {
    case 'name':
      if (trimmed.length < 2 || trimmed.length > 60 || !NAME_PATTERN.test(trimmed)) {
        return 'Введите имя буквами, от 2 до 60 символов';
      }
      return '';
    case 'phone': {
      const digits = trimmed.replace(/\D/g, '');
      if (!PHONE_PATTERN.test(trimmed) || digits.length < 10 || digits.length > 15) {
        return 'Введите корректный телефон, например +7 900 000-00-00';
      }
      return '';
    }
    case 'email':
      if (trimmed.length > 254 || !EMAIL_PATTERN.test(trimmed)) {
        return 'Введите корректный email, например name@example.ru';
      }
      return '';
    case 'telegram':
      if (!TELEGRAM_PATTERN.test(trimmed)) {
        return 'Введите Telegram в формате @username';
      }
      return '';
    case 'contact':
      if (trimmed.length < 2 || trimmed.length > 100 || !/[\p{L}\d@]/u.test(trimmed)) {
        return 'Укажите корректный способ связи';
      }
      return '';
    case 'text':
      if (trimmed.length > 2000) {
        return 'Текст не должен превышать 2000 символов';
      }
      return '';
    default:
      return '';
  }
}

export function validateFields(
  data: FormData,
  rules: Record<string, FieldRule>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [name, rule] of Object.entries(rules)) {
    const value = data.get(name);

    if (rule.type === 'file') {
      if (value instanceof File && value.size > MAX_FILE_SIZE) {
        errors[name] = 'Размер файла не должен превышать 25 МБ';
      }
      continue;
    }

    const text = typeof value === 'string' ? value : '';
    if (!text.trim()) {
      if (rule.required) errors[name] = 'Заполните это поле';
      continue;
    }

    const error = validateText(rule.type, text);
    if (error) errors[name] = error;
  }

  return errors;
}

export function clearFieldError(event: Event, errors: Record<string, string>): void {
  const input = event.target as HTMLInputElement;
  if (input.name && errors[input.name]) delete errors[input.name];
}
