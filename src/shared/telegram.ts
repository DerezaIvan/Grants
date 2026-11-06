// Токен бота хранится только на сервере. Сайт отправляет заявки
// на собственный backend, работающий на том же домене.
const LEAD_ENDPOINT = '/api/lead';

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
  throw new Error(`Lead endpoint error ${response.status}: ${detail}`);
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const body = new FormData();
  body.append('text', text);
  const response = await fetch(LEAD_ENDPOINT, { method: 'POST', body });
  await assertOk(response);
}

export async function sendTelegramDocument(file: File, caption: string): Promise<void> {
  const body = new FormData();
  body.append('document', file);
  body.append('text', caption);
  const response = await fetch(LEAD_ENDPOINT, { method: 'POST', body });
  await assertOk(response);
}
