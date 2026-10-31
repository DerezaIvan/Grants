# Прокси заявок в Telegram (скрывает токен бота от клиентов)

Сайт шлёт FormData на этот воркер, воркер подставляет `BOT_TOKEN` и `CHAT_ID`
из секретов и пересылает в Bot API. Токен в коде сайта и в git отсутствует.

## Настройка (один раз)

```bash
cd workers/lead-proxy
npx wrangler login                      # привязка аккаунта Cloudflare
npx wrangler secret put BOT_TOKEN       # новый токен от @BotFather (/revoke → новый)
npx wrangler secret put CHAT_ID         # id чата получателя заявок
npx wrangler deploy                     # публикация, выдаст URL воркера
```

После деплоя URL воркера (по умолчанию `https://grants-lead.<subdomain>.workers.dev`)
нужно прописать в `src/shared/telegram.ts` константу `LEAD_ENDPOINT`.
Subdomain аккаунта можно узнать: `npx wrangler whoami`.

## Что принимает воркер

`POST` с `multipart/form-data`:

- `text` — текст заявки (обязателен, если нет файла), до 4000 символов;
- `document` — файл-вложение (опционально), до 24 МБ.

При наличии файла отправляет `sendDocument`, иначе `sendMessage` (parse_mode: HTML).
