// Отправка заявок в Telegram. ВАЖНО: токен виден в коде страницы (сайт статический).
// Если нужно скрыть токен / обойти блокировку api.telegram.org у посетителей —
// поднимите прокси (например, Cloudflare Worker), который пересылает FormData
// на api.telegram.org, и укажите его URL в PROXY_URL.
const BOT_TOKEN = '9247866672:AAE9Y7XGwhJw0AoFxiIzxiqUj-PDUAsXiuY';
const CHAT_ID = '1024263763';
const PROXY_URL = '';

const API_URL = PROXY_URL || `https://api.telegram.org/bot${BOT_TOKEN}`;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function formatMessage(title: string, fields: [string, string][]): string {
  const lines = fields
    .filter(([, value]) => value.trim() !== '')
    .map(([label, value]) => `${label}: ${escapeHtml(value.trim())}`);
  return [`<b>${escapeHtml(title)}</b>`, '', ...lines].join('\n');
}

async function assertOk(response: Response): Promise<void> {
  if (response.ok) return;
  const detail = await response.text().catch(() => '');
  throw new Error(`Telegram API error ${response.status}: ${detail}`);
}

export async function sendTelegramMessage(text: string): Promise<void> {
  // FormData вместо JSON: без кастомного Content-Type браузер не делает
  // CORS-preflight, на который api.telegram.org не отвечает.
  const body = new FormData();
  body.append('chat_id', CHAT_ID);
  body.append('text', text);
  body.append('parse_mode', 'HTML');
  const response = await fetch(`${API_URL}/sendMessage`, { method: 'POST', body });
  await assertOk(response);
}

export async function sendTelegramDocument(file: File, caption: string): Promise<void> {
  const body = new FormData();
  body.append('chat_id', CHAT_ID);
  body.append('document', file);
  body.append('caption', caption);
  body.append('parse_mode', 'HTML');
  const response = await fetch(`${API_URL}/sendDocument`, { method: 'POST', body });
  await assertOk(response);
}
