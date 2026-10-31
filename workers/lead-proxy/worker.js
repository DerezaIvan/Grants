// Прокси заявок в Telegram: принимает FormData от сайта, подставляет
// BOT_TOKEN и CHAT_ID из секретов и пересылает в Bot API.
//
// Секреты задаются НЕ в коде:
//   npx wrangler secret put BOT_TOKEN   (токен от @BotFather)
//   npx wrangler secret put CHAT_ID     (id чата получателя)
//
// Деплой: npx wrangler deploy (нужен привязанный аккаунт Cloudflare)
const MAX_TEXT = 4000;
const MAX_FILE = 24 * 1024 * 1024; // лимит формы на сайте — 25 mb

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method not allowed' }, 405);
    }

    let form;
    try {
      form = await request.formData();
    } catch {
      return json({ ok: false, error: 'invalid form data' }, 400);
    }

    const text = String(form.get('text') ?? '').slice(0, MAX_TEXT);
    const document = form.get('document');
    const hasFile = document instanceof File && document.size > 0;

    if (!hasFile && text.trim() === '') {
      return json({ ok: false, error: 'empty lead' }, 400);
    }
    if (hasFile && document.size > MAX_FILE) {
      return json({ ok: false, error: 'file too large' }, 413);
    }
    if (!env.BOT_TOKEN || !env.CHAT_ID) {
      return json({ ok: false, error: 'worker is not configured' }, 500);
    }

    const telegramBody = new FormData();
    telegramBody.set('chat_id', env.CHAT_ID);
    telegramBody.set('parse_mode', 'HTML');
    let method;
    if (hasFile) {
      telegramBody.set('document', document);
      telegramBody.set('caption', text);
      method = 'sendDocument';
    } else {
      telegramBody.set('text', text);
      method = 'sendMessage';
    }

    const telegramResponse = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
      method: 'POST',
      body: telegramBody,
    });
    return new Response(telegramResponse.body, {
      status: telegramResponse.status,
      headers: CORS_HEADERS,
    });
  },
};

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });
}
