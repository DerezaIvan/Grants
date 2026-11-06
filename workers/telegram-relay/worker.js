const ALLOWED_METHODS = new Set(['getMe', 'getUpdates', 'sendMessage', 'sendDocument']);

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return json({ ok: false, error: 'method not allowed' }, 405);
    if (!env.TELEGRAM_RELAY_KEY) return json({ ok: false, error: 'relay is not configured' }, 503);
    if (request.headers.get('Authorization') !== `Bearer ${env.TELEGRAM_RELAY_KEY}`) {
      return json({ ok: false, error: 'unauthorized' }, 401);
    }

    const botToken = request.headers.get('X-Telegram-Bot-Token')?.trim();
    const method = request.headers.get('X-Telegram-Method')?.trim();
    if (!botToken || !ALLOWED_METHODS.has(method)) {
      return json({ ok: false, error: 'invalid telegram request' }, 400);
    }

    const headers = new Headers();
    const contentType = request.headers.get('Content-Type');
    if (contentType) headers.set('Content-Type', contentType);

    return fetch(`https://api.telegram.org/bot${botToken}/${method}`, {
      method: 'POST',
      headers,
      body: request.body,
    });
  },
};
