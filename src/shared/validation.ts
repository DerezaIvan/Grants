export type FieldValidation =
  'name' | 'phone' | 'phoneOrTelegram' | 'email' | 'telegram' | 'contact' | 'text' | 'file';

export interface FieldRule {
  type: FieldValidation;
  required?: boolean;
}

const NAME_PATTERN = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEGRAM_PATTERN = /^@\S+$/;
const PHONE_FULL_PATTERN = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const PHONE_DIGITS_PATTERN = /^[78]\d{10}$/;
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_FILE_EXTENSIONS = new Set([
  'png',
  'jpg',
  'jpeg',
  'webp',
  'gif',
  'heic',
  'heif',
  'pdf',
  'doc',
  'docx',
  'odt',
  'rtf',
  'txt',
  'csv',
  'xls',
  'xlsx',
  'ods',
  'ppt',
  'pptx',
  'odp',
  'zip',
  'rar',
  '7z',
]);

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
      if (!PHONE_FULL_PATTERN.test(trimmed) && !PHONE_DIGITS_PATTERN.test(digits)) {
        return 'Введите телефон полностью: +7 (900) 000-00-00';
      }
      return '';
    }
    case 'phoneOrTelegram':
      if (!PHONE_FULL_PATTERN.test(trimmed) && !TELEGRAM_PATTERN.test(trimmed)) {
        return 'Укажите телефон полностью или Telegram в формате @username';
      }
      return '';
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
      if (value instanceof File && value.size > 0) {
        const extension = value.name.split('.').pop()?.toLowerCase() ?? '';
        if (!ALLOWED_FILE_EXTENSIONS.has(extension)) {
          errors[name] = 'Выберите изображение, PDF, документ или архив';
        } else if (value.size > MAX_FILE_SIZE) {
          errors[name] = 'Размер файла не должен превышать 25 МБ';
        }
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
