import { createServer } from 'node:http';
import { Readable, Transform } from 'node:stream';

const MAX_TEXT = 4000;
const MAX_FILE = 25 * 1024 * 1024;
const MAX_BODY = MAX_FILE + 1024 * 1024;
const REQUEST_TIMEOUT = 15_000;
const RATE_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT = 10;
const requestsByIp = new Map();

const config = {
  host: process.env.HOST || '127.0.0.1',
  port: Number(process.env.PORT || 3000),
  botToken: process.env.BOT_TOKEN?.trim(),
  chatId: process.env.CHAT_ID?.trim(),
};

function json(response, status, body, headers = {}) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers,
  });
  response.end(JSON.stringify(body));
}

function clientIp(request) {
  return (
    request.headers['x-forwarded-for']?.split(',')[0].trim() ||
    request.socket.remoteAddress ||
    'unknown'
  );
}

function isRateLimited(request) {
  const now = Date.now();
  const ip = clientIp(request);
  const recent = (requestsByIp.get(ip) || []).filter(timestamp => now - timestamp < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  requestsByIp.set(ip, recent);

  if (requestsByIp.size > 1000) {
    for (const [key, timestamps] of requestsByIp) {
      if (!timestamps.some(timestamp => now - timestamp < RATE_WINDOW)) requestsByIp.delete(key);
    }
  }
  return false;
}

function requestBody(request) {
  let size = 0;
  const limiter = new Transform({
    transform(chunk, _encoding, callback) {
      size += chunk.length;
      if (size > MAX_BODY) {
        const error = new Error('request body too large');
        error.code = 'BODY_TOO_LARGE';
        callback(error);
        return;
      }
      callback(null, chunk);
    },
  });
  request.pipe(limiter);
  return Readable.toWeb(limiter);
}

async function readLead(request) {
  const contentType = request.headers['content-type'] || '';
  if (!contentType.toLowerCase().startsWith('multipart/form-data;')) {
    return { error: ['multipart form data required', 415] };
  }

  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > MAX_BODY) return { error: ['request body too large', 413] };

  let form;
  try {
    const webRequest = new Request('http://127.0.0.1/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body: requestBody(request),
      duplex: 'half',
    });
    form = await webRequest.formData();
  } catch (error) {
    return {
      error: [
        error.code === 'BODY_TOO_LARGE' ? 'request body too large' : 'invalid form data',
        error.code === 'BODY_TOO_LARGE' ? 413 : 400,
      ],
    };
  }

  const text = String(form.get('text') ?? '').slice(0, MAX_TEXT);
  const document = form.get('document');
  const hasFile =
    typeof document === 'object' && document !== null && 'size' in document && document.size > 0;

  if (!hasFile && text.trim() === '') return { error: ['empty lead', 400] };
  if (hasFile && document.size > MAX_FILE) return { error: ['file too large', 413] };
  if (hasFile && text.length > 1024) return { error: ['file caption too long', 400] };

  return { text, document: hasFile ? document : null };
}

async function sendToTelegram({ text, document }) {
  const body = new FormData();
  body.set('chat_id', config.chatId);
  body.set('parse_mode', 'HTML');

  let method = 'sendMessage';
  if (document) {
    body.set('document', document, document.name || 'attachment');
    body.set('caption', text);
    method = 'sendDocument';
  } else {
    body.set('text', text);
  }

  const relayUrl = process.env.TELEGRAM_RELAY_URL?.trim();
  const relayKey = process.env.TELEGRAM_RELAY_KEY?.trim();
  if (relayUrl && !relayKey) throw new Error('telegram relay key is missing');

  const url = relayUrl || `https://api.telegram.org/bot${config.botToken}/${method}`;
  const headers = relayUrl
    ? {
        Authorization: `Bearer ${relayKey}`,
        'X-Telegram-Bot-Token': config.botToken,
        'X-Telegram-Method': method,
      }
    : {};

  return fetch(url, {
    method: 'POST',
    headers,
    body,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  });
}

async function sendLeadToTelegram(lead) {
  if (lead.document && lead.text.length > 1024) {
    const messageResponse = await sendToTelegram({ text: lead.text, document: null });
    if (!messageResponse.ok) return messageResponse;
    return sendToTelegram({ text: '', document: lead.document });
  }
  return sendToTelegram(lead);
}

async function handleLead(request, response) {
  if (isRateLimited(request)) {
    json(response, 429, { ok: false, error: 'too many requests' }, { 'Retry-After': '600' });
    return;
  }
  if (!config.botToken || !config.chatId) {
    json(response, 503, { ok: false, error: 'lead service is not configured' });
    return;
  }

  const lead = await readLead(request);
  if (lead.error) {
    json(response, lead.error[1], { ok: false, error: lead.error[0] });
    return;
  }

  try {
    const telegramResponse = await sendLeadToTelegram(lead);
    if (!telegramResponse.ok) {
      const details = await telegramResponse.json().catch(() => null);
      console.error(
        'Telegram rejected a lead',
        telegramResponse.status,
        details?.description || 'unknown error'
      );
      json(response, 502, { ok: false, error: 'telegram delivery failed' });
      return;
    }
    json(response, 200, { ok: true });
  } catch (error) {
    console.error('Telegram request failed', error.name);
    json(response, 502, { ok: false, error: 'telegram is unavailable' });
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', 'http://127.0.0.1');

  if (url.pathname === '/api/health' && request.method === 'GET') {
    json(response, 200, { ok: true });
    return;
  }
  if (url.pathname !== '/api/lead') {
    json(response, 404, { ok: false, error: 'not found' });
    return;
  }
  if (request.method !== 'POST') {
    json(response, 405, { ok: false, error: 'method not allowed' }, { Allow: 'POST' });
    return;
  }

  try {
    await handleLead(request, response);
  } catch (error) {
    console.error('Lead request failed', error.name);
    if (!response.headersSent) json(response, 500, { ok: false, error: 'internal server error' });
    else response.end();
  }
});

server.listen(config.port, config.host, () => {
  console.log(`Lead service listening on http://${config.host}:${config.port}`);
});

for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
